import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, Pill, Button } from "@/components/ui";

export default function ReportCard({ title, meta, status, onResolve }) {
  return (
    <Card className="p-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-danger/15 flex items-center justify-center shrink-0">
          <AlertTriangle size={16} className="text-danger" />
        </div>
        <div>
          <div className="text-sm font-semibold text-fg">{title}</div>
          <div className="text-xs text-fg/50 mt-0.5">{meta}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Pill status={status} />
        {status !== "Resolved" && (
          <Button variant="primary" size="sm" onClick={onResolve}>
            <CheckCircle2 size={13} /> Resolve
          </Button>
        )}
      </div>
    </Card>
  );
}