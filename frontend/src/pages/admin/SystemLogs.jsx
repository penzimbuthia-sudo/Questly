import { PageHeader } from "@/components/layout";
import { Table } from "@/components/ui";

const sampleLogs = [
  { time: "12:41:03", level: "INFO", message: "Nightly backup completed successfully", source: "backup-worker" },
  { time: "11:58:20", level: "WARN", message: "Storage usage crossed 85% threshold", source: "storage-monitor" },
  { time: "09:37:45", level: "ERROR", message: "Quiz auto-grader retried 3 times before success", source: "quiz-svc" },
];

const LEVEL_COLOR = {
  INFO: "text-royal",
  WARN: "text-butter",
  ERROR: "text-danger",
};

export default function SystemLogs() {
  const rows = sampleLogs.map((log) => [
    log.time,
    <span className={`text-xs font-bold ${LEVEL_COLOR[log.level]}`} key={log.time}>
      {log.level}
    </span>,
    log.message,
    log.source,
  ]);

  return (
    <div>
      <PageHeader title="System logs" subtitle="Recent platform events and background jobs." />
      <Table columns={["Time", "Level", "Message", "Source"]} rows={rows} />
    </div>
  );
}