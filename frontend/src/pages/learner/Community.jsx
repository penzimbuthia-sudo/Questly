import { useState } from "react";
import DiscussionCard from "../../components/learner/DiscussionCard";

const DISCUSSIONS = [
  { id: "d1", author: "Aisha K.", pathTag: "React developer path", title: "What's the best way to approach state management in React?", replies: 23, likes: 128 },
  { id: "d2", author: "Brian O.", pathTag: "JavaScript fundamentals", title: "How do I optimize my JavaScript bundle size?", replies: 31, likes: 94 },
  { id: "d3", author: "Chinedu M.", pathTag: "Data science fundamentals", title: "Best resources for learning pandas from scratch?", replies: 14, likes: 52 },
  { id: "d4", author: "Grace W.", pathTag: "UI/UX design", title: "How do you run a 5-second usability test remotely?", replies: 9, likes: 41 },
];

export default function Community() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Community</h1>
        <p className="mt-1 text-sm text-neutral-500">Discussions, questions, and insights from fellow learners.</p>
      </div>

      <div className="flex flex-col gap-4">
        {DISCUSSIONS.map((discussion) => (
          <DiscussionCard key={discussion.id} discussion={discussion} onOpen={setSelected} />
        ))}
      </div>

      {selected && (
        <div className="rounded-2xl border border-purple-200 bg-purple-50 p-4 text-sm text-purple-800">
          Opening “{selected.title}” — thread view isn&apos;t wired up in this mock yet.
        </div>
      )}
    </div>
  );
}
