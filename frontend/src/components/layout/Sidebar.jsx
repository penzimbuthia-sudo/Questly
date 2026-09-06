import { LogOut } from "lucide-react";
import Avatar from "../ui/Avatar";

export default function Sidebar({
  logo,
  logoText = "Questly",
  groups = [],
  activeKey,
  onNavigate,
  user,
  onLogout,
}) {
  return (
    <aside className="w-60 shrink-0 h-screen sticky top-0 flex flex-col bg-card border-r border-line/10 py-5 px-3">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-8">
        {logo ?? (
          <>
            <div className="w-8 h-8 rounded-lg bg-royal flex items-center justify-center">
              <span className="text-ivory font-bold text-sm">Q</span>
            </div>
            <span className="font-bold text-lg text-fg">{logoText}</span>
          </>
        )}
      </div>

      {/* Nav groups */}
      <nav className="flex-1 flex flex-col gap-5 overflow-y-auto">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="flex flex-col gap-1">
            {/* Only show a group label if one was given */}
            {group.label && (
              <div className="text-[11px] font-semibold text-fg/40 uppercase tracking-wide px-3 mb-1">
                {group.label}
              </div>
            )}

            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = item.key === activeKey;

              return (
                <button
                  key={item.key}
                  onClick={() => onNavigate?.(item.key)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors
                    ${isActive ? "bg-royal/15 text-royal" : "text-fg/60 hover:bg-fg/5"}`}
                >
                  {Icon && <Icon size={17} strokeWidth={2} />}
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User info + logout, pinned to the bottom */}
      {user && (
        <div className="pt-4 mt-4 border-t border-line/10 flex items-center gap-3 px-2">
          <Avatar name={user.name} initials={user.initials} size={34} />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-fg truncate">{user.name}</div>
            <div className="text-xs text-fg/40 truncate">{user.roleLabel}</div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            aria-label="Log out"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-fg/40 hover:bg-fg/5 hover:text-fg"
          >
            <LogOut size={15} />
          </button>
        </div>
      )}
    </aside>
  );
}