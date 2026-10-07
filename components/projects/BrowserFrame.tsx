import type { ReactNode } from "react";

/**
 * Mise en scène commune des captures de projets : une fenêtre de navigateur stylisée,
 * posée sur un fond teinté de rose avec un halo, qui se soulève au survol de la carte.
 * Quel que soit le style du site présenté, toutes les cartes gardent la même allure.
 */
export function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative size-full overflow-hidden bg-[color-mix(in_oklab,var(--pink)_7%,var(--bg))]">
      <div
        aria-hidden="true"
        className="absolute -bottom-1/2 left-1/2 h-full w-4/5 -translate-x-1/2 rounded-full bg-pink opacity-25 blur-3xl"
      />
      <div className="absolute inset-x-5 top-5 bottom-0 flex flex-col overflow-hidden rounded-t-xl border border-b-0 border-line bg-surface shadow-[0_20px_50px_-20px_rgb(0_0_0/0.6)] motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1">
        <div
          aria-hidden="true"
          className="flex h-6 shrink-0 items-center gap-1.5 border-b border-line px-3"
        >
          <span className="size-1.5 rounded-full bg-pink" />
          <span className="size-1.5 rounded-full bg-faint" />
          <span className="size-1.5 rounded-full bg-faint" />
        </div>
        <div className="relative flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
