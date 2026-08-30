import { PageHeader } from "@/components/layout";
import { ChallengeAdminCard } from "@/components/admin";

/*
  Challenges - sample data for now. Once Person D adds an
  "updateChallenge" function to gamificationService.js, this page
  can fetch and edit real challenges the same way Users.jsx does.
*/

const sampleChallenges = [
  { title: "The 5-day builder", period: "This week", participants: 1840, status: "Active", reward: "500 XP" },
  { title: "Data Science Month", period: "Aug 1 – Aug 31", participants: 960, status: "Active", reward: "Seasonal badge" },
  { title: "Quiz Master Sprint", period: "Sep 1 – Sep 7", participants: 0, status: "Upcoming", reward: "300 XP" },
];

export default function Challenges() {
  return (
    <div>
      <PageHeader title="Challenges" subtitle="Weekly, monthly, and seasonal events that drive engagement." />
      <div className="grid grid-cols-2 gap-4">
        {sampleChallenges.map((c) => (
          <ChallengeAdminCard key={c.title} {...c} />
        ))}
      </div>
    </div>
  );
}