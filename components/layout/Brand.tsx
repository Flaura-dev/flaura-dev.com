"use client";

import { useState, type FocusEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import sakura from "@/assets/logos/sakura-accueil.webp";
import { cx } from "@/lib/cx";

/**
 * Fleur + « FLAURA.dev_ ». Au survol (ou au focus clavier), la fleur fait un tour
 * complet, une seule fois, même si le pointeur repart avant la fin.
 */
export function Brand() {
  const [spinning, setSpinning] = useState(false);

  function handleFocus(event: FocusEvent<HTMLAnchorElement>) {
    if (event.currentTarget.matches(":focus-visible")) setSpinning(true);
  }

  return (
    <Link
      href="/#accueil"
      aria-label="Flaura.dev, retour à l'accueil"
      onPointerEnter={() => setSpinning(true)}
      onFocus={handleFocus}
      className="flex min-h-11 shrink-0 items-center gap-3 rounded-lg text-fg"
    >
      <Image
        src={sakura}
        alt=""
        width={38}
        height={38}
        onAnimationEnd={() => setSpinning(false)}
        className={cx("block size-[38px]", spinning && "motion-safe:animate-sakura-spin")}
      />
      <span className="whitespace-nowrap">
        <span className="font-display text-[34px] leading-none font-black uppercase">Flaura</span>
        <span className="font-mono text-[15px] text-pink">.dev_</span>
      </span>
    </Link>
  );
}
