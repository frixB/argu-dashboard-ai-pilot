"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export type IconButtonVariant = "ghost" | "filled";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: ReactNode;
  /** Required for accessibility since the button has no visible label. */
  "aria-label": string;
  variant?: IconButtonVariant;
}

/**
 * Covers the many bare 24px icon affordances seen throughout the frame
 * (sidebar nav icons, camera card row actions: eye / settings / chat / info /
 * delete, header message icon, etc). Placeholder implementation only.
 */
export function IconButton({
  icon,
  variant = "ghost",
  className,
  ...rest
}: IconButtonProps) {
  const base =
    "inline-flex items-center justify-center size-6 rounded-sm cursor-pointer transition-colors";
  const variants: Record<IconButtonVariant, string> = {
    ghost: "text-text-primary hover:bg-black/5",
    filled: "bg-brand-primary text-base-light hover:opacity-90",
  };

  return (
    <button
      className={[base, variants[variant], className].filter(Boolean).join(" ")}
      {...rest}
    >
      {icon}
    </button>
  );
}
