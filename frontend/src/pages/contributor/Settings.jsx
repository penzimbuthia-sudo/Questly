import { useState } from "react";
import { PageHeader } from "@/components/layout";
import { Card, FormField, SectionHeader, Toggle, Button } from "@/components/ui";

export default function Settings() {
  const [notifSettings, setNotifSettings] = useState({
    contentReviewed: true,
    comments: true,
    weeklyDigest: false,
  });

  function toggleNotif(key) {
    setNotifSettings((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your contributor profile and preferences." />

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-5">
          <Card className="p-5">
            <SectionHeader title="Profile" />
            <div className="flex flex-col gap-4">
              <FormField label="Display name" defaultValue="Penzi M." />
              <FormField as="textarea" label="Bio" defaultValue="Sharing what I learn about React and JavaScript." />
              <FormField label="Email" type="email" defaultValue="penzi.mbuthia@questly.io" />
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card className="p-5">
            <SectionHeader title="Notifications" />
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-fg">Content approved or rejected</span>
                <Toggle on={notifSettings.contentReviewed} onChange={() => toggleNotif("contentReviewed")} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-fg">Comments on your content</span>
                <Toggle on={notifSettings.comments} onChange={() => toggleNotif("comments")} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-fg">Weekly digest</span>
                <Toggle on={notifSettings.weeklyDigest} onChange={() => toggleNotif("weeklyDigest")} />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-5">
        <Button variant="primary">Save changes</Button>
      </div>
    </div>
  );
}