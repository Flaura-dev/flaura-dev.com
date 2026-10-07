import { BookingPanel } from "@/components/contact/BookingPanel";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { ArrowUpRightIcon, LinkedInIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

/*
 * Réservation (7/11) et formulaire (4/11) côte à côte sur grand écran ; en dessous,
 * l'un au-dessus de l'autre pour que le formulaire garde une largeur confortable.
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
        <p className="max-w-[620px] text-[19px] leading-[1.6] text-muted">
          Le plus simple&nbsp;: choisis un créneau pour un appel découverte. Tu préfères
          écrire&nbsp;? Le formulaire est juste à côté.
        </p>

        <div className="grid items-stretch gap-5 xl:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
          <BookingPanel />
          <div className="flex flex-col gap-4">
            <ContactForm />
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-[20px] border border-line bg-surface px-6 py-5 text-fg transition-colors hover:border-pink"
            >
              <span className="flex items-center gap-3 font-semibold">
                <LinkedInIcon className="text-pink" />
                Me suivre sur LinkedIn
                <span className="sr-only">(nouvel onglet)</span>
              </span>
              <ArrowUpRightIcon size={16} className="text-pink" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
