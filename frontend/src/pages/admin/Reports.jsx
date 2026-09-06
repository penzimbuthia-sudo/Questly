import { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout";
import { ReportCard } from "@/components/admin";
import { getReports, resolveReport } from "@/services/reportService";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReports()
      .then(setReports)
      .finally(() => setLoading(false));
  }, []);

  async function handleResolve(reportId) {
    const updated = await resolveReport(reportId);
    setReports((current) => current.map((r) => (r.id === updated.id ? updated : r)));
  }

  return (
    <div>
      <PageHeader title="Reports" subtitle="Flagged content and conduct waiting on a decision." />

      {loading && <p className="text-sm text-fg/50">Loading reports...</p>}

      <div className="flex flex-col gap-2">
        {reports.map((r) => (
          <ReportCard
            key={r.id}
            title={r.title}
            meta={r.meta}
            status={r.status}
            onResolve={() => handleResolve(r.id)}
          />
        ))}
      </div>
    </div>
  );
}