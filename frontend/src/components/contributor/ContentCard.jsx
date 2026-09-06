import { Video, FileText, BookOpen, Eye, ThumbsUp } from "lucide-react";
import { Card, Pill } from "@/components/ui";

const TYPE_META = {
  Video: { icon: Video, color: "text-royal" },
  Article: { icon: FileText, color: "text-butter" },
  "Learning Path": { icon: BookOpen, color: "text-fg" },
};

export default function ContentCard({ title, type, views, upvotes, status }) {
  const meta = TYPE_META[type] || TYPE_META.Article;
  const Icon = meta.icon;

  return (
    <Card className="p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-lg bg-fg/8 flex items-center justify-center">
          <Icon size={16} className={meta.color} />
        </div>
        <Pill status={status} />
      </div>

      <div className="text-sm font-semibold text-fg leading-snug">{title}</div>

      <div className="flex items-center gap-4 text-xs text-fg/50 pt-2 border-t border-line/10">
        <span className="flex items-center gap-1">
          <Eye size={12} /> {views.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <ThumbsUp size={12} /> {upvotes}
        </span>
      </div>
    </Card>
  );
}