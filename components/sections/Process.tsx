"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";
import { processSteps } from "@/content/process";
import { cx } from "@/lib/cx";

/** Durée d'affichage de chaque étape en lecture automatique. */
const STEP_DURATION = "5s";

/*
 * Frise interactive. Tant qu'on n'y touche pas, elle avance toute seule (la ligne se
 * remplit pendant 5 s, puis on passe à l'étape suivante). Elle se met en pause au
 * survol des étapes, quand la section sort de l'écran, avec le bouton pause, et
 * s'arrête dès qu'on clique sur une étape (le bouton « lecture » la relance). Sans lecture automatique si l'animation est réduite.
 * L'avance est pilotée par la fin de l'animation CSS : mettre l'animation en pause
 * suffit à mettre la frise en pause.
 */
export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function select(index: number) {
    setPlaying(false);
    setActive(index);
  }

  const lineStyle = {
    "--from": active / processSteps.length,
    "--to": (active + 1) / processSteps.length,
    "--step-duration": STEP_DURATION,
  } as CSSProperties;

  return (
    <section ref={sectionRef} aria-labelledby="process-titre" className="pt-[72px]">
      <Container className="flex flex-col gap-7">
        <div className="flex items-center justify-between gap-4">
          <h2 id="process-titre" className="font-mono text-xs tracking-[2px] text-muted uppercase">
            {"// comment on travaille ensemble"}
          </h2>
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line px-4 font-mono text-[11px] tracking-[1.5px] text-muted uppercase transition-colors hover:border-pink hover:text-pink motion-reduce:hidden"
          >
            {playing ? <PauseIcon size={12} /> : <PlayIcon size={12} />}
            {playing ? "pause" : "lecture"}
            <span className="sr-only"> du défilement automatique des étapes</span>
          </button>
        </div>

        <div
          style={lineStyle}
          data-autoplay={playing}
          data-running={playing && inView}
          className="process-track relative"
        >
          {/* Ligne de progression : verticale sur mobile, horizontale sur desktop. */}
          <span
            key={playing ? `auto-${active}` : "manual"}
            aria-hidden="true"
            onAnimationEnd={() => setActive((index) => (index + 1) % processSteps.length)}
            className="process-line absolute top-0 -left-px h-full w-0.5 bg-pink md:-top-px md:left-0 md:h-0.5 md:w-full"
          />
          <ol className="grid border-l border-line md:grid-cols-4 md:border-t md:border-l-0">
            {processSteps.map((step, index) => {
              const current = index === active;
              const reached = index <= active;
              return (
                <li
                  key={step.num}
                  className="group relative flex flex-col gap-2.5 rounded-lg pb-10 pl-7 outline-offset-4 last:pb-0 has-focus-visible:outline-2 has-focus-visible:outline-pink md:pt-8 md:pr-7 md:pb-0 md:pl-0"
                >
                  <span
                    aria-hidden="true"
                    className={cx(
                      "absolute top-1 -left-1.5 size-[11px] rounded-full motion-safe:transition-all motion-safe:duration-300 md:-top-1.5 md:left-0",
                      reached ? "bg-pink" : "border-[1.5px] border-pink bg-bg",
                      current && "shadow-[0_0_0_4px_var(--bg),0_0_14px_var(--pink)]",
                    )}
                  />
                  <span
                    className={cx(
                      "font-mono text-xs motion-safe:transition-colors",
                      current ? "text-pink" : "text-dim",
                    )}
                  >
                    {step.num}
                  </span>
                  <h3 className="font-display text-[32px] leading-none font-black uppercase">
                    {/* Le bouton couvre toute l'étape (pseudo-élément) : clic n'importe où. */}
                    <button
                      type="button"
                      onClick={() => select(index)}
                      aria-current={current ? "step" : undefined}
                      className={cx(
                        "cursor-pointer text-left uppercase after:absolute after:inset-0 focus-visible:outline-none motion-safe:transition-colors",
                        current ? "text-fg" : "text-dim group-hover:text-muted",
                      )}
                    >
                      {step.title}
                    </button>
                  </h3>
                  <p
                    className={cx(
                      "text-[15px] leading-[1.6] motion-safe:transition-colors",
                      current ? "text-muted" : "text-dim",
                    )}
                  >
                    {step.text}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
