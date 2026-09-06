import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout";
import { Toolbar, Table, Pill } from "@/components/ui";
import { getAllQuizzes } from "@/services/adminService";

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllQuizzes().then(setQuizzes).finally(() => setLoading(false));
  }, []);

  const filtered = quizzes.filter((q) => q.title.toLowerCase().includes(search.toLowerCase()));
  const rows = filtered.map((q) => [q.title, q.path, q.length, q.score, <Pill status="Published" key={q.id} />]);

  return (
    <div>
      <PageHeader title="Quizzes" subtitle="End-of-module checks tied to each learning path." />
      <Toolbar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search quizzes..." />
      {!loading && quizzes.length === 0 ? (
        <p className="text-sm text-fg/50">No quizzes have been created yet.</p>
      ) : (
        <Table columns={["Title", "Learning path", "Length", "Avg score", "Status"]} rows={rows} emptyMessage="No quizzes found" />
      )}
    </div>
  );
}