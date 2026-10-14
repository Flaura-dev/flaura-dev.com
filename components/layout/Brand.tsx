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
        loading="eager"
        onAnimationEnd={() => setSpinning(false)}
        className={cx(
          // En clair, un fin liseré rose redonne du relief à la fleur, très pâle sur le crème.
          "block size-[38px] light:[filter:drop-shadow(0_0_0.75px_rgb(194_56_107/0.75))_saturate(1.3)]",
          spinning && "motion-safe:animate-sakura-spin",
        )}
      />
      <span className="whitespace-nowrap">
        <span className="font-display text-[2.125rem] leading-none font-black uppercase">
          Flaura
        </span>
        <span className="font-mono text-[0.9375rem] text-pink">.dev_</span>
      </span>
    </Link>
  );
}
