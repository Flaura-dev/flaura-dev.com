import { BookingPanel } from "@/components/contact/BookingPanel";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/*
 * Réservation (7/11) et formulaire (4/11) côte à côte sur grand écran ; en dessous,
 * l'un au-dessus de l'autre pour que le formulaire garde une largeur confortable.
 * Le lien LinkedIn est dans la présentation du bloc de réservation : les deux colonnes
 * gardent ainsi à peu près la même hauteur que le calendrier (pas de grand vide).
 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-titre" className="py-24">
      <Container className="flex flex-col gap-9">
        <SectionHeading num="05" id="contact-titre">
          <span className="whitespace-nowrap text-pink">
            Parlons<span className="text-fg">‑en.</span>
          </span>
        </SectionHeading>
        <p className="max-w-[620px] text-[1.1875rem] leading-[1.6] text-muted">
          Le plus simple&nbsp;: choisis un créneau pour un café virtuel. Tu préfères écrire&nbsp;?
          Le formulaire est juste à côté.
        </p>

        <div className="grid items-stretch gap-5 xl:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
          <BookingPanel />
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
