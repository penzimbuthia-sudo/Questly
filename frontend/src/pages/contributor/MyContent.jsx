import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Toolbar, EmptyState } from "@/components/ui";
import { ContentCard } from "@/components/contributor";
import { getMyResources } from "@/services/resourceService";

const FILTERS = ["All", "Video", "Article", "Learning Path"];

export default function MyContent() {
  const location = useLocation();
  const createdResource = location.state?.createdResource;
  const [content, setContent] = useState(() => createdResource ? [createdResource] : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const handleResourceCreated = (event) => {
      const createdResource = event.detail;
      setContent((current) => [createdResource, ...current.filter((item) => item.id !== createdResource.id)]);
    };

    window.addEventListener("questly:resource-created", handleResourceCreated);
    getMyResources()
      .then((resources) => setContent((current) => [
        ...current,
        ...resources.filter((resource) => !current.some((item) => item.id === resource.id)),
      ]))
      .catch((requestError) => setError(requestError.message || "Unable to load your content."))
      .finally(() => setLoading(false));

    return () => window.removeEventListener("questly:resource-created", handleResourceCreated);
  }, []);

  const filteredContent = content.filter((item) => {
    const matchesFilter = activeFilter === "All" || item.type === activeFilter;
    const matchesSearch = (item.title ?? "").toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <PageHeader title="My content" subtitle="Everything you've shared with the community." />

      <Toolbar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search your content..." />

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {FILTERS.map((filterName) => {
          const isSelected = activeFilter === filterName;
          return (
            <button
              key={filterName}
              onClick={() => setActiveFilter(filterName)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                isSelected ? "bg-royal text-ivory" : "text-fg/50 border border-line/15"
              }`}
            >
              {filterName}
            </button>
          );
        })}
      </div>

      {loading && <p className="text-sm text-fg/50">Loading your content...</p>}

      {!loading && error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && filteredContent.length === 0 && (
        <EmptyState
          title={content.length === 0 ? "No content yet" : "No content found"}
          description={content.length === 0 ? "Submitted resources and learning paths will appear here, including pending reviews." : "Try a different filter or search term."}
        />
      )}

      <div className="grid grid-cols-3 gap-4">
        {filteredContent.map((item) => (
          <ContentCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}