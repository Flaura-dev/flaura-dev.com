import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Confidentialité",
  // Page provisoire : à indexer une fois rédigée.
  robots: { index: false },
};

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Confidentialité">
      <p>
        [Page à rédiger une fois le formulaire, l’envoi d’e-mails et les statistiques décidés.
        Contenu attendu :]
      </p>
      <section className="flex flex-col gap-2">
        <h2>Données collectées</h2>
        <p>[Formulaire de contact : nom, e-mail, type de projet, message]</p>
      </section>
      <section className="flex flex-col gap-2">
        <h2>Finalité et base légale</h2>
        <p>[Répondre à votre demande]</p>
      </section>
      <section className="flex flex-col gap-2">
        <h2>Destinataires et sous-traitants</h2>
        <p>[Hébergeur, service d’envoi d’e-mails, Calendly si vous réservez un appel]</p>
      </section>
      <section className="flex flex-col gap-2">
        <h2>Durée de conservation</h2>
        <p>[À définir]</p>
      </section>
      <section className="flex flex-col gap-2">
        <h2>Vos droits</h2>
        <p>[Accès, rectification, effacement, opposition : comment me contacter, recours CNIL]</p>
      </section>
      <section className="flex flex-col gap-2">
        <h2>Cookies et mesure d’audience</h2>
        <p>
          [Aucun cookie avant votre clic sur le calendrier Calendly ; outil de statistiques à
          préciser]
        </p>
      </section>
    </LegalPage>
  );
}
