"use client";

import type { ReactNode } from "react";

export interface HeaderUser {
  name: string;
  avatarSrc?: string;
}

export interface HeaderProps {
  title: string;
  location?: string;
  date?: string;
  time?: string;
  onSearch?: (query: string) => void;
  user?: HeaderUser;
  /** Slot for right-aligned extras (message icon, notification bell, etc). */
  actions?: ReactNode;
}

/**
 * Maps to Figma's "Header": page title on the left, a location/date/time
 * chip + search field + profile control on the right. Date/time are
 * inspected as static text in the design — whether they should be live
 * (client clock) or server-supplied is unresolved, see
 * docs/ARCHITECTURE.md.
 */
export function Header({ title, location, date, time, onSearch, user, actions }: HeaderProps) {
  return (
    <header className="flex items-center justify-between rounded-2xl bg-white/20 px-3 py-2">
      <h1 className="text-[32px] font-bold tracking-[-0.32px] text-text-primary">{title}</h1>
      <div className="flex items-center gap-3.5">
        <div className="flex items-center gap-6 rounded-[9px] bg-accent-3 px-5 py-2.5">
          {location && <span className="text-base text-text-primary">{location}</span>}
          {date && <span className="text-base text-text-primary">{date}</span>}
          {time && <span className="text-base text-text-primary">{time}</span>}
        </div>
        <input
          type="search"
          placeholder="Search Here"
          onChange={(event) => onSearch?.(event.target.value)}
          className="w-[292px] rounded-[7px] bg-white px-3 py-2.5 text-sm text-text-primary placeholder:text-text-primary/30"
        />
        {actions}
        {user && (
          <button type="button" className="flex items-center gap-2.5">
            {user.avatarSrc ? (
              // eslint-disable-next-line @next/next/no-img-element -- placeholder avatar, not yet wired to next/image asset pipeline
              <img
                src={user.avatarSrc}
                alt={user.name}
                className="size-[43px] rounded-full object-cover"
              />
            ) : (
              <span className="flex size-[43px] items-center justify-center rounded-full bg-surface-separator text-xs">
                {user.name.slice(0, 1)}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
