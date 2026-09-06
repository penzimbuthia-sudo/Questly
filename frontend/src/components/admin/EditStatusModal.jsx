import { Button, FormField } from "@/components/ui";

export default function EditStatusModal({
  title,
  subtitle,
  statusOptions = [],
  value,
  onChange,
  onCancel,
  onSave,
  details,
}) {
  return (
    // Dark see-through backdrop that covers the whole screen
    <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50">
      {/* The actual dialog box */}
      <div className="bg-card border border-line/10 rounded-2xl p-6 w-full max-w-sm">
        <div className="text-base font-semibold text-fg">{title}</div>
        {subtitle && <div className="text-xs text-fg/50 mt-1">{subtitle}</div>}
        {details && (
          <div className="mt-4 rounded-lg bg-page p-3 text-xs text-fg/70">
            {details.type && <div><span className="font-semibold">Type:</span> {details.type}</div>}
            {details.description && <p className="mt-2">{details.description}</p>}
            {details.url && (
              <a className="mt-2 block truncate text-royal hover:underline" href={details.url} target="_blank" rel="noreferrer">
                Open submitted resource
              </a>
            )}
          </div>
        )}

        <div className="mt-5">
          <FormField
            as="select"
            label="Status"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </FormField>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" className="flex-1" onClick={onSave}>
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
}