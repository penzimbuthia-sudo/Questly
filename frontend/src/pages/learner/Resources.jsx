import { useEffect, useMemo, useState } from "react";
import { ThumbsUp, FileText, Video, BookOpen } from "lucide-react";
import { getPublishedResources, upvoteResource } from "../../services/resourceService";

const TABS = [
  { label: "All", value: "" },
  { label: "Video", value: "video" },
  { label: "Article", value: "article" },
  { label: "Learning Path", value: "learning_path" },
];

const TYPE_ICONS = {
  video: Video,
  article: FileText,
  learning_path: BookOpen,
};

export default function Resources() {
  const [activeTab, setActiveTab] = useState("");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upvoted, setUpvoted] = useState(new Set());

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPublishedResources(activeTab || undefined)
      .then((result) => {
        if (!cancelled) {
          setResources(Array.isArray(result) ? result : []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResources([]);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  const handleUpvote = async (resource) => {
    if (upvoted.has(resource.id)) return;
    setUpvoted((prev) => new Set(prev).add(resource.id));
    setResources((prev) =>
      prev.map((r) => (r.id === resource.id ? { ...r, upvotes: (r.upvotes ?? 0) + 1 } : r))
    );
    try {
      await upvoteResource(resource.id);
    } catch {
      setUpvoted((prev) => {
        const next = new Set(prev);
        next.delete(resource.id);
        return next;
      });
      setResources((prev) =>
        prev.map((r) => (r.id === resource.id ? { ...r, upvotes: Math.max(0, (r.upvotes ?? 1) - 1) } : r))
      );
    }
  };

  const emptyState = useMemo(() => !loading && resources.length === 0, [loading, resources]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-fg">Resources</h1>
        <p className="mt-1 text-sm text-fg/60">Videos, articles, and paths shared by the community.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              activeTab === tab.value ? "bg-royal text-ivory" : "bg-card text-fg/70 hover:bg-surface-active"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {emptyState ? (
        <div className="rounded-2xl border border-dashed border-line/20 bg-card p-10 text-center">
          <p className="font-medium text-fg">No resources here yet</p>
          <p className="mt-1 text-sm text-fg/60">Try a different category, or check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {resources.map((resource) => {
            const Icon = TYPE_ICONS[resource.type] ?? FileText;
            return (
              <div key={resource.id} className="flex flex-col gap-3 rounded-2xl border border-line/15 bg-card p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-royal/10 text-royal">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-fg">{resource.title}</p>
                    {resource.author && <p className="mt-0.5 text-xs text-fg/50">by {resource.author}</p>}
                  </div>
                </div>

                {resource.description && (
                  <p className="line-clamp-2 text-sm text-fg/70">{resource.description}</p>
                )}

                <div className="mt-auto flex items-center justify-between pt-2">
                  {resource.url ? (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-royal hover:underline"
                    >
                      Open
                    </a>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    onClick={() => handleUpvote(resource)}
                    disabled={upvoted.has(resource.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium ${
                      upvoted.has(resource.id)
                        ? "border-royal/30 bg-royal/10 text-royal"
                        : "border-line/15 text-fg/70 hover:bg-surface-active"
                    }`}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" /> {resource.upvotes ?? 0}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
