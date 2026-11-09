import type { Metadata } from "next";
import Link from "next/link";
import {
  ExternalLink,
  LegalFacts,
  LegalPage,
  type LegalSection,
} from "@/components/layout/LegalPage";
import { legal } from "@/content/legal";
import { site } from "@/content/site";
import { legalRobots, pageUrls } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site Flaura.dev : éditrice, directrice de la publication, hébergeur, propriété intellectuelle et conditions d’utilisation du site.",
  ...pageUrls("/mentions-legales"),
  robots: legalRobots,
};

const sections: LegalSection[] = [
  {
    id: "editrice",
    num: "01",
    title: "Éditrice du site",
    content: (
      <>
        <p>
          Le site flaura-dev.com est édité par {legal.name}, {legal.status}, qui exerce sous le nom
          commercial Flaura.dev.
        </p>
        <LegalFacts
          items={[
            { term: "Adresse", value: legal.address },
            { term: "Téléphone", value: <a href={legal.phoneHref}>{legal.phone}</a> },
            { term: "E-mail", value: <a href={`mailto:${site.email}`}>{site.email}</a> },
            { term: "SIREN", value: legal.siren },
            { term: "SIRET", value: legal.siret },
            {
              term: "Immatriculation",
              value: `Registre national des entreprises (RNE), le ${legal.registeredOn}`,
            },
            { term: "Code APE", value: legal.ape },
            {
              term: "N° de TVA intracommunautaire",
              value: legal.vatNumber ?? "en cours d’attribution",
            },
          ]}
        />
      </>
    ),
  },
  {
    id: "publication",
    num: "02",
    title: "Directrice de la publication",
    content: (
      <p>
        La directrice de la publication est {legal.name}, joignable à l’adresse{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    ),
  },
  {
    id: "hebergeur",
    num: "03",
    title: "Hébergeur",
    content: (
      <>
        <p>
          Le site et la messagerie associée sont hébergés par Hostinger International Ltd, société
          de droit chypriote, 61 Lordou Vironos Street, 6023 Larnaca, Chypre.
        </p>
        <ul>
          <li>
            Site internet&nbsp;:{" "}
            <ExternalLink href="https://www.hostinger.com">https://www.hostinger.com</ExternalLink>
          </li>
          <li>
            Contact&nbsp;: assistance en ligne depuis le site hostinger.com (Hostinger ne propose
            pas d’assistance téléphonique)
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "objet",
    num: "04",
    title: "Objet du site",
    content: (
      <>
        <p>
          Ce site présente l’activité de Flaura.dev&nbsp;: création et refonte de sites internet et
          d’applications web, mise en ligne et maintenance. Il permet de prendre contact et de
          réserver un appel de découverte.
        </p>
        <p>
          Les prestations de Flaura.dev sont réservées aux professionnels&nbsp;: entreprises,
          artisans, commerçants, indépendants. Aucune commande ni aucun paiement n’est possible sur
          le site. Chaque prestation fait l’objet d’un devis personnalisé et des{" "}
          <Link href="/cgv">conditions générales de vente</Link> remises avec ce devis.
        </p>
        <p>
          Les tarifs affichés sur le site sont indicatifs. Seul le devis signé engage les parties.
        </p>
      </>
    ),
  },
  {
    id: "propriete-intellectuelle",
    num: "05",
    title: "Propriété intellectuelle",
    content: (
      <>
        <p>
          Les textes, photographies, logos, illustrations, la charte graphique et le code de ce site
          appartiennent à {legal.name}, sauf mention contraire. Toute reproduction, représentation
          ou adaptation, totale ou partielle, sans son autorisation écrite préalable est interdite.
        </p>
        <p>
          Les réalisations présentées dans la rubrique <Link href="/projets">Projets</Link> le sont
          avec l’accord des clients concernés. Leurs noms, marques, logos et contenus restent leur
          propriété.
        </p>
      </>
    ),
  },
  {
    id: "liens",
    num: "06",
    title: "Liens externes et services tiers",
    content: (
      <>
        <p>
          Le site contient des liens vers d’autres sites&nbsp;: LinkedIn, GitHub, Calendly et les
          sites réalisés pour des clients. Ces sites sont soumis à leurs propres conditions et
          politiques de confidentialité. {legal.name} n’a aucun contrôle sur leur contenu et ne peut
          en être tenue responsable.
        </p>
        <p>
          Le calendrier de réservation Calendly ne se charge que si vous cliquez pour l’afficher.
          Les conditions de ce service sont détaillées dans la{" "}
          <Link href="/confidentialite#cookies">politique de confidentialité</Link>.
        </p>
      </>
    ),
  },
  {
    id: "responsabilite",
    num: "07",
    title: "Responsabilité",
    content: (
      <>
        <p>
          {legal.name} veille à l’exactitude et à la mise à jour des informations publiées sur ce
          site. Elles sont données à titre informatif et peuvent comporter des erreurs ou des
          omissions, signalées et corrigées dès qu’elles sont connues.
        </p>
        <p>
          Le site peut être temporairement inaccessible, notamment pour des opérations de
          maintenance ou en cas d’incident technique chez l’hébergeur.
        </p>
      </>
    ),
  },
  {
    id: "donnees-personnelles",
    num: "08",
    title: "Données personnelles et cookies",
    content: (
      <>
        <p>
          Le traitement de vos données personnelles, notamment via le formulaire de contact et la
          prise de rendez-vous, est décrit dans la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
        <p>
          Ce site ne dépose aucun cookie publicitaire ni de mesure d’audience. Les seules
          informations enregistrées dans votre navigateur servent à mémoriser vos préférences
          d’affichage. Le détail figure dans la{" "}
          <Link href="/confidentialite#cookies">politique de confidentialité</Link>.
        </p>
      </>
    ),
  },
  {
    id: "droit-applicable",
    num: "09",
    title: "Droit applicable",
    content: <p>Les présentes mentions légales sont soumises au droit français.</p>,
  },
];

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      path="/mentions-legales"
      title="Mentions légales"
      subtitle="Site flaura-dev.com"
      meta="Dernière mise à jour&nbsp;: 9 novembre 2026"
      sections={sections}
    />
  );
}
