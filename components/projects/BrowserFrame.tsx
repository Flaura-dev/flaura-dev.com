import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type BrowserFrameProps = {
  children: ReactNode;
  /** link : se soulève au survol et s'enfonce à l'appui. drag : immobile (la poignée réagit). */
  interactive?: "link" | "drag";
};

/**
 * Fenêtre de navigateur stylisée sur fond rose, commune à toutes les captures.
 * overflow-clip (pas hidden) : sinon ScrollingShot suivrait ce cadre au lieu de la page.
 */
export function BrowserFrame({ children, interactive }: BrowserFrameProps) {
  return (
    <div className="group/frame relative size-full overflow-clip bg-[color-mix(in_oklab,var(--pink)_7%,var(--bg))]">
      <div
        aria-hidden="true"
        className="absolute -bottom-1/2 left-1/2 h-full w-4/5 -translate-x-1/2 rounded-full bg-pink opacity-25 blur-3xl"
      />
      <div
        className={cx(
          "absolute inset-x-5 top-5 bottom-0 flex flex-col overflow-clip rounded-t-xl border border-b-0 border-line bg-surface shadow-[0_20px_50px_-20px_var(--shadow)]",
          interactive &&
            "motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/frame:-translate-y-1",
          interactive === "link" &&
            "motion-safe:group-active/frame:translate-y-0 motion-safe:group-active/frame:duration-75",
        )}
      >
        <div
          aria-hidden="true"
          className="flex h-6 shrink-0 items-center gap-1.5 border-b border-line px-3"
        >
          <span className="size-1.5 rounded-full bg-pink" />
          <span className="size-1.5 rounded-full bg-faint" />
          <span className="size-1.5 rounded-full bg-faint" />
        </div>
        <div className="relative flex-1 overflow-clip">{children}</div>
      </div>
    </div>
  );
}
