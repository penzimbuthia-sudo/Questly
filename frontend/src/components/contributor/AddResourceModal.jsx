import { useState } from 'react'
import Modal from '../ui/Modal'

const TYPES = [
  { value: 'video', label: 'Video' },
  { value: 'article', label: 'Article' },
]

const inputClass =
  'focus-ring w-full rounded-lg px-3.5 h-10 text-[13.5px] border outline-none placeholder:text-[var(--color-ink-3)] transition-colors focus:border-[var(--color-violet-500)]'
const inputStyle = { background: 'var(--color-surface)', borderColor: 'var(--color-border)' }

// Shape submitted here is what lands in Admin's review queue (Person E).
// { id, title, type, url, description, status: 'pending', submittedAt, author }
export default function AddResourceModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ title: '', type: 'video', url: '', description: '' })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.({
      id: Date.now(),
      ...form,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    })
    setForm({ title: '', type: 'video', url: '', description: '' })
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Share a resource">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'var(--color-ink-1)' }}>Title</label>
          <input
            required
            value={form.title}
            onChange={update('title')}
            placeholder="e.g. Understanding React useEffect Hook"
            className={inputClass}
            style={inputStyle}
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'var(--color-ink-1)' }}>Type</label>
          <div className="flex gap-2">
            {TYPES.map((t) => (
              <button
                type="button"
                key={t.value}
                onClick={() => setForm((f) => ({ ...f, type: t.value }))}
                className="focus-ring flex-1 rounded-lg h-10 text-[13.5px] font-medium border transition-colors"
                style={
                  form.type === t.value
                    ? { background: 'var(--color-violet-600)', borderColor: 'var(--color-violet-600)', color: '#fff' }
                    : { ...inputStyle, color: 'var(--color-ink-1)' }
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'var(--color-ink-1)' }}>Link</label>
          <input
            required
            type="url"
            value={form.url}
            onChange={update('url')}
            placeholder="https://..."
            className={inputClass}
            style={inputStyle}
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'var(--color-ink-1)' }}>Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={update('description')}
            placeholder="What will learners get from this?"
            className={`${inputClass} h-auto py-2.5 resize-none`}
            style={inputStyle}
          />
        </div>

        <p className="text-xs" style={{ color: 'var(--color-ink-3)' }}>
          Submitted resources go to Admin for review before they're published.
        </p>

        <div className="flex justify-end gap-2 mt-1">
          <button
            type="button"
            onClick={onClose}
            className="focus-ring rounded-lg px-4 h-10 text-[13.5px] font-medium text-[var(--color-ink-1)] hover:text-white hover:bg-[var(--color-surface-hover)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="focus-ring rounded-lg px-4 h-10 text-[13.5px] font-semibold text-white"
            style={{ background: 'linear-gradient(155deg, var(--color-violet-500), var(--color-violet-700))' }}
          >
            Submit for review
          </button>
        </div>
      </form>
    </Modal>
  )
}
