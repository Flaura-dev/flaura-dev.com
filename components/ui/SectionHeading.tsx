import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type SectionHeadingProps = {
  num: string;
  id?: string;
  subtitle?: string; // devient le h2, le grand titre reste décoratif
  srTitle?: string; // h2 caché quand le grand titre est un clin d'oeil
  className?: string;
  children: ReactNode;
};

const titleClass = "font-display text-section font-black uppercase";

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
