"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Visual treatments observed on Dashboard/Main:
 * - "primary": solid brand-orange fill, white label (e.g. "Add New Event", "Create New")
 * - "outline": transparent fill, secondary-dark border + label (e.g. "Share Dashboard")
 *
 * Figma shows "Add New Event" and "Create New" as two visually-identical
 * solid buttons with no distinguishing token — whether that's meant to be
 * two semantic variants (e.g. primary vs. secondary-solid) or just the same
 * variant reused is unresolved; see docs/ARCHITECTURE.md.
 */
export type ButtonVariant = "primary" | "outline";
export type ButtonSize = "sm" | "md";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon rendered before the label, e.g. an "add" glyph. */
  leadingIcon?: ReactNode;
}

/**
 * Placeholder implementation — enough to compile and preview variants.
 * Not final: padding/height, focus states, and disabled treatment all need
 * confirmation against the design system before this is production-ready.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  leadingIcon,
  className,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-1 rounded-control font-medium text-[14px] tracking-[-0.14px] cursor-pointer transition-colors";
  const sizes: Record<ButtonSize, string> = {
    sm: "px-2 py-1",
    md: "px-2 py-1.5",
  };
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-brand-primary text-base-light hover:opacity-90",
    outline:
      "border border-brand-secondary-button text-brand-secondary-button hover:bg-black/5",
  };

  return (
    <button
      className={[base, sizes[size], variants[variant], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {leadingIcon}
      {children}
    </button>
  );
}
