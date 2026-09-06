import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Zap, Compass, Medal, Flame, Trophy, Crown, Award } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { BadgeAdminCard } from "@/components/admin";
import { Button, FormField } from "@/components/ui";
import Modal from "@/components/ui/Modal";
import { getBadgeStats, createBadge } from "@/services/gamificationService";
import { toast } from "sonner";

const ICONS = { zap: Zap, compass: Compass, medal: Medal, flame: Flame, trophy: Trophy, crown: Crown };

export default function Badges() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: "", criteria: "", icon_key: "award" });

  async function handleCreate(event) {
    event.preventDefault();
    try {
      const badge = await createBadge(form);
      setBadges((current) => [...current, { ...badge, unlocked_count: 0 }]);
      setForm({ name: "", criteria: "", icon_key: "award" });
      setShowCreate(false);
      toast.success("Badge created!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getBadgeStats().then(setBadges).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Badges" subtitle="Achievements unlocked by learners and contributors." action={<Button variant="primary" onClick={() => setShowCreate(true)}><Plus size={14} /> Create Badge</Button>} />
      {!loading && badges.length === 0 && (
        <p className="text-sm text-fg/50">No badges have been created yet.</p>
      )}
      <div className="grid grid-cols-3 gap-4">
        {badges.map((b) => (
          <BadgeAdminCard
            key={b.id}
            name={b.name}
            criteria={b.criteria}
            unlockedCount={b.unlocked_count}
            icon={ICONS[b.icon_key] ?? Award}
          />
        ))}
      </div>
      <Modal open={showCreate} title="Create badge" onClose={() => setShowCreate(false)}>
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <FormField label="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <FormField label="Criteria" value={form.criteria} onChange={(event) => setForm({ ...form, criteria: event.target.value })} />
          <FormField label="Icon key" value={form.icon_key} onChange={(event) => setForm({ ...form, icon_key: event.target.value })} />
          <Button type="submit" variant="primary">Create badge</Button>
        </form>
      </Modal>
    </div>
  );
}