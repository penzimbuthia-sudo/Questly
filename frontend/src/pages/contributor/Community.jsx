import { PageHeader } from "@/components/layout";
import { Card } from "@/components/ui";

export default function Community() {
  return (
    <div>
      <PageHeader title="Community" subtitle="Activity on your shared content." />

      <Card className="p-5 text-sm text-fg/60">No community activity yet.</Card>
    </div>
  );
}