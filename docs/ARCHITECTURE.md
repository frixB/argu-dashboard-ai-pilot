# Architecture — Design-to-Code Pilot, Step 2

Source of truth for this step: Figma frame **Dashboard/Main**
(`https://www.figma.com/design/aGTdvuKB4xBHVxzpZL4io1/Argu-web-app-ui-ux?node-id=1072-17324`),
inspected read-only via the Figma MCP (`get_design_context`, `get_variable_defs`,
`get_metadata`). Nothing in the Figma file was modified.

This step scaffolds the project and establishes tokens + component
**contracts** only. The full Dashboard/Main screen is intentionally not
assembled yet.

## Token structure

Tokens live in `src/tokens/*.ts` as the TypeScript source of truth, with
provenance comments pointing at the specific Figma variable each value came
from. `src/app/globals.css` hand-mirrors the same values as CSS custom
properties, which Tailwind v4's `@theme inline` block then exposes as
utility classes (e.g. `--color-brand-primary` → `bg-brand-primary`,
`text-brand-primary`).

| File | Contents | Figma source |
|---|---|---|
| `colors.ts` | base/brand/accent/text/surface colors, camera status color pairs | `get_variable_defs` on the Dashboard/Main frame |
| `typography.ts` | **two** font families (DM Sans + Plus Jakarta Sans), weights, semantic type scale with a per-token `family` | Inspected text node styles (no shared Figma text styles existed) |
| `spacing.ts` | semantic spacing aliases (card padding, card gap, etc.) | Inspected auto-layout `padding`/`itemSpacing` values; all are multiples of the 4px base unit already covered by Tailwind's default scale |
| `radii.ts` | 3-step radius scale, plus a separate `controlRadius` exception | `Numeric Values/Corner Radius*` variables (scale); header `Button` instances (exception) |
| `shadows.ts` | 2 shadow presets (shell, card) | `Shadow 1` / `card shadow` effect styles |

### Mixed font family — PROVISIONAL

The Figma analysis found **two** font families used side-by-side on
Dashboard/Main, not one:

- **DM Sans** — chrome/interface text: the page header, buttons, search,
  sidebar, camera names, and camera status labels.
- **Plus Jakarta Sans** — stat-card body content and other data text (event
  counts/labels, alert/notification copy, chart labels).

This is expressed as two semantic tokens, `fontFamily.interface` (DM Sans)
and `fontFamily.data` (Plus Jakarta Sans) in `src/tokens/typography.ts`,
both loaded via `next/font/google` in `src/app/layout.tsx` and exposed as
Tailwind utilities `font-sans` (default body font = DM Sans) and
`font-data` (Plus Jakarta Sans) through `globals.css`. Each `typeScale`
entry also carries a `family` field recording which one it was observed
with.

`StatCard` and `ChartCard` apply `font-data` to their body-content wrapper
`div` so any content dropped into `children` inherits Plus Jakarta Sans by
default; `Header`, `Button`, `IconButton`, `Sidebar`, `CameraCard`, and
`CameraStatus` are left on the page's default `font-sans` (DM Sans).

**This split is provisional**, not a confirmed design-system rule — see
"Unresolved decisions" below.

**Why TS + CSS instead of one generated file:** there's no build-time token
pipeline (e.g. Style Dictionary) wired up yet. Duplicating by hand is
acceptable for a two-file, ~20-value token set at this stage, but will not
scale — see Unresolved Decisions.

## Component responsibilities

`src/components/ui/` — generic, design-system-level primitives with no
dashboard-specific knowledge:

