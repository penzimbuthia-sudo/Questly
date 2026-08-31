import { useState } from "react";
import { Pencil } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Toolbar, Table, Pill, Button } from "@/components/ui";
import { EditStatusModal } from "@/components/admin";

const samplePaths = [
  { id: "p1", title: "React Developer Path", modules: "16 modules", by: "Aisha K.", status: "Published" },
  { id: "p2", title: "Full Stack MERN Roadmap", modules: "24 modules", by: "Chinedu M.", status: "Pending" },
];

export default function LearningPaths() {
  const [paths, setPaths] = useState(samplePaths);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [draftStatus, setDraftStatus] = useState("");

  const filtered = paths.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  function openEdit(path) {
    setEditing(path);
    setDraftStatus(path.status);
  }

  function saveStatus() {
    setPaths((current) => current.map((p) => (p.id === editing.id ? { ...p, status: draftStatus } : p)));
    setEditing(null);
  }

  const rows = filtered.map((p) => [
    p.title,
    p.modules,
    p.by,
    <Pill status={p.status} key={p.id} />,
    <Button variant="ghost" size="sm" onClick={() => openEdit(p)} key={`edit-${p.id}`}>
      <Pencil size={12} /> Edit
    </Button>,
  ]);

  return (
    <div>
      <PageHeader title="Learning paths" subtitle="Structured module sequences built from shared resources." />
      <Toolbar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search paths..." />
      <Table columns={["Title", "Modules", "Contributor", "Status", ""]} rows={rows} emptyMessage="No paths found" />

      {editing && (
        <EditStatusModal
          title="Edit learning path"
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