"use client";

import type { ReactNode } from "react";

export interface SidebarItem {
  id: string;
  icon: ReactNode;
  label: string;
  href: string;
}

export interface SidebarProps {
  items: SidebarItem[];
  activeItemId?: string;
  logo?: ReactNode;
  onLogout?: () => void;
}

/**
 * Maps to Figma's "Side Menu" component: a fixed-width vertical rail with a
 * logo, a scrollable icon-only nav list, and a logout icon pinned to the
 * bottom. Real icon assets (currently exported as remote Figma URLs that
 * expire after 7 days) still need to be downloaded and committed — see
 * docs/ARCHITECTURE.md.
 */
export function Sidebar({ items, activeItemId, logo, onLogout }: SidebarProps) {
  return (
    <nav className="flex h-full w-[86px] flex-col items-center gap-12 rounded-lg bg-surface-card px-4 py-4 shadow-shell">
      {logo ?? <div className="size-10 rounded-sm bg-surface-separator" aria-hidden />}
      <ul className="flex flex-1 flex-col items-center gap-9">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              aria-current={item.id === activeItemId ? "page" : undefined}
              className={[
                "block size-8 rounded-sm p-1",
                item.id === activeItemId ? "text-brand-primary" : "text-text-primary",
              ].join(" ")}
              title={item.label}
            >
              {item.icon}
            </a>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onLogout}
        aria-label="Log out"
        className="size-8 text-text-primary"
      >
        ⏻
      </button>
    </nav>
  );
}
