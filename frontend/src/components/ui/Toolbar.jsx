import { Search, Filter } from "lucide-react";

export default function Toolbar({
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  onFilterClick,
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex-1 max-w-xs flex items-center gap-2 bg-card border border-line/10 rounded-xl px-3 py-2">
        <Search size={14} className="text-fg/40" />
        <input
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder={searchPlaceholder}
          className="flex-1 bg-transparent text-sm text-fg placeholder:text-fg/30 outline-none"
        />
      </div>

      <button
        onClick={onFilterClick}
        className="flex items-center gap-1.5 text-xs font-semibold text-fg/60 bg-card border border-line/10 rounded-xl px-3 py-2"
      >
        <Filter size={13} />
        Filter
      </button>
    </div>
  );
}