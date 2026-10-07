"use client";

import { useEffect, useRef, useState } from "react";
import { sections } from "@/content/site";
import { cx } from "@/lib/cx";
import { useActiveSection } from "@/lib/use-active-section";

/**
 * Fil conducteur à droite de la page d'accueil (masqué sur mobile) : une ligne qui se
 * remplit en rose au scroll avec un point lumineux au bout, un repère par section qui
 * s'allume, et une étiquette verticale avec la section en cours. Purement décoratif.
 */
export function TracingBeam() {
  const railRef = useRef<HTMLElement>(null);
  const active = useActiveSection();
  const [nodes, setNodes] = useState<Array<number | null>>([]);

  const activeIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === active),
  );
  const current = sections[activeIndex];

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    // Position de chaque section le long du rail, recalculée quand la page change de hauteur.
    const measure = () => {
      const top = rail.getBoundingClientRect().top;
      setNodes(
        sections.map((section) => {
          const el = document.getElementById(section.id);
          return el ? Math.round(el.getBoundingClientRect().top - top) : null;
        }),
      );
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(rail);

    // Sans animations pilotées par le scroll (Firefox), on calcule la progression ici.
    if (CSS.supports("animation-timeline", "view()")) {
      return () => resizeObserver.disconnect();
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = rail.getBoundingClientRect();
      const progress = (window.innerHeight * 0.4 - rect.top) / (rect.height || 1);
      rail.style.setProperty("--beam-p", String(Math.min(1, Math.max(0, progress))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <aside
      ref={railRef}
      aria-hidden="true"
      className="beam pointer-events-none absolute inset-y-0 right-[-88px] hidden w-[88px] md:block"
    >
      <div className="absolute inset-y-0 left-[43px] w-0.5 rounded-full bg-line" />
      <div className="beam-fill absolute inset-y-0 left-[43px] w-0.5 rounded-full" />

      {nodes.map((top, index) =>
        top === null ? null : (
          <span
            key={sections[index].id}
            style={{ top: top - 5 }}
            className={cx(
              "absolute left-[39px] size-2.5 rounded-full border-2 transition-colors duration-300 motion-reduce:transition-none",
              index <= activeIndex ? "border-pink bg-pink" : "border-faint bg-bg",
            )}
          />
        ),
      )}

      <div className="beam-head absolute inset-0">
        <span className="absolute bottom-0 left-9 size-4 translate-y-1/2 rounded-full bg-pink shadow-[0_0_0_4px_var(--bg),0_0_20px_var(--pink)]" />
      </div>

      <div className="sticky top-[45vh] flex justify-center pt-[120px]">
        <span className="rotate-180 rounded-full border border-line bg-bg px-[7px] py-3.5 font-mono text-xs tracking-[3px] whitespace-nowrap text-pink uppercase [writing-mode:vertical-rl]">
          {current.num} — {current.label}
        </span>
      </div>
    </aside>
  );
}
