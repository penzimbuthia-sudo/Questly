import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout";
import { ChallengeAdminCard } from "@/components/admin";
import { getChallenges } from "@/services/gamificationService";

function formatPeriod(start, end) {
  if (!start || !end) return "No dates set";
  const opts = { month: "short", day: "numeric" };
  return `${new Date(start).toLocaleDateString(undefined, opts)} – ${new Date(end).toLocaleDateString(undefined, opts)}`;
}

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChallenges().then(setChallenges).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Challenges" subtitle="Weekly, monthly, and seasonal events that drive engagement." />
      {!loading && challenges.length === 0 && (
        <p className="text-sm text-fg/50">No challenges have been created yet.</p>
      )}
      <div className="grid grid-cols-2 gap-4">
        {challenges.map((c) => (
          <ChallengeAdminCard
            key={c.id}
            title={c.title}
            period={formatPeriod(c.period_start, c.period_end)}
            participants={c.participants}
            status={c.status}
            reward={c.reward_xp ? `${c.reward_xp} XP` : "Badge"}
          />
        ))}
      </div>
    </div>
  );
}