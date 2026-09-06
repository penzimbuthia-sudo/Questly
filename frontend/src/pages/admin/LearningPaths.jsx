import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Toolbar, Table, Pill, Button } from "@/components/ui";
import { EditStatusModal } from "@/components/admin";
import { getAllLearningPaths, updateLearningPathStatus } from "@/services/adminService";

export default function LearningPaths() {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [draftStatus, setDraftStatus] = useState("");

  useEffect(() => {
    getAllLearningPaths().then(setPaths).finally(() => setLoading(false));
  }, []);

  const filtered = paths.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  function openEdit(path) {
    setEditing(path);
    setDraftStatus(path.status);
  }

  async function saveStatus() {
    await updateLearningPathStatus(editing.id, draftStatus);
    setPaths((current) => current.map((p) => (p.id === editing.id ? { ...p, status: draftStatus } : p)));
    setEditing(null);
  }

  const rows = filtered.map((p) => [
    p.title, p.modules, p.by,
    <Pill status={p.status} key={p.id} />,
    <Button variant="ghost" size="sm" onClick={() => openEdit(p)} key={`edit-${p.id}`}><Pencil size={12} /> Edit</Button>,
  ]);

  return (
    <div>
      <PageHeader title="Learning paths" subtitle="Structured module sequences built from shared resources." />
      <Toolbar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search paths..." />
      {!loading && paths.length === 0 ? (
        <p className="text-sm text-fg/50">No learning paths have been created yet.</p>
      ) : (
        <Table columns={["Title", "Modules", "Contributor", "Status", ""]} rows={rows} emptyMessage="No paths found" />
      )}
      {editing && (
        <EditStatusModal
          title="Edit learning path" subtitle={editing.title}
          statusOptions={["Published", "Pending", "Rejected"]}
          value={draftStatus} onChange={setDraftStatus}
          onCancel={() => setEditing(null)} onSave={saveStatus}
        />
      )}
    </div>
  );
}