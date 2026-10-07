import Link from "next/link";
import { PhoneIcon } from "@/components/ui/icons";

/** Bandeau rose pleine largeur « Le tien ? ». */
export function CtaBanner() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-pink px-7 py-8 text-bg md:col-span-full md:px-10 md:py-9">
      {/* Plus grand qu'à l'origine pour garder sa présence, mais sous les titres de section (72 px max contre 110). */}
      <p className="font-display text-[clamp(3rem,2rem+3vw,4.5rem)] leading-[0.9] font-black uppercase">
        Le tien&nbsp;?
      </p>
      <Link
        href="/#contact"
        className="inline-flex min-h-12 items-center gap-3 rounded-full bg-bg px-[22px] py-3.5 font-semibold text-fg transition-opacity hover:opacity-90"
      >
        <PhoneIcon className="text-pink" />
        Réserver un appel
      </Link>
    </div>
  );
}
