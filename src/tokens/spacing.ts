/**
 * Spacing tokens. The Figma frame is built on a 4px base unit, so numeric
 * values map 1:1 onto Tailwind's default spacing scale (which is also 4px
 * based) — no custom Tailwind spacing scale was necessary.
 *
 * This file instead captures *semantic* spacing decisions observed
 * repeatedly across cards/sections, so components reference intent
 * ("card padding") rather than a bare pixel value.
 */

export const spacing = {
  /** Gap between the sidebar/header/content regions of the shell. */
  layoutGutter: "32px",
  /** Padding inside a standard card (stat card, camera card, chart card). */
  cardPadding: "24px",
  /** Padding inside the compact camera card observed in "Recently Browsed". */
  cardPaddingCompact: "12px",
  /** Gap between cards in a row (Overview cards, camera grid, chart grid). */
  cardGap: "24px",
  /** Gap between an icon and its label (e.g. section header icon + title). */
  iconTextGap: "10px",
  /** Vertical rhythm between stacked list rows inside a card. */
  listRowGap: "36px",
} as const;

export type SpacingToken = keyof typeof spacing;
