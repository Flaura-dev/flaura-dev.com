import { Container } from "@/components/ui/Container";
import { processSteps } from "@/content/process";
import { cx } from "@/lib/cx";

/*
 * Desktop : les 4 étapes côte à côte sous une ligne, un repère rond par étape.
 * Mobile : la même frise à la verticale, pour que la ligne relie toujours les étapes.
 */
export function Process() {
  return (
    <section aria-labelledby="process-titre" className="pt-[72px]">
      <Container className="flex flex-col gap-7">
        <h2 id="process-titre" className="font-mono text-xs tracking-[2px] text-muted uppercase">
          {"// comment on travaille ensemble"}
        </h2>

        <ol className="grid border-l border-line md:grid-cols-4 md:border-t md:border-l-0">
          {processSteps.map((step, index) => (
            <li
              key={step.num}
              className="relative flex flex-col gap-2.5 pb-10 pl-7 last:pb-0 md:pt-8 md:pr-7 md:pb-0 md:pl-0"
            >
              {index === 0 && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 -left-px h-full w-0.5 bg-pink md:-top-px md:left-0 md:h-0.5 md:w-full"
                />
              )}
              <span
                aria-hidden="true"
                className={cx(
                  "absolute top-1 -left-1.5 size-[11px] rounded-full md:-top-1.5 md:left-0",
                  index === 0 ? "bg-pink" : "border-[1.5px] border-pink bg-bg",
                )}
              />
              <span className="font-mono text-xs text-pink">{step.num}</span>
              <h3 className="font-display text-[32px] leading-none font-black uppercase">
                {step.title}
              </h3>
              <p className="text-[15px] leading-[1.6] text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
