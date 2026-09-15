import type { ReactNode } from "react";
import { SectionHeader, type SectionHeaderProps } from "./SectionHeader";

export interface StatCardProps {
  header: SectionHeaderProps;
  /** Card body — a list of stat rows, status rows, or alert rows depending on which card this is. */
  children: ReactNode;
}

/**
 * Maps to Figma's generic "Card" component reused for the three Overview
 * tiles (Today's Events / Camera Status / Alerts Updates) and the Critical
 * Events card. Content composition differs enough per instance (icon+count
 * rows vs. status summary rows vs. notification rows) that this component
 * only owns the shared chrome — layout of `children` is left to callers.
 */
export function StatCard({ header, children }: StatCardProps) {
  return (
    <section className="flex w-full flex-col gap-6 rounded-md bg-surface-card p-6 shadow-card">
      <SectionHeader {...header} />
      {/* Stat-card body content — Plus Jakarta Sans, provisional split (docs/ARCHITECTURE.md). */}
      <div className="font-data">{children}</div>
    </section>
  );
}
