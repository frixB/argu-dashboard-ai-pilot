"use client";

import type { ReactNode } from "react";
import { CameraStatus } from "./CameraStatus";
import type { CameraStatusValue } from "@/tokens/colors";

export interface CameraCardAction {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export interface CameraCardProps {
  name: string;
  /** `null` renders a placeholder fill — no live camera feed in this pilot. */
  imageSrc: string | null;
  status: CameraStatusValue;
  viewerCount?: number;
  /** Row of icon actions under the thumbnail (view / settings / chat / info / delete in Figma). */
  actions?: CameraCardAction[];
}

/**
 * Maps to Figma's "CardCamera" component used in "Recently Browsed
 * Cameras". Actual snapshot imagery and the viewer-count badge overlay
 * (top-left "3 users" pill in the design) are represented but not wired to
 * a real camera feed, per pilot constraints (no live-camera integrations).
 */
export function CameraCard({ name, imageSrc, status, viewerCount, actions = [] }: CameraCardProps) {
  return (
    <article className="flex w-full flex-col gap-2.5 rounded-md bg-surface-card p-3 shadow-card">
      <p className="py-1 text-lg text-text-primary">{name}</p>
      <div className="relative h-[200px] w-full overflow-hidden rounded-sm bg-accent-3">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- placeholder thumbnail, not yet wired to next/image asset pipeline
          <img src={imageSrc} alt={name} className="size-full object-cover" />
        ) : null}
        {typeof viewerCount === "number" && (
          <span className="absolute left-0 top-0 flex h-[29px] w-[42px] items-center justify-center rounded-br-xl bg-brand-primary text-base-light">
            {viewerCount}
          </span>
        )}
      </div>
      <div className="flex w-full flex-wrap items-center gap-2.5">
        <div className="flex-1">
          <CameraStatus status={status} />
        </div>
        <div className="flex h-[35px] items-center gap-4">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              aria-label={action.label}
              onClick={action.onClick}
              className="size-6 text-text-primary"
            >
              {action.icon}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
