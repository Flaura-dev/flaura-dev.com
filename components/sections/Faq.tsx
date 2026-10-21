import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { ArrowUpRightIcon, CoffeeIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq } from "@/content/faq";
import { site } from "@/content/site";

/*
 * FAQ : contenu visible + données structurées FAQPage générés depuis la même source
 * (content/faq.ts), pour que le balisage corresponde toujours exactement au texte affiché
 * (exigence Google). Composant serveur : tout le texte est dans le HTML initial, donc
 * lisible par Google et les IA.
 *
 * Le grand « FAQ » est décoratif (même titre géant que les autres sections) ; le h2, plus
 * descriptif, est à sa droite, posé sur la même ligne de base. Accordéon en <details> natifs : fonctionne au clavier
 * et sans JavaScript, et le texte replié reste dans le HTML, donc indexé. La réponse se
 * déplie en douceur (.faq-item, globals.css), sauf si l'animation est réduite. Une seule
 * colonne : les réponses sont longues.
 */

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(({ q, a, list, after }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      // Balises <p>, <ul>, <li> autorisées par schema.org dans le texte d'une réponse.
      text: list
        ? `<p>${a}</p><ul>${list.map((item) => `<li>${item}</li>`).join("")}</ul>${after ? `<p>${after}</p>` : ""}`
        : a,
    },
  })),
};

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-titre" className="py-24">
      <Container className="flex flex-col gap-8">
        {/* Le h2 passe sous le titre dès qu'il ne tient plus sur une ligne à sa droite. */}
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-4">
          <div aria-hidden="true">
            <SectionHeading num="04" as="p" className="whitespace-nowrap">
              FAQ
            </SectionHeading>
          </div>
          <h2 id="faq-titre" className="text-[1.1875rem] leading-[1.6] text-muted">
            Questions fréquentes sur la création de site internet
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faq.map(({ q, a, list, after }) => (
            <details
              key={q}
              className="faq-item group rounded-[20px] border border-line bg-surface px-7 py-[26px] open:border-pink motion-safe:transition-colors motion-safe:duration-300"
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[1.1875rem] font-semibold press-text [&::-webkit-details-marker]:hidden">
                {/* Lignes équilibrées : pas de « ? » isolé en fin de question sur mobile. */}
                <h3 className="text-balance">{q}</h3>
                <span aria-hidden="true" className="shrink-0 font-mono text-pink">
                  <span className="group-open:hidden">[+]</span>
                  <span className="hidden group-open:inline">[−]</span>
                </span>
              </summary>
              <div className="mt-3 flex max-w-[75ch] flex-col gap-3 leading-[1.65] text-muted">
                <p>{a}</p>
                {list && (
                  <ul className="flex list-disc flex-col gap-1.5 pl-5 marker:text-pink">
                    {list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {after && <p>{after}</p>}
              </div>
            </details>
          ))}
        </div>

        <ButtonLink
          href={site.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start"
        >
          <CoffeeIcon />
          Réserver mon café virtuel
          <span className="sr-only">(nouvel onglet)</span>
          <ArrowUpRightIcon />
        </ButtonLink>
      </Container>

      <script
        type="application/ld+json"
        // Échappement de "<" pour empêcher toute injection via la balise script.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
