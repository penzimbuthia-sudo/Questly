import { useEffect, useState } from "react";
import StatCard from "../../components/contributor/StatCard";
import { getUserStats, getBadges } from "../../services/gamificationService";
import { getMyResources, getMyPaths } from "../../services/resourceService";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [badges, setBadges] = useState([]);
  const [resourceCount, setResourceCount] = useState(0);
  const [pathCount, setPathCount] = useState(0);

  useEffect(() => {
    // TODO: pull real userId from auth context (A) instead of "currentUser"
    getUserStats("currentUser").then(setStats);
    getBadges("currentUser").then(setBadges);
    getMyResources().then((r) => setResourceCount(r.length));
    getMyPaths().then((p) => setPathCount(p.length));
  }, []);

  return (
    <div className="page contributor-dashboard">
      <h1>Dashboard</h1>

      <div className="stat-row">
        <StatCard label="Total XP" value={stats?.xp ?? "—"} footnote={stats ? `Rank: ${stats.rank}` : ""} />
        <StatCard label="Streak" value={stats ? `${stats.streak} days` : "—"} />
        <StatCard label="Resources shared" value={resourceCount} />
        <StatCard label="Paths created" value={pathCount} />
      </div>

      <section>
        <h2>Recent badges</h2>
        {badges.length === 0 ? (
          <p>No badges yet — share a resource to get started.</p>
        ) : (
          <ul className="badge-list">
            {badges.map((b) => (
              <li key={b.id}>{b.name}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
