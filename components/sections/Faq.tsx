import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq } from "@/content/faq";
import { cx } from "@/lib/cx";

/*
 * Accordéon en <details> natifs : fonctionne au clavier et sans JavaScript.
 * La première question occupe toute la largeur et s'ouvre par défaut (maquette) ;
 * les autres sont sur deux colonnes, alignées en haut pour qu'une question ouverte
 * n'étire pas sa voisine.
 */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-titre" className="py-24">
      <Container className="flex flex-col gap-8">
        <SectionHeading num="04" id="faq-titre">
          FAQ
        </SectionHeading>

        <div className="grid items-start gap-4 md:grid-cols-2">
          {faq.map((item, index) => (
            <details
              key={item.question}
              open={index === 0}
              className={cx(
                "group rounded-[20px] border border-line bg-surface px-7 py-[26px] open:border-pink",
                index === 0 && "md:col-span-2",
              )}
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[19px] font-semibold [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden="true" className="shrink-0 font-mono text-pink">
                  <span className="group-open:hidden">[+]</span>
                  <span className="hidden group-open:inline">[−]</span>
                </span>
              </summary>
              <p className="mt-3 leading-[1.65] text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
