import { Star, Bookmark, BookmarkCheck, BookOpen } from "lucide-react";

const LEVEL_STYLES = {
  Beginner: "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-rose-100 text-rose-700",
};

/**
 * LearningPathCard
 * Catalog-style card used on Explore / All paths / Recommended grids.
 * Pass `progress` (0-100) + `resumeLabel` to render an enrolled/"Resume"
 * variant instead of "Start path".
 *
 * Props:
 *  - path: { id, title, icon, level, category, modules (or totalModules), xpReward, rating, author }
 *  - onStart(path) / onOpen(path)
 *  - bookmarked, onToggleBookmark(path)
 *  - showMeta: whether to show the rating/author row (Explore = true)
 */
export default function LearningPathCard({
  path,
  onStart,
  onOpen,
  bookmarked = false,
  onToggleBookmark,
  showMeta = false,
}) {
  const totalModules = path.totalModules ?? path.modules?.length ?? 0;

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-lg">
          {path.icon}
        </div>
        {onToggleBookmark && (
          <button
            type="button"
            onClick={() => onToggleBookmark(path)}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark this path"}
            className="text-neutral-300 hover:text-purple-600"
          >
            {bookmarked ? (
              <BookmarkCheck className="h-5 w-5 text-purple-600" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      <span className={`mt-4 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${LEVEL_STYLES[path.level] ?? "bg-neutral-100 text-neutral-600"}`}>
        {path.level}
      </span>

      <button
        type="button"
        onClick={() => onOpen?.(path)}
        className="mt-2 block text-left text-base font-semibold text-neutral-900 hover:text-purple-600"
      >
        {path.title}
      </button>

      <p className="mt-1 text-sm text-amber-600">
        {totalModules} modules · {path.xpReward.toLocaleString()} XP
      </p>

      {showMeta && (
        <div className="mt-2 flex items-center gap-1 text-sm text-neutral-500">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>{path.rating}</span>
          <span className="ml-auto text-neutral-400">by {path.author}</span>
        </div>
      )}

      <button
        type="button"
        onClick={() => onStart?.(path)}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3.5 py-1.5 text-sm font-medium text-neutral-800 hover:border-purple-300 hover:text-purple-600"
      >
        <BookOpen className="h-4 w-4" />
        Start path
      </button>
    </div>
  );
}
