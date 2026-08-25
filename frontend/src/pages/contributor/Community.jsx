import { useState } from 'react'
import { MessageCircle, ArrowLeft, User, UserPlus, Mail, Send, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/contributor/PageHeader'
import Avatar from '../../components/contributor/Avatar'
import { communityActivity, engagementSnapshot } from '../../data/mockData'

export default function Community() {
  const [replyTo, setReplyTo] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [showReplyInput, setShowReplyInput] = useState(false)

  const handleReply = (activityId) => {
    setReplyTo(activityId)
    setShowReplyInput(true)
    // Focus the reply input after render
    setTimeout(() => {
      document.getElementById('reply-input')?.focus()
    }, 100)
  }

  const handleSendReply = (e) => {
    e.preventDefault()
    if (!replyText.trim()) return
    // Handle reply submission
    console.log('Replying to:', replyTo, 'with:', replyText)
    setReplyText('')
    setReplyTo(null)
    setShowReplyInput(false)
  }

  const handleCancelReply = () => {
    setReplyText('')
    setReplyTo(null)
    setShowReplyInput(false)
  }

  return (
    <div>
      {/* Back button */}
      <div className="mb-4">
        <Link 
          to="/contributor/dashboard" 
          className="inline-flex items-center gap-2 text-sm hover:text-violet-600 transition-colors"
          style={{ color: 'var(--color-ink-2)' }}
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </div>

      <PageHeader
        eyebrow="Contributor workspace"
        title="Community activity on your work"
        subtitle="See how learners are engaging with what you've shared."
        action={
          <div className="flex items-center gap-2">
            <Link
              to="/contributor/community/messages"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-violet-50"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-1)' }}
            >
              <Mail size={16} />
              Messages
            </Link>
            <Link
              to="/community"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ background: 'linear-gradient(155deg, var(--color-violet-500), var(--color-violet-700))' }}
            >
              <UserPlus size={16} />
              Join Community
            </Link>
          </div>
        }
      />

      <div className="grid lg:grid-cols-5 gap-4">
        {/* Community Activity Feed */}
        <div
          className="lg:col-span-3 rounded-2xl border divide-y"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          {communityActivity.map((a) => (
            <div key={a.id} className="flex items-start gap-3 p-4 hover:bg-violet-50/5 transition-colors" style={{ borderColor: 'var(--color-border-soft)' }}>
              <Link to={`/profile/${a.id}`}>
                <Avatar initials={a.initials} size={34} />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px]">
                  <Link to={`/profile/${a.id}`} className="font-semibold hover:text-violet-400 transition-colors">
                    {a.name}
                  </Link>
                  <span style={{ color: 'var(--color-ink-1)' }}> {a.action}</span>{' '}
                  <Link to={`/content/${a.targetId || a.id}`} className="font-medium hover:text-amber-300 transition-colors" style={{ color: 'var(--color-amber-300)' }}>
                    {a.target}
                  </Link>
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-ink-3)' }}>{a.time}</p>
              </div>
              <button
                onClick={() => handleReply(a.id)}
                aria-label="Reply"
                className="focus-ring grid place-items-center w-8 h-8 rounded-lg shrink-0 text-[var(--color-ink-2)] hover:text-white hover:bg-[var(--color-surface-hover)] transition-colors"
              >
                <MessageCircle size={15} />
              </button>
            </div>
          ))}
          
          {/* View all activity link */}
          <div className="p-4 text-center">
            <Link
              to="/community/activity"
              className="text-sm font-medium text-violet-500 hover:text-violet-600 transition-colors"
            >
              View all activity →
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Engagement Snapshot */}
          <div
            className="rounded-2xl border p-5"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <h3 className="font-display font-semibold text-[15px] mb-4">Engagement snapshot</h3>
            <dl className="flex flex-col gap-3 text-[13.5px]">
              <div className="flex items-center justify-between">
                <dt style={{ color: 'var(--color-ink-2)' }}>Comments this week</dt>
                <dd className="font-semibold">{engagementSnapshot.commentsThisWeek}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt style={{ color: 'var(--color-ink-2)' }}>Questions answered</dt>
                <dd className="font-semibold">{engagementSnapshot.questionsAnswered}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt style={{ color: 'var(--color-ink-2)' }}>Avg. response time</dt>
                <dd className="font-semibold">{engagementSnapshot.avgResponseTime}</dd>
              </div>
              <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border-soft)' }}>
                <dt className="mb-1" style={{ color: 'var(--color-ink-2)' }}>Most discussed</dt>
                <Link to={`/content/${engagementSnapshot.mostDiscussedId || '1'}`} className="font-medium hover:text-amber-300 transition-colors" style={{ color: 'var(--color-amber-300)' }}>
                  {engagementSnapshot.mostDiscussed}
                </Link>
              </div>
            </dl>
          </div>

          {/* Frequent Commenters */}
          <div
            className="rounded-2xl border p-5"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-[15px] flex items-center gap-1.5">
                <User size={16} />
                Frequent commenters
              </h3>
              <Link
                to="/community/top-contributors"
                className="text-xs font-medium text-violet-500 hover:text-violet-600 transition-colors"
              >
                View all
              </Link>
            </div>
            <ul className="flex flex-col gap-3">
              {engagementSnapshot.frequentCommenters.map((c) => (
                <li key={c.name} className="flex items-center gap-3">
                  <Link to={`/profile/${c.id}`}>
                    <Avatar initials={c.initials} size={30} />
                  </Link>
                  <Link to={`/profile/${c.id}`} className="text-[13.5px] font-medium hover:text-violet-400 transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div
            className="rounded-2xl border p-4"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/community/new-post"
                className="text-center px-3 py-2 rounded-lg text-xs font-medium border transition-colors hover:bg-violet-50"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-1)' }}
              >
                New Post
              </Link>
              <Link
                to="/community/discussions"
                className="text-center px-3 py-2 rounded-lg text-xs font-medium border transition-colors hover:bg-violet-50"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-1)' }}
              >
                Discussions
              </Link>
              <Link
                to="/community/leaderboard"
                className="text-center px-3 py-2 rounded-lg text-xs font-medium border transition-colors hover:bg-violet-50"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-1)' }}
              >
                Leaderboard
              </Link>
              <Link
                to="/community/events"
                className="text-center px-3 py-2 rounded-lg text-xs font-medium border transition-colors hover:bg-violet-50"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-1)' }}
              >
                Events
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Reply Input - Fixed at bottom */}
      {showReplyInput && (
        <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white shadow-lg z-50" style={{ borderColor: 'var(--color-border)' }}>
          <form onSubmit={handleSendReply} className="max-w-6xl mx-auto flex gap-2">
            <div className="flex-1 relative">
              <input
                id="reply-input"
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="w-full px-4 py-2.5 pr-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-violet-500"
                style={{ borderColor: 'var(--color-border)' }}
              />
              {replyText && (
                <button
                  type="button"
                  onClick={() => setReplyText('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="px-5 py-2.5 rounded-lg text-white bg-violet-500 hover:bg-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send size={16} />
              Reply
            </button>
            <button
              type="button"
              onClick={handleCancelReply}
              className="px-5 py-2.5 rounded-lg border hover:bg-gray-50 transition-colors"
              style={{ borderColor: 'var(--color-border)' }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Spacer for fixed reply input */}
      {showReplyInput && <div className="h-20" />}
    </div>
  )
}