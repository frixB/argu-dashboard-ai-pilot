/**
 * Typography tokens inferred from inspected Figma text layers.
 *
 * PROVISIONAL — mixed font family rule (see docs/ARCHITECTURE.md,
 * "Unresolved decisions"): the Dashboard/Main frame uses **two** families:
 *
 * - "DM Sans" — chrome/interface text: the page header, buttons, search,
 *   sidebar, camera names, and camera status labels.
 * - "Plus Jakarta Sans" — stat-card body content and other data text (event
 *   counts/labels, alert/notification copy, chart labels).
 *
 * Both are inspected as ad-hoc text node styles, not a shared Figma text
 * style library, so the exact size/weight scale below is inferred, and the
 * interface/data split is a provisional rule pending designer confirmation
 * — do not treat either as final.
 */

export const fontFamily = {
  /** Chrome/interface text: header, buttons, search, sidebar, camera names & status. */
  interface: "var(--font-dm-sans), 'DM Sans', ui-sans-serif, system-ui, sans-serif",
  /** Stat-card body content and other data text: counts, labels, alert copy, chart labels. */
  data: "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
} as const;

export type FontFamilyToken = keyof typeof fontFamily;

export const fontWeight = {
  regular: 400,
  medium: 500,
  bold: 700,
} as const;

/**
 * Semantic type scale. Sizes/line-heights are drawn directly from inspected
 * nodes (e.g. "Dashboard" header = 32px bold, card titles = 20px, body
 * labels = 16/14px). Naming is semantic rather than numeric so the scale can
 * be re-pointed at confirmed Figma text styles later without renaming call
 * sites.
 *
 * Each token also carries the `family` it was observed with, per the
 * provisional interface/data split above:
 * - "display"/"heading"/"title" map to chrome/interface roles (page title,
 *   card/section title rows) → DM Sans.
 * - "body"/"bodySmall"/"caption"/"micro" map to the data rows *inside* those
 *   cards (counts, labels, alert copy, timestamps, chart labels) → Plus
 *   Jakarta Sans.
 *
 * This is a role-based inference, not a confirmed 1:1 Figma mapping for
 * every instance — e.g. camera names/status labels are an interface-role
 * exception that stays DM Sans despite being body-sized text. Components
 * apply `fontFamily.interface` explicitly for those cases rather than
 * relying on the scale's default.
 */
export const typeScale = {
  display: {
    fontSize: "32px",
    lineHeight: "normal",
    letterSpacing: "-0.32px",
    fontWeight: fontWeight.bold,
    family: "interface",
  },
  heading: {
    fontSize: "20px",
    lineHeight: "normal",
    letterSpacing: "-0.2px",
    fontWeight: fontWeight.medium,
    family: "interface",
  },
  title: {
    fontSize: "18px",
    lineHeight: "normal",
    letterSpacing: "-0.18px",
    fontWeight: fontWeight.regular,
    family: "interface",
  },
  body: {
    fontSize: "16px",
    lineHeight: "normal",
    letterSpacing: "-0.16px",
    fontWeight: fontWeight.medium,
    family: "data",
  },
  bodySmall: {
    fontSize: "14px",
    lineHeight: "normal",
    letterSpacing: "-0.14px",
    fontWeight: fontWeight.medium,
    family: "data",
  },
  caption: {
    fontSize: "13px",
    lineHeight: "normal",
    letterSpacing: "-0.13px",
    fontWeight: fontWeight.regular,
    family: "data",
  },
  micro: {
    fontSize: "12px",
    lineHeight: "normal",
    letterSpacing: "-0.12px",
    fontWeight: fontWeight.regular,
    family: "data",
  },
} as const satisfies Record<
  string,
  {
    fontSize: string;
    lineHeight: string;
    letterSpacing: string;
    fontWeight: number;
    family: FontFamilyToken;
  }
>;

export type TypeScaleToken = keyof typeof typeScale;
