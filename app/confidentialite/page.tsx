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
import { pageUrls } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Données personnelles collectées par Flaura.dev via le formulaire de contact et la prise de rendez-vous : finalités, destinataires, conservation, cookies et droits.",
  ...pageUrls("/confidentialite"),
};

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

const sections: LegalSection[] = [
  {
    id: "responsable",
    num: "01",
    title: "Responsable du traitement",
    content: (
      <>
        <p>
          Le responsable du traitement est {legal.name}, {legal.status}, qui exerce sous le nom
          commercial Flaura.dev. Pour toute question sur vos données, écrivez à l’adresse e-mail
          indiquée ci-dessous.
        </p>
        <LegalFacts
          items={[
            { term: "Adresse", value: legal.address },
            { term: "E-mail", value: mail },
            { term: "SIREN", value: legal.siren },
          ]}
        />
      </>
    ),
  },
  {
    id: "donnees-collectees",
    num: "02",
    title: "Données collectées et utilisation",
    content: (
      <>
        <p>
          Seules les données nécessaires sont collectées. Les champs du formulaire sont tous utiles
          pour vous répondre. Sans ces informations, votre demande ne peut pas être traitée.
        </p>

        <h3>formulaire de contact</h3>
        <p>
          Vous transmettez votre nom et prénom, votre adresse e-mail, le type de projet et votre
          message. Ces informations servent uniquement à répondre à votre demande et, le cas
          échéant, à préparer un devis.
        </p>
        <p>
          Base légale&nbsp;: les mesures précontractuelles prises à votre demande (article 6.1.b du
          RGPD), ou l’intérêt légitime à répondre aux messages reçus (article 6.1.f) quand votre
          demande ne concerne pas un projet.
        </p>

        <h3>échanges par e-mail</h3>
        <p>
          Les messages du formulaire sont acheminés par le service d’envoi Brevo jusqu’à la
          messagerie professionnelle {site.email}, hébergée par Hostinger et redirigée vers une
          boîte Gmail depuis laquelle elle est consultée. La suite des échanges se fait par e-mail.
          Même base légale que le formulaire.
        </p>

        <h3>réservation d’un appel (Calendly et Google Meet)</h3>
        <p>
          Si vous réservez un créneau, Calendly recueille votre nom, votre adresse e-mail, le
          créneau choisi et vos éventuelles réponses au formulaire de réservation. L’appel a lieu
          sur Google Meet, dont le lien vous est envoyé par e-mail.
        </p>
        <p>
          Base légale&nbsp;: les mesures précontractuelles prises à votre demande (article 6.1.b du
          RGPD).
        </p>

        <h3>suivi des projets</h3>
        <p>
          Lorsqu’un échange débouche sur un projet, vos coordonnées professionnelles et l’avancement
          du projet sont suivis dans un outil de gestion (Airtable).
        </p>
        <p>
          Base légale&nbsp;: l’exécution du contrat ou des mesures précontractuelles (article 6.1.b
          du RGPD).
        </p>

        <h3>prospection</h3>
        <p>
          Avant un premier contact, Flaura.dev peut relever les coordonnées professionnelles
          publiques d’une entreprise (nom, activité, adresse, site internet, téléphone ou e-mail
          professionnels) pour lui présenter ses services, par e-mail, par téléphone ou lors d’une
          visite. Ces coordonnées proviennent d’annuaires professionnels, de fiches d’établissement
          en ligne, de sites internet ou d’une recommandation (bouche-à-oreille). Ces informations
          sont suivies dans le même outil (Airtable). Vous pouvez vous y opposer à tout moment, par
          un simple message.
        </p>
        <p>
          Base légale&nbsp;: l’intérêt légitime à faire connaître son activité auprès des
          professionnels (article 6.1.f du RGPD).
        </p>

        <h3>gestion comptable</h3>
        <p>
          Devis et factures contiennent l’identité et les coordonnées des clients. Ils sont établis
          avec l’outil de facturation de Superindep.
        </p>
        <p>
          Base légale&nbsp;: le respect des obligations légales comptables et fiscales (article
          6.1.c du RGPD).
        </p>

        <h3>données techniques</h3>
        <p>
          L’hébergeur enregistre des journaux techniques lors de la consultation du site (adresse
          IP, date et heure, page consultée, navigateur). Ils servent à assurer la sécurité et le
          bon fonctionnement du site.
        </p>
        <p>
          Pour limiter les envois abusifs, l’adresse IP de chaque envoi du formulaire est aussi
          gardée en mémoire par le site pendant dix minutes. Elle ne sert qu’à appliquer cette
          limite et n’est jamais enregistrée.
        </p>
        <p>Base légale&nbsp;: l’intérêt légitime à sécuriser le site (article 6.1.f du RGPD).</p>

        <p>
          Aucune décision automatisée ni aucun profilage n’est réalisé à partir de vos données.
          Elles ne sont jamais vendues ni utilisées à des fins publicitaires.
        </p>
      </>
    ),
  },
  {
    id: "destinataires",
    num: "03",
    title: "Destinataires",
    content: (
      <>
        <p>
          Vos données sont lues uniquement par {legal.name}. Elles ne sont ni vendues, ni louées, ni
          cédées.
        </p>
        <p>
          Pour fonctionner, le site et l’activité s’appuient sur des prestataires techniques qui
          traitent certaines données pour le compte de Flaura.dev&nbsp;:
        </p>
        <ul>
          <li>Hostinger&nbsp;: hébergement du site et de la messagerie</li>
          <li>Brevo&nbsp;: acheminement des messages du formulaire de contact</li>
          <li>Calendly&nbsp;: prise de rendez-vous</li>
          <li>Google&nbsp;: messagerie Gmail, visioconférence Google Meet et agenda associé</li>
          <li>Airtable&nbsp;: suivi des projets</li>
          <li>Superindep&nbsp;: devis, factures et facturation électronique</li>
        </ul>
        <p>
          Vos données peuvent aussi être communiquées à un expert-comptable ou à l’administration,
          lorsque la loi l’exige.
        </p>
      </>
    ),
  },
  {
    id: "transferts",
    num: "04",
    title: "Transferts hors de l’Union européenne",
    content: (
      <>
        <p>
          Calendly, Google et Airtable sont des sociétés américaines. Certaines de vos données
          peuvent donc être transférées aux États-Unis. Calendly et Google adhèrent au cadre de
          protection des données UE-États-Unis (Data Privacy Framework). Airtable encadre ses
          transferts par les clauses contractuelles types de la Commission européenne, intégrées à
          son contrat de traitement des données.
        </p>
        <p>
          Hostinger est une société établie dans l’Union européenne. Ses éventuels transferts hors
          de l’Union sont encadrés par les clauses contractuelles types.
        </p>
        <p>
          Brevo est une société française. Les messages du formulaire sont envoyés depuis ses
          serveurs situés dans l’Union européenne.
        </p>
      </>
    ),
  },
  {
    id: "conservation",
    num: "05",
    title: "Durées de conservation",
    content: (
      <ul>
        <li>
          Demandes de contact, réservations d’appel et prospects sans suite&nbsp;: 3&nbsp;ans
          maximum à compter de la collecte ou du dernier échange venant de vous, puis suppression.
        </li>
        <li>
          Données des clients&nbsp;: pendant toute la relation commerciale, puis archivage pendant
          un an, délai pour agir prévu par les{" "}
          <Link href="/cgv">conditions générales de vente</Link>.
        </li>
        <li>Devis et factures&nbsp;: 10&nbsp;ans, durée imposée pour les pièces comptables.</li>
        <li>
          Journaux techniques de l’hébergeur&nbsp;: conservés par Hostinger pendant la durée
          nécessaire à la sécurité, au diagnostic et à la continuité du service, et consultables
          pendant 7&nbsp;jours dans l’espace d’hébergement.
        </li>
      </ul>
    ),
  },
  {
    id: "securite",
    num: "06",
    title: "Sécurité",
    content: (
      <>
        <p>
          Le site est accessible uniquement en connexion chiffrée (HTTPS). L’accès aux outils
          contenant vos données est réservé à {legal.name} et protégé par des identifiants
          personnels.
        </p>
        <p>
          En cas de violation de données susceptible de présenter un risque pour vous, la CNIL et,
          si nécessaire, les personnes concernées sont informées dans les conditions prévues par le
          RGPD.
        </p>
      </>
    ),
  },
  {
    id: "droits",
    num: "07",
    title: "Vos droits",
    content: (
      <>
        <p>
          Vous pouvez à tout moment demander à accéder à vos données, les faire rectifier ou
          effacer, limiter leur traitement ou vous y opposer. Lorsque le traitement repose sur un
          contrat ou des mesures précontractuelles, vous pouvez aussi demander à récupérer vos
          données dans un format lisible (portabilité). Vous pouvez également définir des directives
          sur la conservation, l’effacement et la communication de vos données après votre décès.
        </p>
        <p>
          Il suffit d’écrire à {mail}. Une réponse vous est apportée dans un délai d’un mois. Une
          pièce justificative ne vous sera demandée qu’en cas de doute raisonnable sur votre
          identité.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation
          à la CNIL sur <ExternalLink href="https://www.cnil.fr">cnil.fr</ExternalLink>.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    num: "08",
    title: "Cookies et stockage local",
    content: (
      <>
        <p>
          Ce site ne dépose aucun cookie lors de votre visite. Il n’utilise aucun outil de mesure
          d’audience ni de publicité. C’est pourquoi aucun bandeau de consentement ne s’affiche.
        </p>
        <p>
          Deux informations peuvent être enregistrées dans votre navigateur (stockage local),
          uniquement si vous utilisez les boutons correspondants&nbsp;:
        </p>
        <ul>
          <li>votre choix de thème clair ou sombre&nbsp;;</li>
          <li>votre choix d’afficher ou de masquer l’animation des pétales.</li>
        </ul>
        <p>
          Elles servent seulement à mémoriser vos préférences d’affichage, ne quittent pas votre
          appareil et ne sont transmises à personne. Vous pouvez les effacer à tout moment depuis
          les réglages de votre navigateur.
        </p>
        <p>
          Le calendrier de réservation est fourni par Calendly. Il ne se charge que si vous cliquez
          sur «&nbsp;Voir les créneaux disponibles&nbsp;». À partir de ce clic, Calendly peut
          déposer ses propres cookies, régis par sa{" "}
          <ExternalLink href="https://calendly.com/legal/privacy-notice">
            politique de confidentialité
          </ExternalLink>
          . Si vous préférez ne pas l’utiliser, le formulaire de contact reste disponible.
        </p>
      </>
    ),
  },
];

export default function ConfidentialitePage() {
  return (
    <LegalPage
      path="/confidentialite"
      title="Politique de confidentialité"
      subtitle="Données personnelles, cookies et stockage local"
      meta="Dernière mise à jour&nbsp;: 30 octobre 2026"
      intro={
        <p>
          Cette politique explique quelles données personnelles sont collectées sur flaura-dev.com,
          pourquoi, combien de temps elles sont conservées, et comment exercer vos droits. Elle
          s’applique au site et aux échanges qui suivent une prise de contact.
        </p>
      }
      sections={sections}
    />
  );
}
