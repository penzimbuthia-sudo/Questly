import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { ChallengeAdminCard } from "@/components/admin";
import { Button, FormField } from "@/components/ui";
import Modal from "@/components/ui/Modal";
import { getChallenges, createChallenge } from "@/services/gamificationService";
import { toast } from "sonner";

function formatPeriod(start, end) {
  if (!start || !end) return "No dates set";
  const opts = { month: "short", day: "numeric" };
  return `${new Date(start).toLocaleDateString(undefined, opts)} – ${new Date(end).toLocaleDateString(undefined, opts)}`;
}

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", reward_xp: 0 });

  async function handleCreate(event) {
    event.preventDefault();
    try {
      const challenge = await createChallenge(form);
      setChallenges((current) => [...current, { ...challenge, participants: 0 }]);
      setForm({ title: "", description: "", reward_xp: 0 });
      setShowCreate(false);
      toast.success("Challenge created!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getChallenges().then(setChallenges).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Challenges" subtitle="Weekly, monthly, and seasonal events that drive engagement." action={<Button variant="primary" onClick={() => setShowCreate(true)}><Plus size={14} /> Create Challenge</Button>} />
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
      <Modal open={showCreate} title="Create challenge" onClose={() => setShowCreate(false)}>
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <FormField label="Title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          <FormField as="textarea" label="Description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
          <FormField type="number" min="0" label="Reward XP" value={form.reward_xp} onChange={(event) => setForm({ ...form, reward_xp: Number(event.target.value) })} />
          <Button type="submit" variant="primary">Create challenge</Button>
        </form>
      </Modal>
    </div>
  );
}