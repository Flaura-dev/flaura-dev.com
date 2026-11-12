import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq } from "@/content/faq";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-titre" className="py-24">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          num="04"
          id="faq-titre"
          subtitle="Questions fréquentes sur la création de site internet"
        >
          FAQ
        </SectionHeading>

        <div className="flex flex-col gap-4">
          {faq.map(({ q, a, list, after }) => (
            <details
              key={q}
              className="faq-item group rounded-[20px] border border-line bg-surface px-7 py-[26px] open:border-pink motion-safe:transition-colors motion-safe:duration-300"
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[1.1875rem] font-semibold press-text [&::-webkit-details-marker]:hidden">
                <h3 className="text-balance">{q}</h3>
                <span aria-hidden="true" className="faq-toggle shrink-0 font-mono text-pink" />
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
      </Container>
    </section>
  );
}
