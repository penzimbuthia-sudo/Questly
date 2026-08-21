import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import LearningPathCard from "../../components/learner/LearningPathCard";
import { getAllPaths, startPath } from "../../services/learningPathService";
import { CATEGORIES } from "../../data/learningPaths";

const TABS = ["All", ...CATEGORIES];

export default function Explore() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [paths, setPaths] = useState([]);
  const [bookmarked, setBookmarked] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllPaths({ category: activeTab }).then((result) => {
      setPaths(result);
      setLoading(false);
    });
  }, [activeTab]);

  const toggleBookmark = (path) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      next.has(path.id) ? next.delete(path.id) : next.add(path.id);
      return next;
    });
  };

  const handleStart = async (path) => {
    await startPath(path.id);
    navigate(`/paths/${path.id}`);
  };

  const emptyState = useMemo(() => !loading && paths.length === 0, [loading, paths]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Explore</h1>
        <p className="mt-1 text-sm text-neutral-500">Discover paths built by the community.</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                activeTab === tab ? "bg-purple-600 text-white" : "bg-white text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700">
          <SlidersHorizontal className="h-4 w-4" /> Filter
        </button>
      </div>

      {emptyState ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
          <p className="font-medium text-neutral-800">No paths in this category yet</p>
          <p className="mt-1 text-sm text-neutral-500">Try a different category, or check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {paths.map((path) => (
            <LearningPathCard
              key={path.id}
              path={path}
              showMeta
              bookmarked={bookmarked.has(path.id)}
              onToggleBookmark={toggleBookmark}
              onOpen={() => navigate(`/paths/${path.id}`)}
              onStart={handleStart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
