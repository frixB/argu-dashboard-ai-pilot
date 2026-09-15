import type { ReactNode } from "react";

export interface SectionHeaderProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  /** Right-aligned slot: a count badge, "View All" link, or action buttons. */
  actions?: ReactNode;
}

/**
 * Generic card/section title row reused across "Today's Events",
 * "Camera Status", "Alerts Updates", "Critical Events Detections", and the
 * "Recently Browsed Cameras" section — each pairs an icon + title (+
 * optional "Last Updated" subtitle) with a right-aligned action.
 */
export function SectionHeader({ icon, title, subtitle, actions }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-lg font-medium text-text-primary">{title}</h2>
        </div>
        {subtitle && <p className="mt-1 text-xs text-text-secondary/70">{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}
