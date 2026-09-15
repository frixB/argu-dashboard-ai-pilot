import type { CameraStatusValue } from "@/tokens/colors";

export interface CameraStatusProps {
  status: CameraStatusValue;
  /** Override the default label derived from `status` (e.g. localization). */
  label?: string;
}

const defaultLabels: Record<CameraStatusValue, string> = {
  online: "Online",
  offline: "Offline",
  standby: "Standby",
};

const statusClasses: Record<CameraStatusValue, string> = {
  online: "bg-status-online-bg text-status-online",
  offline: "bg-status-offline-bg text-status-offline",
  standby: "bg-status-standby-bg text-status-standby",
};

/** Maps to Figma's "Camera Status" pill component (dot + label). */
export function CameraStatus({ status, label }: CameraStatusProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-3 text-base font-medium tracking-[-0.16px] ${statusClasses[status]}`}
    >
      <span className="size-2.5 rounded-full bg-current" aria-hidden />
      {label ?? defaultLabels[status]}
    </div>
  );
}
