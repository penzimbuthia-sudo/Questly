import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

// Accepts both `open` (contributor's Add/CreatePathModal) and `isOpen`
// (admin's EditStatusModal) so this one component works for both sectors
// without either side needing to change how they call it.
export default function Modal({ open, isOpen, onClose, title, children }) {
  const visible = open ?? isOpen ?? false

  useEffect(() => {
    if (!visible) return

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [visible, onClose])

  if (!visible) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border p-6 shadow-xl max-h-[90vh] overflow-y-auto"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <div className="flex items-center justify-between mb-5">
          {title && (
            <h2 id="modal-title" className="font-display font-semibold text-[16px]">
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="focus-ring grid place-items-center w-8 h-8 rounded-lg ml-auto text-[var(--color-ink-3)] hover:text-white hover:bg-[var(--color-surface-hover)]"
          >
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  )
}