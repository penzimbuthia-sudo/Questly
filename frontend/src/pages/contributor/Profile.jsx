import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Card, Avatar, Button, SectionHeader } from "@/components/ui";

import { getMyStats, getMyBadges } from "@/services/gamificationService";

export default function Profile() {
  const [stats, setStats] = useState({ xp: 0, level: 1, resources: 0, paths: 0 });
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    getMyStats().then(setStats);
    getMyBadges().then(setBadges);
  }, []);

  return (
    <div>
      <PageHeader title="Profile" subtitle="How other contributors see you." />

      <Card className="p-6 flex items-center gap-5 mb-6">
        <Avatar name="Penzi M." size={64} />
        <div className="flex-1">
          <div className="text-lg font-bold text-fg">Penzi M.</div>
          <div className="text-sm text-fg/50">Contributor · Level {stats.level}</div>
        </div>
        <Button variant="outline" size="sm">
          <Pencil size={12} /> Edit profile
        </Button>
      </Card>

      <div>
        <SectionHeader title="Badges" />
        <div className="grid grid-cols-4 gap-4">
          {badges.map((badge) => (
            <Card key={badge.name} className="p-4 flex flex-col items-center text-center gap-2">
              <div className="w-11 h-11 rounded-full bg-butter/20 flex items-center justify-center">
                <span className="text-fg/60 text-xs">🏅</span>
              </div>
              <span className="text-xs font-medium text-fg">{badge.name}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}