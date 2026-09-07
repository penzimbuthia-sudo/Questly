import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Toolbar, Table, Pill, Button } from "@/components/ui";
import { ResourceReviewModal } from "@/components/admin";
import { getAllResources, updateResourceStatus } from "@/services/adminService";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [reviewing, setReviewing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAllResources()
      .then(setResources)
      .catch((requestError) => setError(requestError.message || "Unable to load resources."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = resources.filter((r) => r.title.toLowerCase().includes(search.toLowerCase()));

  async function saveStatus(status) {
    setSaving(true);
    try {
      const response = await updateResourceStatus(reviewing.id, status);
      const updated = response?.data ?? response;
      setResources((current) => current.map((resource) => resource.id === reviewing.id ? { ...resource, ...updated, status } : resource));
      setReviewing(null);
    } catch (requestError) {
      setError(requestError.message || "Unable to update resource status.");
    } finally {
      setSaving(false);
    }
  }

  const rows = filtered.map((r) => [
    r.title,
    r.type,
    r.submitted_by,
    <Pill status={r.status} key={r.id} />,
    <Button variant="ghost" size="sm" onClick={() => setReviewing(r)} key={`read-${r.id}`}>
      <Pencil size={12} /> Read resource
    </Button>,
  ]);

  return (
    <div>
      <PageHeader title="Resources" subtitle="Videos, articles, and tutorials shared by contributors." />
      <Toolbar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search resources..." />
      {loading && <p className="mb-4 text-sm text-fg/50">Loading resources...</p>}
      {error && <p className="mb-4 rounded-lg border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">{error}</p>}
      {!loading && <Table columns={["Title", "Type", "Contributor", "Status", ""]} rows={rows} emptyMessage="No resources found" />}

      <ResourceReviewModal resource={reviewing} onClose={() => setReviewing(null)} onDecision={saveStatus} saving={saving} />
    </div>
  );
}