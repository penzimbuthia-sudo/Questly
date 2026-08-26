import { useEffect, useState } from "react";
import { Zap, Flame, FileText, BookOpen, Award } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
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
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Your contributor activity at a glance."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Zap}
          label="Total XP"
          value={stats?.xp ?? "—"}
          delta={stats ? `Rank: ${stats.rank}` : ""}
          tone="gold"
        />
        <StatCard
          icon={Flame}
          label="Streak"
          value={stats ? `${stats.streak} days` : "—"}
        />
        <StatCard icon={FileText} label="Resources shared" value={resourceCount} />
        <StatCard icon={BookOpen} label="Paths created" value={pathCount} />
      </div>

      <section>
        <h2 className="font-display font-semibold text-[15px] mb-3">Recent badges</h2>
        {badges.length === 0 ? (
          <div
            className="rounded-2xl border border-dashed p-8 text-center"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <p className="text-[13.5px]" style={{ color: 'var(--color-ink-2)' }}>
              No badges yet — share a resource to get started.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {badges.map((b) => (
              <div
                key={b.id}
                className="rounded-2xl border p-4 flex items-center gap-3"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div
                  className="w-9 h-9 shrink-0 grid place-items-center rounded-full"
                  style={{ background: 'rgba(240,192,75,0.16)', color: 'var(--color-amber-300)' }}
                >
                  <Award size={16} />
                </div>
                <p className="font-medium text-[14px]">{b.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
