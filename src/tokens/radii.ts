/**
 * Corner radius tokens from Figma variables (`Numeric Values/Corner Radius*`).
 */
export const radii = {
  /** Figma: "Numeric Values/Corner Radius". Outer shell surfaces (sidebar). */
  lg: "12px",
  /** Figma: "Numeric Values/Corner Radius -Med" (and duplicate "radius 3"). Cards. */
  md: "8px",
  /** Figma: "Numeric Values/Corner Radius -Small". Chips, thumbnails, pills. */
  sm: "4px",
} as const;

export type RadiusToken = keyof typeof radii;

/**
 * Documented exception, NOT part of the 4/8/12 scale above.
 *
 * The header "Button" instances (Add New Event / Create New / Share
 * Dashboard) are hardcoded to a 5px corner radius in Figma, which doesn't
 * match `radii.sm` (4px) or any other step. Rather than silently rounding
 * this into the nearest scale value (or inventing a 4th generic step), it's
 * captured as its own named, control-specific token — see
 * docs/ARCHITECTURE.md, unresolved decision on button radius, for why this
 * is provisional pending designer confirmation.
 */
export const controlRadius = "5px";
