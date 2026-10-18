import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type BrowserFrameProps = {
  children: ReactNode;
  /**
   * Capture manipulable : la fenêtre se soulève au survol. Lien vers le site : elle
   * s'enfonce aussi à l'appui. Comparateur : elle ne bouge pas pendant qu'on glisse
   * (c'est la poignée qui réagit). Sans interaction, elle reste immobile pour ne pas
   * promettre un clic qui n'existe pas.
   */
  interactive?: "link" | "drag";
};

/**
 * Mise en scène commune des captures de projets : une fenêtre de navigateur stylisée,
 * posée sur un fond teinté de rose avec un halo. Quel que soit le style du site
 * présenté, toutes les cartes gardent la même allure.
 *
 * overflow-clip et non overflow-hidden, ici comme dans ProjectCard : un cadre en
 * hidden compte comme une zone défilable, et la capture qui défile au rythme de la
 * page sur mobile (ScrollingShot) suivrait ce cadre immobile au lieu de la page.
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
