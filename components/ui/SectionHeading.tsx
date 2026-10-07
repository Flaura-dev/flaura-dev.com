import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type SectionHeadingProps = {
  num: string;
  id?: string;
  className?: string;
  children: ReactNode;
};

/** Numéro de section en Geist Mono rose + titre géant en Big Shoulders, alignés en bas. */
export function SectionHeading({ num, id, className, children }: SectionHeadingProps) {
  return (
    <div className={cx("flex items-baseline gap-[18px]", className)}>
      <span className="font-mono text-sm text-pink" aria-hidden="true">
        {num}
      </span>
      <h2 id={id} className="font-display text-section font-black uppercase">
        {children}
      </h2>
    </div>
  );
}
