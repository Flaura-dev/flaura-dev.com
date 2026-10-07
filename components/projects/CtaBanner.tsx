import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

/** Bandeau rose pleine largeur « Le tien ? ». */
export function CtaBanner() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-pink px-7 py-8 text-bg md:col-span-full md:px-10 md:py-9">
      <p className="font-display text-[56px] leading-[0.95] font-black uppercase">Le tien&nbsp;?</p>
      <Link
        href="/#contact"
        className="inline-flex min-h-12 items-center gap-3 rounded-full bg-bg px-[22px] py-3.5 font-semibold text-fg transition-opacity hover:opacity-90"
      >
        Réserver un appel
        <ArrowRightIcon />
      </Link>
    </div>
  );
}
