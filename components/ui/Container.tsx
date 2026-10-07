import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

/** Colonne de contenu : 1280 px max, marges de 20 px sur mobile et 40 px au-delà. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("mx-auto w-full max-w-7xl px-5 md:px-10", className)} {...props} />;
}
