/**
 * Shadow tokens from Figma effect styles ("Shadow 1", "card shadow").
 */
export const shadows = {
  /** Figma: "Shadow 1". Used on the sidebar shell. */
  shell: "0px 4px 12px 0px rgba(15, 6, 0, 0.04)",
  /** Figma: "card shadow". Used on stat/camera/chart cards. */
  card: "0px 4px 13px 0px rgba(15, 6, 0, 0.02)",
} as const;

export type ShadowToken = keyof typeof shadows;
