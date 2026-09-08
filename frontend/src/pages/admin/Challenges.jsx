import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout";
import { Button } from "@/components/ui";
import { Check, X } from "lucide-react";
import { getChallenges } from "@/services/gamificationService";

function formatPeriod(start, end) {
  if (!start || !end) return "No dates set";
  const opts = { month: "short", day: "numeric" };
  return `${new Date(start).toLocaleDateString(undefined, opts)} – ${new Date(end).toLocaleDateString(undefined, opts)}`;
}

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchChallenges();
  }, []);

  async function fetchChallenges() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/admin/challenges', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setChallenges(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  }

  async function reviewChallenge(challengeId, status) {
    if (!confirm(`Are you sure you want to ${status.toLowerCase()} this challenge?`)) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/admin/challenges/${challengeId}/review`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        fetchChallenges();
      } else {
        const error = await response.json();
        alert('Failed to review challenge: ' + (error.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error reviewing challenge:', error);
      alert('Error reviewing challenge');
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Published': return 'Published';
      case 'Pending': return 'Pending Review';
      case 'Rejected': return 'Rejected';
      default: return status || 'Draft';
    }
  };

  const filteredChallenges = filter === "all" 
    ? challenges 
    : challenges.filter(c => c.status === filter);

  const counts = {
    all: challenges.length,
    Pending: challenges.filter(c => c.status === 'Pending').length,
    Published: challenges.filter(c => c.status === 'Published').length,
    Rejected: challenges.filter(c => c.status === 'Rejected').length,
  };

  return (
    <div>
      <div className="mb-4">
        <PageHeader 
          title="Challenges" 
          subtitle="Weekly, monthly, and seasonal events that drive engagement." 
        />
        <div className="flex gap-2 mt-3">
          <Button 
            variant={filter === "all" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => setFilter("all")}
          >
            All ({counts.all})
          </Button>
          <Button 
            variant={filter === "Pending" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => setFilter("Pending")}
            className={filter === "Pending" ? "bg-yellow-500 text-white" : "border-yellow-500 text-yellow-700"}
          >
            Pending ({counts.Pending})
          </Button>
          <Button 
            variant={filter === "Published" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => setFilter("Published")}
            className={filter === "Published" ? "bg-green-500 text-white" : "border-green-500 text-green-700"}
          >
            Published ({counts.Published})
          </Button>
          <Button 
            variant={filter === "Rejected" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => setFilter("Rejected")}
            className={filter === "Rejected" ? "bg-red-500 text-white" : "border-red-500 text-red-700"}
          >
            Rejected ({counts.Rejected})
          </Button>
        </div>
      </div>

      {!loading && filteredChallenges.length === 0 && (
        <div className="text-center py-8 text-fg/50">
          <p className="text-lg">No challenges found</p>
          {filter === "Pending" && (
            <p className="text-sm mt-1">All submitted challenges have been reviewed</p>
          )}
          {filter === "all" && (
            <p className="text-sm mt-1">Contributors haven't created any challenges yet</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {filteredChallenges.map((c) => (
          <div key={c.id} className="bg-card border border-line/10 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{c.title}</h3>
                <p className="text-sm text-fg/50 mt-1">{c.description || "No description"}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ml-2 ${getStatusColor(c.status)}`}>
                {getStatusBadge(c.status)}
              </span>
            </div>
            
            <div className="flex items-center gap-2 mt-2 text-xs text-fg/50">
              <span>{formatPeriod(c.period_start, c.period_end)}</span>
              <span>•</span>
              <span>{c.participants || 0} participants</span>
              <span>•</span>
              <span className="text-green-600 font-medium">{c.reward_xp || 0} XP</span>
            </div>
            
            {c.created_by && (
              <div className="mt-1 text-xs text-fg/50">
                Submitted by: {c.created_by_name || 'Contributor'}
              </div>
            )}
            
            {c.activities && c.activities.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-fg/50">Activities: {c.activities.length}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {c.activities.slice(0, 3).map((act, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 px-2 py-0.5 rounded">• {act}</span>
                  ))}
                  {c.activities.length > 3 && (
                    <span className="text-xs text-fg/50">+{c.activities.length - 3} more</span>
                  )}
                </div>
              </div>
            )}

            {c.status === 'Pending' && (
              <div className="mt-3 pt-3 border-t border-line/10">
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700 text-white flex-1"
                    onClick={() => reviewChallenge(c.id, 'Published')}
                  >
                    <Check size={14} className="mr-1" /> Approve
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    className="flex-1"
                    onClick={() => reviewChallenge(c.id, 'Rejected')}
                  >
                    <X size={14} className="mr-1" /> Reject
                  </Button>
                </div>
                <p className="text-xs text-fg/50 mt-1 text-center">Review this challenge before publishing</p>
              </div>
            )}

            {c.status === 'Published' && (
              <div className="mt-3 pt-3 border-t border-line/10">
                <p className="text-xs text-green-600">Published - Visible to all learners</p>
              </div>
            )}
            {c.status === 'Rejected' && (
              <div className="mt-3 pt-3 border-t border-line/10">
                <p className="text-xs text-red-600">Rejected - Not visible to learners</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
