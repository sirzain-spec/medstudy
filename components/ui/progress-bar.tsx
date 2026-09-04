type ProgressBarProps = {
  value: number;
  className?: string;
};

export function ProgressBar({ value, className }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(value, 100));
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={
        "h-2 w-full overflow-hidden rounded-full bg-zinc-200" +
        ` ${className ?? ""}`
      }
    >
      <div
        className="h-full rounded-full bg-emerald-500 transition-[width]"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}