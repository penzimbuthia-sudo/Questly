import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout";
import { Card, SectionHeader, Toggle, Button } from "@/components/ui";
import { getSettings, updateSettings } from "@/services/adminService";
import { toast } from "sonner";

const FIELDS = [
  { key: "reviewBeforePublish", label: "Require review before publishing", desc: "Contributor content stays pending until approved." },
  { key: "autoFlag", label: "Auto-flag reported content after 3 reports", desc: "Escalates a thread or resource to the reports queue automatically." },
  { key: "weeklyReset", label: "Weekly leaderboard reset", desc: "Points reset every Monday at 00:00." },
  { key: "seasonalBadges", label: "Seasonal event badges", desc: "Show limited-time badges after the event ends." },
  { key: "maintenanceMode", label: "Maintenance mode", desc: "Takes the platform offline for learners." },
];

export default function Settings() {
  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings().then(setValues).finally(() => setLoading(false));
  }, []);

  function toggleSetting(key) {
    setValues((current) => ({ ...current, [key]: !current[key] }));
  }

  async function saveSettings() {
    setSaving(true);
    try {
      const saved = await updateSettings(values);
      setValues(saved);
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error(error.message || "Could not save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !values) {
    return (
      <div>
        <PageHeader title="Settings" subtitle="Platform-wide defaults for moderation and gamification." />
        <Card className="p-5 h-40 animate-pulse" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Settings" subtitle="Platform-wide defaults for moderation and gamification." />
      <Card className="p-5">
        <SectionHeader title="Platform defaults" />
        <div className="flex flex-col">
          {FIELDS.map((f, index) => (
            <div key={f.key} className={`flex items-center justify-between py-3 ${index !== 0 ? "border-t border-line/10" : ""}`}>
              <div className="pr-4">
                <div className="text-sm font-medium text-fg">{f.label}</div>
                <div className="text-xs text-fg/50 mt-0.5">{f.desc}</div>
              </div>
              <Toggle on={values[f.key]} onChange={() => toggleSetting(f.key)} />
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-end border-t border-line/10 pt-4">
          <Button type="button" variant="primary" disabled={saving} onClick={saveSettings}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Card>
    </div>
  );
}