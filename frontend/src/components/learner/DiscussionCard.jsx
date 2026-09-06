import { MessageCircle, ThumbsUp } from "lucide-react";

/**
 * DiscussionCard
 * A single community post preview: author, the path it was posted in,
 * the question/title, and reply/like counts.
 */
export default function DiscussionCard({ discussion, onOpen }) {
  const { author, pathTag, title, replies, likes } = discussion;
  const initials = author
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <button
      type="button"
      onClick={() => onOpen?.(discussion)}
      className="w-full rounded-2xl border border-black/5 bg-white p-6 text-left hover:border-purple-200"
    >
      <div className="flex items-center gap-2 text-sm">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-700">
          {initials}
        </div>
        <span className="font-semibold text-neutral-900">{author}</span>
        <span className="text-neutral-400">in</span>
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
          {pathTag}
        </span>
      </div>

      <p className="mt-3 text-base font-medium text-neutral-900">{title}</p>

      <div className="mt-3 flex items-center gap-4 text-sm text-neutral-500">
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle className="h-4 w-4" /> {replies} replies
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ThumbsUp className="h-4 w-4" /> {likes} likes
        </span>
      </div>
    </button>
  );
}
