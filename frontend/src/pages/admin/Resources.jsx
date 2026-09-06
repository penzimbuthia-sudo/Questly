import { useState } from "react";
import { Pencil } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Toolbar, Table, Pill, Button } from "@/components/ui";
import { EditStatusModal } from "@/components/admin";

const sampleResources = [
  { id: "r1", title: "Understanding React useEffect Hook", type: "Video", by: "Aisha K.", status: "Published" },
  { id: "r2", title: "React Performance Optimization", type: "Video", by: "Aisha K.", status: "Pending" },
  { id: "r3", title: "Advanced TypeScript Concepts", type: "Article", by: "Brian O.", status: "Pending" },
];

export default function Resources() {
  const [resources, setResources] = useState(sampleResources);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [draftStatus, setDraftStatus] = useState("");

  const filtered = resources.filter((r) => r.title.toLowerCase().includes(search.toLowerCase()));

  function openEdit(resource) {
    setEditing(resource);
    setDraftStatus(resource.status);
  }

  function saveStatus() {
    setResources((current) =>
      current.map((r) => (r.id === editing.id ? { ...r, status: draftStatus } : r))
    );
    setEditing(null);
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
      <Table columns={["Title", "Type", "Contributor", "Status", ""]} rows={rows} emptyMessage="No resources found" />

      {editing && (
        <EditStatusModal
          title="Edit resource"
          subtitle={editing.title}
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