import type { TopicStatus } from "@/data/types";
import { Badge } from "./badge";

const STATUS_META: Record<TopicStatus, { label: string; tone: "neutral" | "info" | "success" }> = {
  "not-started": { label: "Not started", tone: "neutral" },
  "in-progress": { label: "In progress", tone: "info" },
  revised: { label: "Revised", tone: "success" },
  mastered: { label: "Mastered", tone: "success" },
};

export function StatusBadge({ status }: { status: TopicStatus }) {
  const meta = STATUS_META[status];
  return <Badge tone={meta.tone}>{meta.label}</Badge>;
}