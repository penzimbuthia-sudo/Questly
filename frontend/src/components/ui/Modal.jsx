import { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Modal
 * Generic dialog primitive. Was a 0-byte stub — components/contributor/
 * AddResourceModal.jsx and CreatePathModal.jsx use `open`, while
 * components/admin/EditStatusModal.jsx uses `isOpen`; both are accepted
 * here rather than picking one and having to touch every call site.
 *
 * Closes on Escape and on backdrop click; locks body scroll while open.
 */
export default function Modal({ open, isOpen, onClose, title, children }) {
  const show = open ?? isOpen ?? false;

  useEffect(() => {
    if (!show) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/60"
        aria-hidden="true"
        onClick={() => onClose?.()}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-card border border-line/10 p-6 shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          {title && <h2 className="text-base font-semibold text-fg">{title}</h2>}
          <button
            type="button"
            onClick={() => onClose?.()}
            aria-label="Close"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-fg/40 hover:bg-fg/5 hover:text-fg ml-auto"
          >
            <X size={16} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
