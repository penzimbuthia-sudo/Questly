import { Zap, Compass, Medal } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { BadgeAdminCard } from "@/components/admin";

const sampleBadges = [
  { name: "Spark ignited", criteria: "First module completed", unlockedCount: "5,830", icon: Zap },
  { name: "Trailblazer", criteria: "Finish first learning path", unlockedCount: "3,240", icon: Compass },
  { name: "Quiz champion", criteria: "Score 90% on 10 quizzes", unlockedCount: "1,022", icon: Medal },
];

export default function Badges() {
  return (
    <div>
      <PageHeader title="Badges" subtitle="Achievements unlocked by learners and contributors." />
      <div className="grid grid-cols-3 gap-4">
        {sampleBadges.map((b) => (
          <BadgeAdminCard key={b.name} {...b} />
        ))}
      </div>
    </div>
  );
}