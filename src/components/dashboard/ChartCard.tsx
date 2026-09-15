import type { ReactNode } from "react";

export interface ChartCardProps {
  title: string;
  /** Right-aligned slot: a filter dropdown ("This Month") or a dismiss icon, per Figma. */
  actions?: ReactNode;
  /** The chart itself — deliberately untyped here; charting library is not yet chosen. */
  children: ReactNode;
}

/**
 * Maps to Figma's "graph" card (used for both the "Frequent Events" line
 * chart and the "Event Occurrence" pie chart) and the "Critical Events
 * Detections" card shell. No charting library has been selected yet — see
 * docs/ARCHITECTURE.md — so `children` is a plain slot for now.
 */
export function ChartCard({ title, actions, children }: ChartCardProps) {
  return (
    <section className="flex w-full flex-col gap-6 rounded-md bg-surface-card p-6 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-text-primary">{title}</h2>
        {actions}
      </div>
      {/* Chart data content — Plus Jakarta Sans, provisional split (docs/ARCHITECTURE.md). */}
      <div className="font-data">{children}</div>
    </section>
  );
}
