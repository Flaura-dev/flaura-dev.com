import Link from "next/link";
import { PhoneIcon } from "@/components/ui/icons";
import { cx } from "@/lib/cx";

/** Bandeau rose « Le tien ? », pleine largeur ou, à côté d'une carte projet, en colonne. */
export function CtaBanner({ beside = false }: { beside?: boolean }) {
  return (
    <div
      className={cx(
        "flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-pink px-7 py-8 text-bg md:px-10 md:py-9",
        beside ? "md:flex-col md:flex-nowrap md:items-start" : "md:col-span-full",
      )}
    >
      {/* 72 px max : reste sous les titres de section (110 px). */}
      <p className="font-display text-[clamp(3rem,2rem+3vw,4.5rem)] leading-[0.9] font-black uppercase">
        Le tien&nbsp;?
      </p>
      <Link
        href="/#contact"
        className="inline-flex min-h-12 press items-center gap-3 rounded-full bg-bg px-[22px] py-3.5 font-semibold text-fg hover:opacity-90"
      >
        <PhoneIcon className="text-pink" />
        Réserver un appel
      </Link>
    </div>
  );
}
