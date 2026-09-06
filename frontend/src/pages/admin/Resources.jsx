import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Toolbar, Table, Pill, Button } from "@/components/ui";
import { EditStatusModal } from "@/components/admin";
import { getAllResources, updateResourceStatus } from "@/services/adminService";
import { toast } from "sonner";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [draftStatus, setDraftStatus] = useState("");

  useEffect(() => {
    getAllResources().then(setResources).finally(() => setLoading(false));
  }, []);

  const filtered = resources.filter((r) => r.title.toLowerCase().includes(search.toLowerCase()));

  function openEdit(resource) {
    setEditing(resource);
    setDraftStatus(resource.status);
  }

  async function saveStatus() {
    try {
      const updated = await updateResourceStatus(editing.id, draftStatus);
      setResources((current) => current.map((r) => (r.id === editing.id ? { ...r, status: updated.status ?? draftStatus } : r)));
      setEditing(null);
      toast.success(`Resource ${draftStatus === "Published" ? "approved" : draftStatus.toLowerCase()}!`);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const rows = filtered.map((r) => [
    r.title,
    r.type,
    r.by,
    <Pill status={r.status} key={r.id} />,
    <Button variant="ghost" size="sm" onClick={() => openEdit(r)} key={`edit-${r.id}`}>
      <Pencil size={12} /> Edit
    </Button>,
  ]);

  return (
    <div>
      <PageHeader title="Resources" subtitle="Videos, articles, and tutorials shared by contributors." />
      <Toolbar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search resources..." />
      {loading ? (
        <p className="text-sm text-fg/50">Loading resources...</p>
      ) : (
        <Table columns={["Title", "Type", "Contributor", "Status", ""]} rows={rows} emptyMessage="No resources found" />
      )}

      {editing && (
        <EditStatusModal
          title="Edit resource"
          subtitle={editing.title}
          details={editing}
          statusOptions={["Published", "Pending", "Rejected"]}
          value={draftStatus}
          onChange={setDraftStatus}
          onCancel={() => setEditing(null)}
          onSave={saveStatus}
        />
      )}
    </div>
  );
}