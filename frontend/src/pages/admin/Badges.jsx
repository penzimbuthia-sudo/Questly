import { useEffect, useState } from "react";
import { Zap, Compass, Medal, Flame, Trophy, Crown, Award, Plus } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { BadgeAdminCard } from "@/components/admin";
import { Button } from "@/components/ui";
import { api } from "@/services/api";
import { getBadgeStats } from "@/services/gamificationService";

const ICONS = { zap: Zap, compass: Compass, medal: Medal, flame: Flame, trophy: Trophy, crown: Crown };

export default function Badges() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    getBadgeStats().then(setBadges).finally(() => setLoading(false));
  }, []);

  async function fetchBadges() {
    setLoading(true);
    getBadgeStats().then(setBadges).finally(() => setLoading(false));
  }

  async function handleCreateBadge(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      icon_key: formData.get('icon_key'),
      criteria: formData.get('criteria'),
      xp_reward: parseInt(formData.get('xp_reward')) || 50
    };

    try {
      await api.post('/admin/badges', data);
      await fetchBadges();
      setShowCreateModal(false);
      e.target.reset();
    } catch (error) {
      console.error('Error creating badge:', error);
      alert(`Failed to create badge: ${error.message || 'Unknown error'}`);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-start mb-4">
        <PageHeader 
          title="Badges" 
          subtitle="Achievements unlocked by learners and contributors." 
        />
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 mt-2"
        >
          <Plus size={16} />
          Create Badge
        </Button>
      </div>

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

      {/* Create Badge Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Create Badge</h2>
            <form onSubmit={handleCreateBadge}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Badge Name *</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g., Coding Master"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  name="description"
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Brief description"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Icon Key</label>
                <select
                  name="icon_key"
                  className="w-full border rounded px-3 py-2"
                  defaultValue="trophy"
                >
                  <option value="zap">Zap</option>
                  <option value="compass">Compass</option>
                  <option value="medal">Medal</option>
                  <option value="flame">Flame</option>
                  <option value="trophy">Trophy</option>
                  <option value="crown">Crown</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Criteria</label>
                <input
                  name="criteria"
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g., Complete 10 challenges"
                  defaultValue="Complete challenges"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">XP Reward</label>
                <input
                  name="xp_reward"
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  placeholder="50"
                  defaultValue="50"
                  min="1"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" type="button" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Badge</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
