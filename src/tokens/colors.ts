/**
 * Color tokens extracted from Figma file "Argu web app ui/ux"
 * (node 1072:17324, "Dashboard/Main") via `get_variable_defs`.
 *
 * These are the raw Figma variable values. `globals.css` mirrors this file
 * as CSS custom properties so both Tailwind utilities and plain CSS can
 * consume the same values — see docs/ARCHITECTURE.md for why the two are
 * kept in sync by hand instead of generated from one source.
 */

export const baseColors = {
  light: "#ffffff",
  dark: "#0f0600",
} as const;

export const brandColors = {
  primary: "#fe6700",
  secondaryButton: "#383838",
} as const;

export const accentColors = {
  accent2: "#ffaa00",
  /** Figma variable is a translucent peach used as a chip/pill background. */
  accent3: "rgba(255, 221, 204, 0.29)",
  accent4: "#ff7d66",
} as const;

export const textColors = {
  primary: baseColors.dark,
  secondary: "#2c3041",
} as const;

export const surfaceColors = {
  page: "#f3f5fc",
  card: baseColors.light,
  separator: "#e8e8e8",
} as const;

/**
 * Camera / device status colors. Each status has a "dark" (text/icon) tone
 * and a soft background tone used together as a status pill.
 */
export const cameraStatusColors = {
  online: {
    text: "#349612",
    background: "#e6fbdf",
  },
  offline: {
    text: "#e04338",
    background: "#fbeceb",
  },
  standby: {
    text: "#f68218",
    background: "#fef4eb",
  },
} as const;

export const colors = {
  base: baseColors,
  brand: brandColors,
  accent: accentColors,
  text: textColors,
  surface: surfaceColors,
  cameraStatus: cameraStatusColors,
} as const;

export type CameraStatusValue = keyof typeof cameraStatusColors;
