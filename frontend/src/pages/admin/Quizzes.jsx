import { PageHeader } from "@/components/layout";
import { Toolbar, Table, Pill } from "@/components/ui";
import { useState } from "react";

const sampleQuizzes = [
  { id: "q1", title: "React Hooks Checkpoint", path: "React Developer Path", length: "10 questions", score: "84%" },
  { id: "q2", title: "ES6 Fundamentals Quiz", path: "JavaScript Fundamentals", length: "12 questions", score: "77%" },
];

export default function Quizzes() {
  const [search, setSearch] = useState("");
  const filtered = sampleQuizzes.filter((q) => q.title.toLowerCase().includes(search.toLowerCase()));

  const rows = filtered.map((q) => [q.title, q.path, q.length, q.score, <Pill status="Published" key={q.id} />]);

  return (
    <div>
      <PageHeader title="Quizzes" subtitle="End-of-module checks tied to each learning path." />
      <Toolbar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search quizzes..." />
      <Table columns={["Title", "Learning path", "Length", "Avg score", "Status"]} rows={rows} emptyMessage="No quizzes found" />
    </div>
  );
}