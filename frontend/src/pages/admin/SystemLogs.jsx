import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout";
import { Table } from "@/components/ui";
import { getSystemLogs } from "@/services/adminService";

const LEVEL_COLOR = {
  INFO: "text-royal",
  WARN: "text-butter",
  ERROR: "text-danger",
};

export default function SystemLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSystemLogs().then((response) => setLogs(response.data ?? response)).finally(() => setLoading(false));
  }, []);

  const rows = logs.map((log) => [
    log.created_at ? new Date(log.created_at).toLocaleTimeString() : "—",
    <span className={`text-xs font-bold ${LEVEL_COLOR[log.level]}`} key={log.time}>
      {log.level}
    </span>,
    log.message,
    log.source,
  ]);

  return (
    <div>
      <PageHeader title="System logs" subtitle="Recent platform events and background jobs." />
      {loading ? (
        <p className="text-sm text-fg/50">Loading system logs...</p>
      ) : (
        <Table columns={["Time", "Level", "Message", "Source"]} rows={rows} emptyMessage="No system logs found" />
      )}
    </div>
  );
}