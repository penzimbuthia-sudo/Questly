import { Inbox } from "lucide-react";

export default function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div className="flex flex-col items-center text-center py-14 px-6">
      <div className="w-12 h-12 rounded-full bg-fg/5 flex items-center justify-center mb-4">
        <Icon size={20} className="text-fg/40" />
      </div>
      <p className="text-sm font-semibold text-fg">{title}</p>
      {description && <p className="text-xs text-fg/50 mt-1 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}