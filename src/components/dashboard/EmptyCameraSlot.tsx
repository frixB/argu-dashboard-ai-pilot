"use client";

export interface EmptyCameraSlotProps {
  label?: string;
  onAdd?: () => void;
}

/**
 * Maps to Figma's "NewCam" instance shown in the "Recently Browsed Cameras"
 * grid — a dashed placeholder tile inviting the user to add a camera.
 * Figma also has an unused/hidden variant of this slot in the same grid;
 * whether that represents a second state (e.g. "loading") is unresolved,
 * see docs/ARCHITECTURE.md.
 */
export function EmptyCameraSlot({ label = "Add Camera", onAdd }: EmptyCameraSlotProps) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="flex h-[292px] w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-surface-separator text-text-secondary/60"
    >
      <span className="text-2xl leading-none">+</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}
