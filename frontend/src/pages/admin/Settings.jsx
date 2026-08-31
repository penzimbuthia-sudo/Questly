import { useState } from "react";
import { PageHeader } from "@/components/layout";
import { Card, SectionHeader, Toggle } from "@/components/ui";

const initialSettings = [
  { key: "reviewBeforePublish", label: "Require review before publishing", desc: "Contributor content stays pending until approved.", on: true },
  { key: "autoFlag", label: "Auto-flag reported content after 3 reports", desc: "Escalates a thread or resource to the reports queue automatically.", on: true },
  { key: "weeklyReset", label: "Weekly leaderboard reset", desc: "Points reset every Monday at 00:00.", on: true },
  { key: "seasonalBadges", label: "Seasonal event badges", desc: "Show limited-time badges after the event ends.", on: false },
  { key: "maintenanceMode", label: "Maintenance mode", desc: "Takes the platform offline for learners.", on: false },
];

export default function Settings() {
  const [settings, setSettings] = useState(initialSettings);

  function toggleSetting(key) {
    setSettings((current) =>
      current.map((s) => (s.key === key ? { ...s, on: !s.on } : s))
    );
  }

  return (
    <div>
      <PageHeader title="Settings" subtitle="Platform-wide defaults for moderation and gamification." />

      <Card className="p-5">
        <SectionHeader title="Platform defaults" />
        <div className="flex flex-col">
          {settings.map((s, index) => (
            <div
              key={s.key}
              className={`flex items-center justify-between py-3 ${index !== 0 ? "border-t border-line/10" : ""}`}
            >
              <div className="pr-4">
                <div className="text-sm font-medium text-fg">{s.label}</div>
                <div className="text-xs text-fg/50 mt-0.5">{s.desc}</div>
              </div>
              <Toggle on={s.on} onChange={() => toggleSetting(s.key)} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}