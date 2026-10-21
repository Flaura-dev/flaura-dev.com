import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type SectionHeadingProps = {
  num: string;
  id?: string;
  /** p : titre géant purement visuel, quand le h2 de la section est un autre texte (FAQ). */
  as?: "h2" | "p";
  className?: string;
  children: ReactNode;
};

/** Numéro de section en Geist Mono rose + titre géant en Big Shoulders, alignés en bas. */
export function SectionHeading({
  num,
  id,
  as: Tag = "h2",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cx("flex items-baseline gap-[18px]", className)}>
      <span className="font-mono text-sm text-pink" aria-hidden="true">
        {num}
      </span>
      <Tag id={id} className="font-display text-section font-black uppercase">
        {children}
      </Tag>
    </div>
  );
}
