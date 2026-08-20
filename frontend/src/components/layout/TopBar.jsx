import { Search, Bell } from "lucide-react";
import Avatar from "../ui/Avatar";

export default function TopBar({
  searchPlaceholder = "Search...",
  notificationCount = 0,
  user,
}) {
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-line/10">
      {/* Search box (just a visual placeholder for now — wiring it up
          to real search happens later, in whichever page needs it) */}
      <div className="flex-1 max-w-md flex items-center gap-2 bg-page border border-line/10 rounded-xl px-3 py-2">
        <Search size={15} className="text-fg/40" />
        <span className="text-sm text-fg/40 truncate">{searchPlaceholder}</span>
      </div>

      {/* Notification bell */}
      <button
        aria-label="Notifications"
        className="relative w-9 h-9 rounded-lg flex items-center justify-center bg-page border border-line/10 text-fg/60 hover:text-fg"
      >
        <Bell size={16} />
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-butter" />
        )}
      </button>

      {/* User info — only shown if a user was passed in */}
      {user && (
        <div className="hidden sm:flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl bg-page border border-line/10">
          <Avatar name={user.name} initials={user.initials} size={30} />
          <div className="leading-tight">
            <p className="text-xs font-semibold text-fg">{user.name}</p>
            <p className="text-[11px] text-fg/40">{user.roleLabel}</p>
          </div>
        </div>
      )}
    </div>
  );
}