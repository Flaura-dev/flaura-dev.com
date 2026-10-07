import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales",
  // Page provisoire : à indexer une fois rédigée.
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales">
      <p>[Page à rédiger. Contenu attendu :]</p>
      <section className="flex flex-col gap-2">
        <h2>Éditrice du site</h2>
        <p>[Nom, statut de l’entreprise, SIRET, adresse ou domiciliation, e-mail de contact]</p>
      </section>
      <section className="flex flex-col gap-2">
        <h2>Directrice de la publication</h2>
        <p>[Nom]</p>
      </section>
      <section className="flex flex-col gap-2">
        <h2>Hébergeur</h2>
        <p>[Hostinger : raison sociale, adresse, téléphone]</p>
      </section>
      <section className="flex flex-col gap-2">
        <h2>Propriété intellectuelle</h2>
        <p>[Textes, photos, logos et design : tous droits réservés]</p>
      </section>
    </LegalPage>
  );
}
