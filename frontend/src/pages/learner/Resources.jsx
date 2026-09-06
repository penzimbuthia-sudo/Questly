import { useEffect, useMemo, useState } from "react";
import { ExternalLink, FileText, ThumbsUp, Video } from "lucide-react";
import { EmptyState } from "../../components/ui";
import { getPublishedResources, upvoteResource } from "../../services/resourceService";

const FILTERS = ["All", "Video", "Article", "Tutorial"];

const TYPE_ICONS = {
  Video,
  Article: FileText,
  Tutorial: FileText,
};

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [voting, setVoting] = useState(null);

  useEffect(() => {
    getPublishedResources()
      .then(setResources)
      .catch((requestError) => setError(requestError.message || "Unable to load resources."))
      .finally(() => setLoading(false));
  }, []);

  const filteredResources = useMemo(() => resources.filter((resource) => {
    const query = search.toLowerCase();
    const matchesType = activeFilter === "All" || resource.type === activeFilter;
    const matchesSearch = `${resource.title ?? ""} ${resource.description ?? ""}`.toLowerCase().includes(query);
    return matchesType && matchesSearch;
  }), [activeFilter, resources, search]);

  async function handleUpvote(resourceId) {
    if (voting === resourceId) return;
    setVoting(resourceId);
    try {
      const result = await upvoteResource(resourceId);
      setResources((current) => current.map((resource) => (
        resource.id === resourceId
          ? { ...resource, upvotes: result?.upvotes ?? resource.upvotes + 1 }
          : resource
      )));
    } catch (requestError) {
      setError(requestError.message || "Unable to upvote this resource.");
    } finally {
      setVoting(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Resources</h1>
        <p className="mt-1 text-sm text-neutral-500">Explore approved videos, articles, and tutorials shared by contributors.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${activeFilter === filter ? "bg-purple-600 text-white" : "bg-white text-neutral-600 hover:bg-neutral-100"}`}
            >
              {filter}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search resources..."
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-purple-400"
        />
      </div>

      {loading && <p className="text-sm text-neutral-500">Loading resources...</p>}
      {error && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {!loading && !error && filteredResources.length === 0 && (
        <EmptyState title="No resources found" description="Try another filter or search term." />
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => {
          const Icon = TYPE_ICONS[resource.type] ?? FileText;
          return (
            <article key={resource.id} className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-neutral-400">{resource.type}</span>
              </div>
              <h2 className="mt-4 text-base font-semibold text-neutral-900">{resource.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-neutral-500">{resource.description}</p>
              <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
                <button type="button" onClick={() => handleUpvote(resource.id)} disabled={voting === resource.id} className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-purple-600 disabled:opacity-50">
                  <ThumbsUp className="h-4 w-4" /> {resource.upvotes ?? 0}
                </button>
                <a href={resource.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-purple-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-purple-500">
                  Open <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
