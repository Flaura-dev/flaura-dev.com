"use client";

import { useState, type ReactNode } from "react";
import { ArrowLeftIcon, ArrowRightIcon, ArrowsHorizontalIcon } from "@/components/ui/icons";

type BeforeAfterProps = {
  before: ReactNode;
  after: ReactNode;
  label: string;
};

/**
 * Comparateur avant/après glissable. Un curseur natif invisible couvre la zone :
 * souris, doigt et flèches du clavier fonctionnent, et le défilement vertical au doigt
 * reste possible par-dessus.
 */
export function BeforeAfter({ before, after, label }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative h-full overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0">
        {before}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        {after}
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={label}
        aria-valuetext={`${100 - position} % du nouveau site visible`}
        className="peer absolute inset-0 z-10 m-0 size-full cursor-ew-resize touch-pan-y opacity-0"
      />

      <span className="pointer-events-none absolute bottom-3 left-3.5 rounded-full bg-bg px-2.5 py-1 font-mono text-[11px] text-fg">
        avant
      </span>
      <span className="pointer-events-none absolute right-3.5 bottom-3 rounded-full bg-[#C2457A] px-2.5 py-1 font-mono text-[11px] text-white">
        après
      </span>
      <span className="pointer-events-none absolute top-4 right-3.5 flex items-center gap-1.5 rounded-full bg-bg px-2.5 py-1 font-mono text-[11px] text-fg">
        <ArrowLeftIcon size={11} />
        glisse
        <ArrowRightIcon size={11} />
      </span>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-pink"
        style={{ left: `${position}%` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[55%] flex size-10 -translate-1/2 items-center justify-center rounded-full border-2 border-pink bg-bg text-pink peer-focus-visible:ring-2 peer-focus-visible:ring-pink peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg"
        style={{ left: `${position}%` }}
      >
        <ArrowsHorizontalIcon />
      </div>
    </div>
  );
}