- **Button** — labeled call-to-action (`primary` filled / `outline` bordered), optional leading icon.
- **IconButton** — icon-only affordance, requires `aria-label` (no visible label, per Figma's bare-icon pattern used throughout the sidebar and card action rows).

`src/components/dashboard/` — composed from the primitives above, aware of
dashboard content shapes:

- **Sidebar** — fixed-width icon rail (`Side Menu` in Figma): logo, nav item list, logout.
- **Header** — page title + location/date/time chip + search + profile (`Header` in Figma).
- **SectionHeader** — icon + title (+ optional subtitle) + right-aligned action slot. Shared by every card title row in the design (Today's Events, Camera Status, Alerts Updates, Critical Events, Recently Browsed Cameras).
- **StatCard** — generic card chrome (padding/radius/shadow) wrapping a `SectionHeader` + arbitrary body content. Maps to Figma's reused `Card` component; body composition is left to the caller since the three Overview cards each lay out their rows differently.
- **CameraCard** — thumbnail + name + status pill + row of icon actions (`CardCamera` in Figma).
- **CameraStatus** — colored dot + label pill for `online` / `offline` / `standby`.
- **EmptyCameraSlot** — dashed "add camera" placeholder tile (`NewCam` in Figma).
- **ChartCard** — card chrome for a chart region + title + action slot (`graph` cards in Figma). No charting library is wired in yet; `children` is a plain slot.

`src/data/mock-*.ts` holds placeholder data matching the shapes referenced
in the design (events, cameras, alerts, chart series) — no backend, API, or
auth of any kind, per pilot constraints.

`src/app/page.tsx` is a **component smoke test**, not the dashboard screen:
it imports every token-consuming component once so `next build` proves the
whole set compiles and renders together.

## Unresolved decisions (carried forward, not silently chosen)

These need a designer/PM call before the full Dashboard/Main screen is
built — this pilot step intentionally stops short of choosing "final"
answers for them:

1. **Button variant semantics.** Figma shows "Add New Event" and "Create
   New" as two identically-styled solid orange buttons. It's unclear if
   these are meant to be distinct semantic variants (e.g. `primary` vs. a
   `secondary-solid`) that just happen to share a color today, or truly the
   same variant. `Button` currently only exposes `primary` / `outline`.
2. **Button radius is a documented exception, not a 4th scale step.** All
   three header buttons use a hardcoded `5px` corner radius in Figma, which
   does not match any of the three radius variables (`4 / 8 / 12`). Rather
   than forcing it into that scale (rounding to `radii.sm`) or inventing an
   unexplained 4th generic step, it's captured as its own named token,
   `controlRadius` (`--radius-control` / Tailwind's `rounded-control`),
   applied only to `Button`. Whether this is an intentional control-specific
   radius or a one-off inconsistency to fix in Figma is still unresolved —
   `controlRadius` stays a separate, clearly-labeled exception until that's
   confirmed.
3. **Icon assets are not yet downloaded.** `get_design_context` returns
   icons/images as remote `figma.com/api/mcp/asset/...` URLs that **expire
   in ~7 days**. None have been downloaded into `src/assets/` yet since no
   screen consumes them for real — components currently accept an `icon`/
   `leadingIcon` prop typed as `ReactNode` so any icon system can be dropped
   in later without changing contracts.
4. **Charting library.** `ChartCard` wraps a generic `children` slot; no
   decision has been made between a lightweight canvas/SVG chart lib vs. a
   heavier one, since the Figma "Frequent Events" line chart and "Event
   Occurrence" pie chart both use custom vector paths rather than a
   recognizable off-the-shelf chart signature.
5. **Live vs. static header date/time.** The Header's location/date/time
   chip is static text in Figma. Whether it should render a live client
   clock or a server-supplied timestamp is unresolved; `Header` accepts them
   as plain string props either way.
6. **Second `NewCam`-like slot.** The "Recently Browsed Cameras" grid in
   Figma contains a second, hidden instance of the empty-camera-slot
   component. Whether that represents an alternate empty state (e.g.
   "loading") or is simply an unused duplicate is unresolved.
7. **Dark mode.** The scaffold ships only a light theme (`globals.css`
   dropped the default Next.js dark-mode media query) since Dashboard/Main
   has no corresponding dark-mode frame to inspect.
8. **Token duplication (TS ↔ CSS).** See "Why TS + CSS" above — worth
   replacing with a generated single source (Style Dictionary or similar)
   once the token set grows past this pilot.
9. **Mixed font family split (interface vs. data).** The DM Sans /
   Plus Jakarta Sans split described above is inferred from a general
   observation of which regions of the frame use which family, not from a
   confirmed Figma text-style-to-family mapping applied consistently to
   every text node. In particular, camera names and status labels are
   body-sized text kept on the "interface" (DM Sans) side as an explicit
   exception, since they were called out as DM Sans despite sitting inside
   data-like card content — that exception, and the split as a whole, needs
   designer confirmation before it's treated as a permanent rule.
10. **No formatter configured.** `create-next-app`'s default template does
   not include Prettier; formatting for this pilot relies on ESLint's
   `eslint-config-next` rules only. Adding Prettier (and any accompanying
   config/dependency) was left for a follow-up rather than installed
   unprompted.

## Verification performed

- `npx tsc --noEmit` — clean.
- `npm run lint` (ESLint via `eslint-config-next`) — clean.
- `npm run build` (`next build`) — succeeds, `/` prerenders statically.
- Manual browser check of `src/app/page.tsx` via the dev server — renders
  with no console errors; tokens visibly applied (brand color, camera
  status colors, DM Sans / Plus Jakarta Sans typography, control-radius
  buttons).
