import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type SectionHeadingProps = {
  num: string;
  id?: string;
  /**
   * Titre descriptif de la section (Offres, FAQ) : il devient le h2, à droite du titre
   * géant, qui reste purement décoratif.
   */
  subtitle?: string;
  /**
   * Titre lu par les lecteurs d'écran et les robots quand le titre géant est un clin d'œil
   * (« Hello World. ») : rien ne change à l'écran.
   */
  srTitle?: string;
  className?: string;
  children: ReactNode;
};

const titleClass = "font-display text-section font-black uppercase";

/** Numéro de section en Geist Mono rose + titre géant en Big Shoulders, alignés en bas. */
export function SectionHeading({
  num,
  id,
  subtitle,
  srTitle,
  className,
  children,
}: SectionHeadingProps) {
  const number = (
    <span className="font-mono text-sm text-pink" aria-hidden="true">
      {num}
    </span>
  );

  if (srTitle) {
    return (
      <div className={cx("flex items-baseline gap-[18px]", className)}>
        {number}
        <p aria-hidden="true" className={titleClass}>
          {children}
        </p>
        <h2 id={id} className="sr-only">
          {srTitle}
        </h2>
      </div>
    );
  }

  if (!subtitle) {
    return (
      <div className={cx("flex items-baseline gap-[18px]", className)}>
        {number}
        <h2 id={id} className={titleClass}>
          {children}
        </h2>
      </div>
    );
  }

  // Le h2 passe sous le titre géant dès qu'il ne tient plus sur une ligne à sa droite.
  return (
    <div className={cx("flex flex-wrap items-baseline gap-x-6 gap-y-4", className)}>
      <div aria-hidden="true" className="flex items-baseline gap-[18px] whitespace-nowrap">
        {number}
        <p className={titleClass}>{children}</p>
      </div>
      <h2 id={id} className="text-[1.1875rem] leading-[1.6] text-muted">
        {subtitle}
      </h2>
    </div>
  );
}
