import { useState } from "react";
import { MessageSquare, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Card, Avatar } from "@/components/ui";

const sampleActivity = [
  { user: "Aisha K.", text: "left a comment on your path", target: "Frontend Developer Roadmap 2026", time: "2h ago" },
  { user: "Brian O.", text: "asked a question on", target: "Understanding React useEffect Hook", time: "5h ago" },
  { user: "Chinedu M.", text: "upvoted", target: "JavaScript Array Methods, Explained", time: "1d ago" },
];

export default function Community() {
  const [activity] = useState(sampleActivity);

  return (
    <div>
      <PageHeader title="Community" subtitle="Activity on your shared content." />

      <Card className="p-0">
        {activity.map((item, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-4 ${index !== 0 ? "border-t border-line/10" : ""}`}
          >
            <Avatar name={item.user} size={36} />
            <div className="flex-1 text-sm">
              <span className="font-medium text-fg">{item.user}</span>{" "}
              <span className="text-fg/60">{item.text}</span>{" "}
              <span className="font-medium text-butter">{item.target}</span>
              <div className="text-xs mt-1 flex items-center gap-1 text-fg/40">
                <Clock size={11} /> {item.time}
              </div>
            </div>
            <MessageSquare size={15} className="text-fg/30 mt-1" />
          </div>
        ))}
      </Card>
    </div>
  );
}