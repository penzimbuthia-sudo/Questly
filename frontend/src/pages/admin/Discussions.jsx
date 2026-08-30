import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Toolbar, Table, Pill, Button } from "@/components/ui";
import { EditStatusModal } from "@/components/admin";
import { getDiscussions, updateDiscussion } from "@/services/discussionService";

export default function Discussions() {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [editing, setEditing] = useState(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftStatus, setDraftStatus] = useState("");

  useEffect(() => {
    getDiscussions()
      .then(setThreads)
      .finally(() => setLoading(false));
  }, []);

  const filtered = threads.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  function openEdit(thread) {
    setEditing(thread);
    setDraftTitle(thread.title);
    setDraftStatus(thread.status);
  }

  async function saveThread() {
    const updated = await updateDiscussion(editing.id, { title: draftTitle, status: draftStatus });
    setThreads((current) => current.map((t) => (t.id === updated.id ? updated : t)));
    setEditing(null);
  }

  const rows = filtered.map((t) => [
    t.title,
    t.path,
    t.replies,
    <Pill status={t.status} key={t.id} />,
    <Button variant="ghost" size="sm" onClick={() => openEdit(t)} key={`edit-${t.id}`}>
      <Pencil size={12} /> Edit
    </Button>,
  ]);

  return (
    <div>
      <PageHeader title="Discussions" subtitle="Threads under each learning path — keep the tone respectful." />
      <Toolbar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search threads..." />

      {loading ? (
        <p className="text-sm text-fg/50">Loading discussions...</p>
      ) : (
        <Table columns={["Thread", "Learning path", "Replies", "Status", ""]} rows={rows} emptyMessage="No threads found" />
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50">
          <div className="bg-card border border-line/10 rounded-2xl p-6 w-full max-w-sm">
            <div className="text-base font-semibold text-fg">Edit thread</div>
            <div className="text-xs text-fg/50 mt-1">{editing.path}</div>

            <div className="flex flex-col gap-4 mt-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-fg/60">Thread title</label>
                <input
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm bg-page border border-line/15 outline-none text-fg focus:border-royal"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-fg/60">Moderation status</label>
                <select
                  value={draftStatus}
                  onChange={(e) => setDraftStatus(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm bg-page border border-line/15 outline-none text-fg focus:border-royal"
                >
                  <option value="Clear">Clear</option>
                  <option value="Flagged">Flagged</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1" onClick={saveThread}>
                Save changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}