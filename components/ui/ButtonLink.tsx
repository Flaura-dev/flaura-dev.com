import type { ComponentProps } from "react";
import Link from "next/link";
import { cx } from "@/lib/cx";

/** Bouton rose plein (« Réserver un appel ») : le texte prend la couleur du fond. */
export function ButtonLink({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cx(
        "inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-pink px-6 py-[15px] text-[15px] font-semibold text-bg transition-colors hover:bg-pink-hover",
        className,
      )}
      {...props}
    />
  );
}
