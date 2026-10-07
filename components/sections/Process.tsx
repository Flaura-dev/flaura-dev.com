"use client";

import { useState, type CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { processSteps } from "@/content/process";
import { cx } from "@/lib/cx";

/*
 * Frise interactive : on clique sur une étape pour la mettre en avant, les autres
 * passent en retrait (toujours lisibles), et la ligne se remplit jusqu'à l'étape choisie.
 * Desktop : étapes côte à côte. Mobile : la même frise à la verticale.
 */
export function Process() {
  const [active, setActive] = useState(0);
  const progress = (active + 1) / processSteps.length;

  return (
    <section aria-labelledby="process-titre" className="pt-[72px]">
      <Container className="flex flex-col gap-7">
        <h2 id="process-titre" className="font-mono text-xs tracking-[2px] text-muted uppercase">
          {"// comment on travaille ensemble"}
        </h2>

        <div style={{ "--progress": progress } as CSSProperties} className="relative">
          {/* Ligne de progression : verticale sur mobile, horizontale sur desktop. */}
          <span
            aria-hidden="true"
            className="absolute top-0 -left-px h-full w-0.5 origin-top [transform:scaleY(var(--progress))] bg-pink motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out md:-top-px md:left-0 md:h-0.5 md:w-full md:origin-left md:[transform:scaleX(var(--progress))]"
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
                      onClick={() => setActive(index)}
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
