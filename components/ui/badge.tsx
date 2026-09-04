import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "neutral" | "info" | "success";
  className?: string;
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
    neutral: "bg-zinc-100 text-zinc-700",
    info: "bg-sky-100 text-sky-800",
    success: "bg-emerald-100 text-emerald-800",
  };

  return (
    <span
      className={
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium " +
        tones[tone] +
        ` ${className ?? ""}`
      }
    >
      {children}
    </span>
  );
}