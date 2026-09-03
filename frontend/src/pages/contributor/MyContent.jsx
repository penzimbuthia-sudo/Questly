import { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout";
import { Toolbar, EmptyState } from "@/components/ui";
import { ContentCard } from "@/components/contributor";
import { getMyResources } from "@/services/resourceService";

const FILTERS = ["All", "Video", "Article", "Learning Path"];

export default function MyContent() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    getMyResources()
      .then(setContent)
      .catch((requestError) => setError(requestError.message || "Unable to load your content."))
      .finally(() => setLoading(false));
  }, []);

  const filteredContent = content.filter((item) => {
    const matchesFilter = activeFilter === "All" || item.type === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
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
        <EmptyState title="No content found" description="Try a different filter or search term." />
      )}

      <div className="grid grid-cols-3 gap-4">
        {filteredContent.map((item) => (
          <ContentCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}