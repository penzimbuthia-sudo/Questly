import { useState } from 'react'
import { Plus, X as XIcon } from 'lucide-react'
import Modal from '../ui/Modal'

const inputClass =
  'focus-ring w-full rounded-lg px-3.5 h-10 text-[13.5px] border outline-none placeholder:text-[var(--color-ink-3)] transition-colors focus:border-[var(--color-violet-500)]'
const inputStyle = { background: 'var(--color-surface)', borderColor: 'var(--color-border)' }

// Shape submitted here is what lands in Admin's review queue (Person E).
// { id, title, description, modules: [{ id, title }], status: 'pending', submittedAt }
export default function CreatePathModal({ open, onClose, onSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [modules, setModules] = useState([{ id: 1, title: '' }])

  const addModule = () => setModules((m) => [...m, { id: Date.now(), title: '' }])
  const removeModule = (id) => setModules((m) => m.filter((mod) => mod.id !== id))
  const updateModule = (id, value) =>
    setModules((m) => m.map((mod) => (mod.id === id ? { ...mod, title: value } : mod)))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.({
      id: Date.now(),
      title,
      description,
      modules: modules.filter((m) => m.title.trim()),
      status: 'pending',
      submittedAt: new Date().toISOString(),
    })
    setTitle('')
    setDescription('')
    setModules([{ id: 1, title: '' }])
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Create a learning path">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'var(--color-ink-1)' }}>Path title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Frontend Developer Roadmap 2026"
            className={inputClass}
            style={inputStyle}
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'var(--color-ink-1)' }}>Description</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Who is this path for, and what will they be able to do after?"
            className={`${inputClass} h-auto py-2.5 resize-none`}
            style={inputStyle}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-[13px] font-medium" style={{ color: 'var(--color-ink-1)' }}>Modules</label>
            <button
              type="button"
              onClick={addModule}
              className="focus-ring flex items-center gap-1 text-xs font-semibold"
              style={{ color: 'var(--color-violet-400)' }}
            >
              <Plus size={13} /> Add module
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {modules.map((mod, i) => (
              <div key={mod.id} className="flex items-center gap-2">
                <span className="text-xs w-5 shrink-0 text-center font-mono" style={{ color: 'var(--color-ink-3)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <input
                  value={mod.title}
                  onChange={(e) => updateModule(mod.id, e.target.value)}
                  placeholder={`Module ${i + 1} title`}
                  className={inputClass}
                  style={inputStyle}
                />
                {modules.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeModule(mod.id)}
                    aria-label="Remove module"
                    className="focus-ring grid place-items-center w-8 h-8 shrink-0 rounded-lg text-(--color-ink-3) hover:text-white hover:bg-(--color-surface-hover)"
                  >
                    <XIcon size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs" style={{ color: 'var(--color-ink-3)' }}>
          Paths go to Admin for review before they're published to learners.
        </p>

        <div className="flex justify-end gap-2 mt-1">
          <button
            type="button"
            onClick={onClose}
            className="focus-ring rounded-lg px-4 h-10 text-[13.5px] font-medium text-(--color-ink-1) hover:text-white hover:bg-(--color-surface-hover)"
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
