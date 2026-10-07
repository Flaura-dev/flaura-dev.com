import type { ReactNode } from "react";
import { TracingBeam } from "@/components/layout/TracingBeam";
import { Hero } from "@/components/sections/Hero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Emplacements provisoires : chaque section sera remplacée à son étape.
function Placeholder({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center rounded-3xl border border-dashed border-line p-8 text-center font-mono text-sm text-muted">
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative">
      <main id="contenu">
        <Hero />

        <section aria-labelledby="process-titre" className="pt-[72px]">
          <Container>
            <h2
              id="process-titre"
              className="font-mono text-xs tracking-[2px] text-muted uppercase"
            >
              {"// comment on travaille ensemble"}
            </h2>
            <Placeholder>{"// 4 étapes"}</Placeholder>
          </Container>
        </section>

        <section id="apropos" aria-labelledby="apropos-titre" className="pt-[120px] pb-24">
          <Container className="flex flex-col gap-8">
            <SectionHeading num="01" id="apropos-titre">
              Hello World<span className="text-pink">.</span>
            </SectionHeading>
            <Placeholder>{"// bento"}</Placeholder>
          </Container>
        </section>

        <section id="projets" aria-labelledby="projets-titre" className="py-24">
          <Container className="flex flex-col gap-8">
            <SectionHeading num="02" id="projets-titre">
              Projets
            </SectionHeading>
            <Placeholder>{"// projets"}</Placeholder>
          </Container>
        </section>

        <section id="offres" aria-labelledby="offres-titre" className="py-24">
          <Container className="flex flex-col gap-8">
            <SectionHeading num="03" id="offres-titre">
              Offres
            </SectionHeading>
            <Placeholder>{"// offres"}</Placeholder>
          </Container>
        </section>

        <section id="faq" aria-labelledby="faq-titre" className="py-24">
          <Container className="flex flex-col gap-8">
            <SectionHeading num="04" id="faq-titre">
              FAQ
            </SectionHeading>
            <Placeholder>{"// faq"}</Placeholder>
          </Container>
        </section>

        <section id="contact" aria-labelledby="contact-titre" className="py-24">
          <Container className="flex flex-col gap-9">
            <SectionHeading num="05" id="contact-titre">
              <span className="whitespace-nowrap text-pink">
                Parlons<span className="text-fg">‑en.</span>
              </span>
            </SectionHeading>
            <Placeholder>{"// réservation + formulaire"}</Placeholder>
          </Container>
        </section>
      </main>
      <TracingBeam />
    </div>
  );
}
