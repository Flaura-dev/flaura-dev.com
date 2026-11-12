import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("mx-auto w-full max-w-7xl px-5 md:px-10", className)} {...props} />;
}
