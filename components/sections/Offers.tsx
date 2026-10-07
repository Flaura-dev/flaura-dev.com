import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { offers } from "@/content/offers";

export function Offers() {
  return (
    <section id="offres" aria-labelledby="offres-titre" className="py-24">
      <Container className="flex flex-col gap-8">
        <SectionHeading num="03" id="offres-titre">
          Offres
        </SectionHeading>

        <ul className="flex flex-col border-t border-line">
          {offers.map((offer) => (
            <li
              key={offer.num}
              className="flex flex-wrap items-center gap-6 border-b border-line py-8"
            >
              <span
                aria-hidden="true"
                className="flex-[0_0_90px] font-display text-[56px] leading-none font-black text-pink"
              >
                {offer.num}
              </span>
              <div className="flex flex-[1_1_320px] flex-col gap-2">
                <h3 className="font-display text-[40px] leading-none font-black uppercase">
                  {offer.title}
                </h3>
                <p className="text-muted">{offer.text}</p>
              </div>
              <ul className="flex-[1_1_260px] font-mono text-[13px] leading-[1.9] text-muted">
                {offer.features.map((feature) => (
                  <li key={feature}>+ {feature}</li>
                ))}
              </ul>
              <p className="flex-none text-lg font-semibold">{offer.price}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
