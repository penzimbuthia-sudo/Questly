// src/pages/admin/Dashboard.jsx
import { useState } from 'react';
import { Users, BookOpen, MapPin, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const stats = [
  { title: 'Total users', value: '8,428', change: '+12.4%', icon: Users },
  { title: 'Active users', value: '2,341', change: '+18.6%', icon: Users },
  { title: 'Resources', value: '1,256', change: '+18.2%', icon: BookOpen },
  { title: 'Learning paths', value: '342', change: '+14.1%', icon: MapPin },
];

const pendingReviews = [
  { id: 1, title: 'React performance optimization', type: 'Resource', author: 'Asuka K.', initials: 'AK', detail: 'Video' },
  { id: 2, title: 'Advanced Typescript concepts', type: 'Resource', author: 'Brian O.', initials: 'BO', detail: 'Article' },
  { id: 3, title: 'Full stack MERN roadmap', type: 'Learning path', author: 'Chinedu M.', initials: 'CM', detail: '' },
];

const roleData = [
  { name: 'Learners', value: 72.9, color: 'var(--color-royal)' },
  { name: 'Contributors', value: 21.9, color: 'var(--color-butter)' },
  { name: 'Admins', value: 5.2, color: 'var(--color-ink-3)' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [reviewStatus, setReviewStatus] = useState({});

  const handleApprove = (id) => {
    if (window.confirm('Approve this content for publishing?')) {
      setReviewStatus((prev) => ({ ...prev, [id]: 'approved' }));
    }
  };

  const handleReject = (id) => {
    if (window.confirm('Reject this content?')) {
      setReviewStatus((prev) => ({ ...prev, [id]: 'rejected' }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-fg">Good afternoon, {user?.name || "Admin"}</h1>
        <p className="text-ink-2">Here's what's happening across Questly today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink-2">{stat.title}</p>
                <p className="text-2xl font-bold text-fg mt-1">{stat.value}</p>
                <div className="flex items-center gap-1 text-sm font-medium mt-1 text-tone-success-fg">
                  <TrendingUp size={16} />
                  {stat.change} vs last month
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-violet-500/10">
                <stat.icon size={24} className="text-violet-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="px-6 py-4 border-b border-line/10 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-fg">Content pending review</h3>
          <Button variant="ghost" size="sm">View all</Button>
        </div>
        <div className="p-6 space-y-4">
          {pendingReviews.map((item) => (
            <div key={item.id} className="flex items-start justify-between py-3 border-b border-line/5 last:border-0">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shrink-0 mt-1 bg-violet-500/15 text-violet-300">
                  {item.initials}
                </div>
                <div>
                  <p className="font-medium text-fg">{item.title}</p>
                  <p className="text-sm text-ink-2">
                    {item.type}{item.detail ? `: ${item.detail}` : ''} · Submitted by {item.author}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {reviewStatus[item.id] === 'approved' ? (
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-tone-success-bg text-tone-success-fg">Approved</span>
                ) : reviewStatus[item.id] === 'rejected' ? (
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-tone-danger-bg text-tone-danger-fg">Rejected</span>
                ) : (
                  <>
                    <Button variant="butter" size="sm" onClick={() => handleApprove(item.id)}>
                      <CheckCircle size={14} /> Approve
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleReject(item.id)}>
                      <XCircle size={14} /> Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="px-6 py-4 border-b border-line/10">
          <h3 className="text-lg font-semibold text-fg">User role distribution</h3>
          <p className="text-2xl font-bold text-fg mt-1">8,428</p>
          <p className="text-sm text-ink-2">Total users</p>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {roleData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-sm text-ink-2">{item.name}</span>
                <span className="text-sm font-semibold text-fg">{item.value}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-2 rounded-full overflow-hidden flex bg-surface-active">
            {roleData.map((item) => (
              <div key={item.name} className="h-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}