import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LearningPathCard from "../../components/learner/LearningPathCard";
import { getAllPaths, getMyPaths, startPath } from "../../services/learningPathService";

export default function Paths() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") === "all" ? "all" : "mine";

  const [myPaths, setMyPaths] = useState([]);
  const [allPaths, setAllPaths] = useState([]);

  useEffect(() => {
    getMyPaths().then(setMyPaths);
    getAllPaths().then(setAllPaths);
  }, []);

  const handleStart = async (path) => {
    await startPath(path.id);
    const updated = await getMyPaths();
    setMyPaths(updated);
    navigate(path.id);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-fg">Learning paths</h1>
        <p className="mt-1 text-sm text-fg/60">Structured routes built from modules, resources, and quizzes.</p>
      </div>

      <div className="flex gap-2">
        <TabButton active={activeTab === "mine"} onClick={() => setSearchParams({ tab: "mine" })}>
          My paths
        </TabButton>
        <TabButton active={activeTab === "all"} onClick={() => setSearchParams({ tab: "all" })}>
          All paths
        </TabButton>
      </div>

      {activeTab === "mine" ? (
        myPaths.length === 0 ? (
          <EmptyState onBrowse={() => setSearchParams({ tab: "all" })} />
        ) : (
          <div className="flex flex-col gap-4">
            {myPaths.map(({ path, progress }) => (
              <div key={path.id} className="flex items-center gap-4 rounded-2xl border border-line/10 bg-card p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-active text-lg">
                  {path.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-fg">{path.title}</p>
                  <div className="mt-2 h-2 w-full max-w-md overflow-hidden rounded-full bg-surface-active">
                    <div className="h-full rounded-full bg-butter" style={{ width: `${progress.percent}%` }} />
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="text-fg/40">{progress.modulesCompleted}/{progress.totalModules} modules</p>
                  <p className="font-semibold text-butter-dark">{progress.xpEarned.toLocaleString()} XP</p>
                </div>
                <button type="button" onClick={() => navigate(path.id)} className="rounded-lg bg-royal px-4 py-2 text-sm font-semibold text-ivory">
                  Resume
                </button>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {allPaths.map((path) => (
            <LearningPathCard key={path.id} path={path} onOpen={() => navigate(path.id)} onStart={handleStart} />
          ))}
        </div>
      )}
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium ${
        active ? "bg-ink text-ivory" : "bg-card text-fg/70 hover:bg-surface-active"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState({ onBrowse }) {
  return (
    <div className="rounded-2xl border border-dashed border-line/20 bg-card p-10 text-center">
      <p className="font-medium text-fg">You haven&apos;t started any paths yet</p>
      <p className="mt-1 text-sm text-fg/60">Browse the catalog and start one — progress shows up here.</p>
      <button type="button" onClick={onBrowse} className="mt-4 rounded-lg bg-royal px-4 py-2 text-sm font-semibold text-ivory">
        Browse all paths
      </button>
    </div>
  );
}