import type { Metadata } from "next";
import Link from "next/link";
import { LegalFacts, LegalPage, Todo, type LegalSection } from "@/components/layout/LegalPage";
import { legal } from "@/content/legal";
import { site } from "@/content/site";
import { pageUrls } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente de Flaura.dev pour la création et la refonte de sites internet, réservées aux clients professionnels : devis, paiement, livraison, garantie et propriété intellectuelle.",
  ...pageUrls("/cgv"),
  // Des champs restent à compléter : à indexer une fois remplis.
  robots: { index: false },
};

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

/** Renvoi vers un autre article de la page. */
function Art({ n }: { n: number }) {
  return <a href={`#article-${n}`}>article {n}</a>;
}

const sections: LegalSection[] = [
  {
    id: "article-1",
    num: "01",
    title: "Objet et champ d’application",
    content: (
      <>
        <p>
          Les présentes conditions générales de vente (CGV) encadrent les prestations de
          Flaura.dev&nbsp;: création et refonte de sites internet, applications web, et prestations
          associées.
        </p>
        <p>
          Elles s’adressent exclusivement aux professionnels qui commandent ces prestations pour les
          besoins de leur activité. Flaura.dev ne contracte pas avec des consommateurs. Le Client
          indique son numéro SIREN (ou équivalent) lors de la commande.
        </p>
        <p>
          Le contrat se compose, par ordre de priorité décroissant&nbsp;: du devis signé et de ses
          éventuelles annexes, des présentes CGV, puis, le cas échéant, du contrat de maintenance et
          de l’accord de sous-traitance des données. En cas de contradiction, le document de rang
          supérieur prévaut. Les conditions d’achat du Client ne s’appliquent pas, sauf accord écrit
          de la Prestataire.
        </p>
      </>
    ),
  },
  {
    id: "article-2",
    num: "02",
    title: "Définitions",
    content: (
      <ul>
        <li>
          <strong>Prestataire</strong>&nbsp;: {legal.name}, Entrepreneur individuel (EI),
          micro-entreprise, Flaura.dev.
        </li>
        <li>
          <strong>Client</strong>&nbsp;: le professionnel qui accepte le devis.
        </li>
        <li>
          <strong>Devis</strong>&nbsp;: le document qui décrit la prestation, son prix, son
          calendrier et ses conditions particulières.
        </li>
        <li>
          <strong>Maquette</strong>&nbsp;: la représentation visuelle du site soumise au Client
          avant le développement.
        </li>
        <li>
          <strong>Livrables</strong>&nbsp;: les éléments produits pour le Client et décrits au devis
          (maquettes validées, site, code, fichiers).
        </li>
        <li>
          <strong>Recette</strong>&nbsp;: la période pendant laquelle le Client vérifie que le site
          livré est conforme au devis.
        </li>
      </ul>
    ),
  },
  {
    id: "article-3",
    num: "03",
    title: "Devis et commande",
    content: (
      <>
        <p>
          Chaque prestation fait l’objet d’un devis gratuit, valable un mois à compter de sa date
          d’émission.
        </p>
        <p>
          La commande est ferme lorsque le Client signe le devis par voie électronique et accepte
          les présentes CGV, puis règle l’acompte prévu à l’
          <Art n={7} />. Les travaux commencent à réception de l’acompte, sauf disposition
          particulière de l’
          <Art n={4} />.
        </p>
        <p>
          Toute modification du périmètre après la commande donne lieu à un avenant ou à un devis
          complémentaire, signé dans les mêmes conditions.
        </p>
      </>
    ),
  },
  {
    id: "article-4",
    num: "04",
    title: "Contrat signé hors établissement avec un petit professionnel",
    content: (
      <>
        <p>
          Cet article s’applique lorsque deux conditions sont réunies&nbsp;: le contrat est conclu
          hors établissement (par exemple lors d’un rendez-vous dans les locaux du Client, ou juste
          après), et le Client emploie au plus cinq salariés pour une prestation qui n’entre pas
          dans le champ de son activité principale (article L.&nbsp;221-3 du Code de la
          consommation). Le devis indique si ce régime s’applique.
        </p>
        <p>Dans ce cas, le Client bénéficie des règles suivantes&nbsp;:</p>
        <ul>
          <li>
            Il reçoit, avant de signer, l’ensemble des informations prévues par la loi, réunies dans
            le devis, les présentes CGV et le <a href="#annexe">formulaire de rétractation</a>{" "}
            annexé. Un exemplaire signé du contrat lui est remis sur support durable.
          </li>
          <li>
            Il dispose d’un délai de quatorze jours à compter de la signature pour se rétracter,
            sans avoir à se justifier ni à payer de pénalité. Il peut utiliser le formulaire annexé
            ou toute déclaration dénuée d’ambiguïté envoyée à {mail}.
          </li>
          <li>
            Aucun paiement, acompte compris, ne peut être reçu avant l’expiration d’un délai de sept
            jours à compter de la signature.
          </li>
          <li>
            Les travaux ne commencent pas avant la fin du délai de rétractation, sauf si le Client
            en fait la demande expresse sur papier ou sur support durable. Dans ce cas, s’il se
            rétracte ensuite, il ne doit que le montant correspondant au travail réalisé jusqu’à sa
            rétractation, en proportion du prix total.
          </li>
        </ul>
        <p>
          Les délais de réalisation prévus au devis courent alors à compter de la fin du délai de
          rétractation, ou de la demande expresse de démarrage.
        </p>
      </>
    ),
  },
  {
    id: "article-5",
    num: "05",
    title: "Périmètre de la prestation",
    content: (
      <>
        <p>
          La prestation comprend uniquement ce que décrit le devis. Tout ce qui n’y figure pas est
          exclu, notamment la rédaction des contenus, la création de photos ou de logos, la
          traduction, le référencement payant, l’hébergement, la création et la configuration des
          adresses e-mail, la rédaction des documents juridiques du Client et la maintenance après
          la garantie, sauf mention contraire au devis.
        </p>
        <p>
          Le site est conçu en suivant les bonnes pratiques d’accessibilité (WCAG), sans audit ni
          garantie de conformité au RGAA. Si le Client est soumis à une obligation légale
          d’accessibilité, notamment pour un site marchand au titre de la directive européenne
          2019/882, il le signale avant la signature du devis. La mise en conformité fait alors
          l’objet d’un devis spécifique.
        </p>
        <p>
          Pour une refonte, le Client garantit disposer des droits sur les contenus de son site
          actuel et fournit les accès nécessaires à leur récupération. La Prestataire migre les
          contenus et met en place les redirections prévues au devis. Elle n’est pas responsable des
          éléments que l’ancien prestataire ou la plateforme d’origine ne permet pas d’exporter.
          Avant la mise en ligne du nouveau site, le Client s’assure de disposer d’une sauvegarde de
          l’ancien, que la Prestataire peut l’aider à réaliser lorsque l’hébergement le permet. Les
          redirections limitent l’effet de la refonte sur le référencement, mais une baisse
          temporaire du trafic ou du positionnement reste possible et ne constitue pas un
          manquement.
        </p>
        <p>
          Toute demande supplémentaire fait l’objet d’un devis complémentaire préalable. À défaut de
          forfait, elle est facturée au temps passé, au tarif de 60&nbsp;€&nbsp;HT de l’heure.
        </p>
      </>
    ),
  },
  {
    id: "article-6",
    num: "06",
    title: "Prix et frais tiers",
    content: (
      <>
        <p>
          Les prix sont indiqués en euros hors taxes au devis. La TVA s’y ajoute au taux en vigueur
          à la date de facturation, soit 20&nbsp;% à la date des présentes CGV. Les tarifs
          indicatifs des formules sont publiés sur flaura-dev.com et le tarif horaire figure à l’
          <Art n={5} />
          &nbsp;; seul le devis signé fixe le prix de la prestation.
        </p>
        <p>
          Certains services tiers peuvent être nécessaires au projet&nbsp;: nom de domaine,
          hébergement, licences de polices, photos ou modules payants, outils en ligne. Ils ne sont
          pas compris dans le prix de la prestation, sauf mention contraire au devis. Ils sont
          souscrits au nom du Client et payés directement par lui. La Prestataire ne les avance pas
          et ne les refacture pas. La Prestataire signale ces coûts dès qu’elle en a connaissance,
          et au plus tard dans le devis.
        </p>
      </>
    ),
  },
  {
    id: "article-7",
    num: "07",
    title: "Paiement",
    content: (
      <>
        <p>Sauf disposition contraire au devis, le prix est payé en trois fois&nbsp;:</p>
        <ul>
          <li>30&nbsp;% d’acompte à la commande&nbsp;;</li>
          <li>40&nbsp;% à la validation écrite de la maquette&nbsp;;</li>
          <li>
            30&nbsp;% de solde à la fin de la recette prévue à l’
            <Art n={11} />.
          </li>
        </ul>
        <p>
          L’acompte est payable à réception de la facture, sous réserve de l’
          <Art n={4} />. Les autres factures sont payables sous quinze jours à compter de leur
          émission, par virement bancaire. Aucun escompte n’est accordé pour paiement anticipé.
        </p>
        <p>
          En cas de retard de paiement, des pénalités sont dues de plein droit, sans rappel
          préalable, au taux de la Banque centrale européenne à son opération de refinancement la
          plus récente majoré de dix points. S’y ajoute une indemnité forfaitaire pour frais de
          recouvrement de 40&nbsp;€ par facture (articles L.&nbsp;441-10 et D.&nbsp;441-5 du Code de
          commerce).
        </p>
        <p>
          Si une facture reste impayée quinze jours après une relance écrite, la Prestataire peut
          suspendre ses travaux jusqu’au paiement complet. Les délais du devis sont alors prolongés
          d’autant.
        </p>
        <p>
          La mise en ligne définitive, la remise des fichiers et le transfert des droits
          n’interviennent qu’après le paiement complet du prix.
        </p>
      </>
    ),
  },
  {
    id: "article-8",
    num: "08",
    title: "Engagements du Client",
    content: (
      <>
        <p>
          Le Client collabore activement au projet. Il désigne un interlocuteur, fournit dans les
          délais convenus les contenus (textes, images, logos) et les accès nécessaires, et répond
          aux demandes de validation.
        </p>
        <p>
          Le Client reste seul responsable de la conformité juridique de son site et de son activité
          en ligne&nbsp;: mentions légales, conditions générales, politique de confidentialité,
          gestion des cookies et obligations propres à sa profession. La Prestataire intègre les
          textes et les réglages que le Client lui fournit ou valide, sans les rédiger ni en
          garantir la conformité.
        </p>
        <p>
          Il garantit disposer de tous les droits sur les contenus qu’il fournit, et que ces
          contenus respectent la loi. Il reste seul responsable des contenus publiés sur son site.
          La Prestataire peut refuser d’intégrer un contenu manifestement illicite et suspendre la
          prestation jusqu’à son retrait.
        </p>
      </>
    ),
  },
  {
    id: "article-9",
    num: "09",
    title: "Maquette et allers-retours",
    content: (
      <>
        <p>
          La Prestataire soumet au Client la ou les maquettes prévues au devis. Le nombre de séries
          de modifications compris dans le prix dépend de la formule choisie et figure au devis. Une
          série correspond à l’ensemble des remarques du Client, transmises en une seule fois dans
          un même message. Des remarques envoyées en plusieurs messages successifs comptent comme
          autant de séries. Au-delà de ce nombre, les modifications sont facturées selon l’
          <Art n={5} />.
        </p>
        <p>
          Le développement commence après la validation écrite de la maquette par le Client (un
          e-mail suffit). Une fois la maquette validée, toute modification de la conception est
          traitée comme une demande supplémentaire.
        </p>
      </>
    ),
  },
  {
    id: "article-10",
    num: "10",
    title: "Délais et retards",
    content: (
      <>
        <p>
          Les délais figurent au devis. Ils supposent que le Client remplisse ses engagements de l’
          <Art n={8} /> dans les temps.
        </p>
        <p>
          Tout retard du Client (contenus, accès, validations, paiements) décale la livraison d’une
          durée au moins équivalente.
        </p>
        <p>
          Sans réponse du Client pendant trente jours malgré une relance écrite, la Prestataire peut
          suspendre le projet. Elle facture alors le travail réalisé à cette date. La reprise du
          projet est planifiée selon ses disponibilités.
        </p>
      </>
    ),
  },
  {
    id: "article-11",
    num: "11",
    title: "Livraison, recette et remise",
    content: (
      <>
        <p>
          La livraison consiste à mettre le site à la disposition du Client pour vérification. Le
          Client dispose alors de huit jours ouvrés pour signaler par écrit toute non-conformité au
          devis.
        </p>
        <p>
          La Prestataire corrige les non-conformités signalées dans un délai raisonnable, puis
          présente à nouveau le site. Sans réserve écrite à l’issue du délai de huit jours ouvrés,
          ou en cas d’utilisation du site en production, la recette est réputée acquise.
        </p>
        <p>
          La fin de la recette est constatée par un procès-verbal de recette et de remise, signé
          électroniquement par le Client. Après paiement complet du prix, la Prestataire met le site
          en ligne et remet les fichiers sources dans un délai de quarante-huit heures ouvrées, par
          un lien de téléchargement sécurisé ou par transfert du dépôt de code sur un compte du
          Client. Elle y joint une fiche récapitulative indiquant les services utilisés, les comptes
          concernés et leurs dates de renouvellement. Les identifiants d’accès sont transmis
          séparément. La remise comprend une prise en main du site, à distance. La Prestataire
          conserve une copie des livrables pendant un an après la remise. Au-delà, elle n’est plus
          tenue de les conserver.
        </p>
      </>
    ),
  },
  {
    id: "article-12",
    num: "12",
    title: "Garantie",
    content: (
      <>
        <p>
          Pendant un mois à compter de la fin de la recette, la Prestataire corrige gratuitement les
          anomalies qui rendent le site non conforme au devis. Le site est testé sur les dernières
          versions de Chrome, Firefox, Safari et Edge, sur ordinateur et sur mobile. Les versions
          plus anciennes ne sont pas couvertes.
        </p>
        <p>
          Cette garantie ne couvre pas les évolutions ni les demandes nouvelles, ni les anomalies
          causées par une intervention du Client ou d’un tiers sur le site, par une mise à jour d’un
          service tiers (hébergeur, navigateur, module) ou par une défaillance de l’hébergement.
        </p>
      </>
    ),
  },
  {
    id: "article-13",
    num: "13",
    title: "Propriété intellectuelle",
    content: (
      <>
        <p>
          Tant que le prix n’est pas intégralement payé, la Prestataire reste titulaire de tous les
          droits sur les livrables. Le Client ne peut ni les exploiter, ni les mettre en ligne, ni
          les faire modifier par un tiers.
        </p>
        <p>
          À compter du paiement complet, la Prestataire cède au Client, à titre exclusif, les droits
          patrimoniaux d’auteur dont elle est titulaire sur les livrables spécifiques décrits au
          devis (maquettes validées, éléments graphiques créés pour le Client, code source du site).
          Cette cession porte sur&nbsp;:
        </p>
        <ul>
          <li>le droit de reproduction, sur tout support, notamment numérique&nbsp;;</li>
          <li>
            le droit de représentation, notamment par la mise en ligne et la diffusion au
            public&nbsp;;
          </li>
          <li>
            le droit d’adaptation, de modification, de correction et d’évolution, par le Client ou
            par tout prestataire de son choix&nbsp;;
          </li>
          <li>le droit de traduction et d’arrangement.</li>
        </ul>
        <p>
          Elle est consentie pour le monde entier, pour toute la durée légale de protection des
          droits d’auteur, et pour toute exploitation liée à l’activité du Client, commerciale ou
          non. Son prix est compris dans le prix de la prestation. La cession ne porte pas sur le
          droit moral de la Prestataire, qui ne peut pas être cédé&nbsp;; pour le code, il s’exerce
          dans les limites de l’article L.&nbsp;121-7 du Code de la propriété intellectuelle.
        </p>
        <p>Sont exclus de la cession&nbsp;:</p>
        <ul>
          <li>
            les outils, méthodes, savoir-faire et éléments de code génériques que la Prestataire a
            développés indépendamment du projet et réutilise d’un projet à l’autre. Le Client reçoit
            sur ces éléments, intégrés au site, un droit d’utilisation non exclusif, gratuit et sans
            limite de durée, pour les besoins de son site&nbsp;;
          </li>
          <li>
            les composants tiers (bibliothèques open source, polices, images, modules), qui restent
            soumis à leurs propres licences&nbsp;;
          </li>
          <li>
            les maquettes et pistes graphiques non retenues, qui restent la propriété de la
            Prestataire.
          </li>
        </ul>
        <p>
          La Prestataire s’appuie sur des outils logiciels, y compris des outils d’assistance au
          développement. Elle relit, teste et reste responsable de l’ensemble du code livré.
        </p>
      </>
    ),
  },
  {
    id: "article-14",
    num: "14",
    title: "Références et portfolio",
    content: (
      <>
        <p>
          Sauf refus exprimé par le Client en cochant la case prévue au devis, la Prestataire peut
          présenter la réalisation dans son portfolio, sur ses réseaux professionnels et dans ses
          supports de communication, à partir de la mise en ligne du site. Elle peut y citer le nom
          et le logo du Client, et montrer des captures d’écran du site.
        </p>
        <p>
          Le Client peut demander par la suite le retrait de ces éléments pour un motif légitime.
          Aucune information confidentielle n’est jamais divulguée.
        </p>
        <p>
          Sauf stipulation contraire au devis ou refus du Client, une mention discrète «&nbsp;Site
          conçu et développé par Laura Fontaine · Flaura.dev&nbsp;» figure en pied de page du site,
          avec un lien vers le site de la Prestataire. Le Client reste libre de la retirer par la
          suite.
        </p>
      </>
    ),
  },
  {
    id: "article-15",
    num: "15",
    title: "Confidentialité",
    content: (
      <p>
        Chaque partie garde confidentielles les informations non publiques reçues de l’autre partie
        pendant le projet (données commerciales, accès, documents internes). Cette obligation dure
        pendant le contrat et trois ans après sa fin. Les accès et mots de passe confiés par le
        Client ne sont utilisés que pour les besoins de la prestation. Les accès, mots de passe,
        données personnelles et documents internes du Client ne sont jamais saisis dans un outil
        tiers sans son accord. Le code et les contenus du projet peuvent en revanche être traités
        par les outils de développement mentionnés à l’
        <Art n={13} />.
      </p>
    ),
  },
  {
    id: "article-16",
    num: "16",
    title: "Données personnelles",
    content: (
      <>
        <p>
          Les données des contacts du Client sont traitées par la Prestataire conformément à sa{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>, publiée sur
          flaura-dev.com.
        </p>
        <p>
          Lorsque, pour réaliser ou maintenir le site, la Prestataire accède à des données
          personnelles dont le Client est responsable (formulaires, comptes, fichiers clients), elle
          agit en qualité de sous-traitante au sens de l’article 28 du RGPD. Les parties signent
          alors l’accord de sous-traitance des données annexé au devis. La Prestataire informe
          notamment le Client de toute violation de ces données dans les vingt-quatre heures après
          en avoir pris connaissance.
        </p>
      </>
    ),
  },
  {
    id: "article-17",
    num: "17",
    title: "Responsabilité",
    content: (
      <>
        <p>
          La Prestataire est tenue d’une obligation de moyens. Elle réalise la prestation avec soin,
          selon les règles de l’art. Les bases de référencement intégrées au site favorisent sa
          visibilité, mais la Prestataire ne garantit aucun positionnement dans les moteurs de
          recherche ni dans les réponses des outils d’intelligence artificielle. Elle applique les
          bonnes pratiques de sécurité connues à la date de livraison, sans pouvoir garantir qu’un
          site soit à l’abri de toute faille.
        </p>
        <p>
          Elle n’est responsable que des dommages directs et prouvés qui résultent d’un manquement à
          ses obligations. Sa responsabilité est limitée au montant total payé par le Client pour la
          prestation concernée. Cette limite ne s’applique pas en cas de faute lourde ou
          intentionnelle.
        </p>
        <p>
          La Prestataire n’est pas responsable des contenus fournis ou publiés par le Client, des
          interventions du Client ou de tiers sur le site, ni des défaillances des services tiers
          (hébergeur, registraire du nom de domaine, modules externes). Après la remise, le Client
          assure les sauvegardes de son site, sauf contrat de maintenance.
        </p>
        <p>
          La Prestataire est assurée en responsabilité civile professionnelle auprès de Hiscox SA,
          38 avenue de l’Opéra, 75002 Paris (contrat n°&nbsp;RCPH278685141). La garantie couvre le
          monde entier, hors États-Unis et Canada.
        </p>
      </>
    ),
  },
  {
    id: "article-18",
    num: "18",
    title: "Force majeure",
    content: (
      <p>
        Aucune partie n’est responsable d’un manquement causé par un cas de force majeure au sens de
        l’article 1218 du Code civil. Les obligations concernées sont suspendues pendant sa durée.
        Si l’empêchement dure plus de trente jours, chaque partie peut résilier le contrat par
        écrit&nbsp;; le travail réalisé reste dû.
      </p>
    ),
  },
  {
    id: "article-19",
    num: "19",
    title: "Annulation et résiliation",
    content: (
      <>
        <p>
          <strong>Annulation par le Client.</strong> Le Client peut mettre fin au projet à tout
          moment, par écrit. Il paie alors le travail réalisé jusqu’à la date de l’annulation, ainsi
          qu’une indemnité de dédit égale à 20&nbsp;% du montant restant à facturer. Les sommes déjà
          versées s’imputent sur ces montants. Le Client reçoit les livrables correspondant aux
          sommes payées, par exemple la maquette validée. Le code non livré reste la propriété de la
          Prestataire. Cette indemnité ne s’applique pas à une rétractation exercée dans le cadre de
          l’
          <Art n={4} />.
        </p>
        <p>
          <strong>Résiliation pour manquement.</strong> Si une partie manque gravement à ses
          obligations et n’y remédie pas dans les quinze jours suivant une mise en demeure écrite,
          l’autre partie peut résilier le contrat. Le travail réalisé jusqu’à la résiliation reste
          dû.
        </p>
      </>
    ),
  },
  {
    id: "article-20",
    num: "20",
    title: "Nom de domaine, hébergement et maintenance",
    content: (
      <>
        <p>
          Le nom de domaine et l’hébergement sont souscrits par le Client, à son nom, sur ses
          propres comptes, conformément à l’
          <Art n={6} />. Le Client en reste seul titulaire. La Prestataire peut recommander un
          hébergeur et un registraire adaptés au projet, mais le choix final revient au Client, qui
          contracte directement avec eux. Il invite la Prestataire comme collaboratrice ou contact
          technique, ce qui lui donne un accès délégué pour les besoins de sa mission. La
          Prestataire ne demande jamais les mots de passe personnels du Client. Si un service ne
          permet pas d’accès délégué, le Client crée un accès dédié à la Prestataire ou, à défaut,
          lui communique un mot de passe temporaire qu’il modifie dès la fin de son intervention. Le
          Client peut retirer cet accès à tout moment.
        </p>
        <p>
          La mise en ligne se fait à distance, au moyen de cet accès délégué&nbsp;: raccordement du
          code à l’hébergement, configuration du nom de domaine et de ses enregistrements DNS, puis
          mise en production. Avant de modifier les enregistrements DNS, la Prestataire relève la
          configuration existante, notamment celle de la messagerie. Le Client lui signale tout
          service rattaché à son nom de domaine (adresses e-mail, outils tiers). La Prestataire
          n’est pas responsable d’une interruption causée par un service ou un réglage qui ne lui a
          pas été signalé.
        </p>
        <p>
          Sans contrat de maintenance, la mission prend fin à l’expiration de la garantie prévue à
          l’
          <Art n={12} />. La Prestataire cesse alors d’utiliser ses accès délégués et invite le
          Client à les lui retirer. À partir de cette date, le Client assure seul le renouvellement
          de son nom de domaine et de son hébergement, ainsi que les mises à jour, la sécurité et
          les sauvegardes de son site. La Prestataire n’est pas responsable des incidents liés à un
          défaut de renouvellement, de mise à jour ou de sauvegarde. Toute intervention ultérieure
          fait l’objet d’un devis ou est facturée selon l’
          <Art n={5} />.
        </p>
        <p>
          Le Client peut souscrire à tout moment un contrat de maintenance distinct, qui fixe alors
          les accès et les engagements de la Prestataire.
        </p>
        <p>
          Lorsque la formule choisie au devis comprend des mois de maintenance offerts, ils
          commencent à la mise en ligne du site et suivent les conditions du contrat de maintenance.
          Ils ne se renouvellent pas automatiquement&nbsp;: à leur terme, le Client souscrit un
          contrat de maintenance ou gère seul son site, dans les conditions ci-dessus.
        </p>
      </>
    ),
  },
  {
    id: "article-21",
    num: "21",
    title: "Dispositions générales",
    content: (
      <>
        <p>
          Les échanges par e-mail valent écrit entre les parties. La version des CGV applicable est
          celle acceptée par le Client lors de la signature du devis. Si une clause est déclarée
          nulle, les autres restent applicables. La Prestataire peut confier une partie de la
          prestation à un sous-traitant après en avoir informé le Client, et reste responsable
          envers lui de l’ensemble de la prestation. Si ce sous-traitant doit accéder à des données
          personnelles, l’accord écrit préalable du Client est requis.
        </p>
        <p>
          Les présentes CGV sont soumises au droit français. En cas de différend, les parties
          recherchent d’abord une solution amiable pendant trente jours à compter d’une réclamation
          écrite. À défaut, le litige est porté devant le tribunal compétent selon les règles de
          droit commun. Sauf disposition légale contraire, toute action en justice liée au contrat,
          qu’elle soit engagée par le Client ou par la Prestataire, se prescrit par un an à compter
          du jour où son auteur a connu ou aurait dû connaître les faits lui permettant de l’exercer
          (article 2254 du Code civil).
        </p>
      </>
    ),
  },
  {
    id: "article-22",
    num: "22",
    title: "Mission test",
    content: (
      <>
        <p>
          Une mission test est une prestation réalisée gratuitement, d’un commun accord, pour
          permettre à la Prestataire d’enrichir ses références. Le devis l’indique en cochant la
          case «&nbsp;mission test&nbsp;». Il mentionne le prix normal de la prestation, puis une
          remise de 100&nbsp;%.
        </p>
        <p>
          Les présentes CGV s’appliquent à la mission test, avec les adaptations suivantes&nbsp;:
        </p>
        <ul>
          <li>
            la mise en ligne, la remise des fichiers et la cession des droits prévues aux articles{" "}
            <a href="#article-7">7</a>, <a href="#article-11">11</a> et <a href="#article-13">13</a>{" "}
            interviennent à la fin de la recette, sans condition de paiement&nbsp;;
          </li>
          <li>
            aucun acompte n’est dû, et l’indemnité de dédit prévue à l’
            <Art n={19} /> ne s’applique pas&nbsp;;
          </li>
          <li>
            le plafond de responsabilité prévu à l’
            <Art n={17} /> est égal au prix de la prestation avant remise, tel qu’indiqué au
            devis&nbsp;;
          </li>
          <li>
            le Client accepte la présentation de la réalisation prévue à l’
            <Art n={14} />, sans case de refus au devis, et fournit un témoignage écrit à la fin de
            la recette.
          </li>
        </ul>
        <p>
          La gratuité ne porte que sur la prestation décrite au devis. Toute demande supplémentaire,
          ainsi que la maintenance après la garantie, est facturée aux conditions habituelles.
        </p>
      </>
    ),
  },
  {
    id: "annexe",
    num: "annexe",
    tocNum: "A",
    title: "Formulaire de rétractation",
    content: (
      <>
        <p>
          À remplir et renvoyer uniquement si vous souhaitez vous rétracter d’un contrat relevant de
          l’
          <Art n={4} />.
        </p>
        <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-field-line p-5 md:p-6">
          <p>
            À l’attention de {legal.name} EI (Flaura.dev), {legal.address} — {mail}&nbsp;:
          </p>
          <p>
            Je vous notifie par la présente ma rétractation du contrat portant sur la prestation de
            services ci-dessous&nbsp;:
          </p>
          <ul>
            <li>Prestation&nbsp;: ……………………………………</li>
            <li>Commandée le&nbsp;: ……………………………………</li>
            <li>Nom du client&nbsp;: ……………………………………</li>
            <li>Adresse du client&nbsp;: ……………………………………</li>
            <li>
              Signature du client (uniquement en cas de notification sur papier)&nbsp;:
              ……………………………………
            </li>
            <li>Date&nbsp;: ……………………………………</li>
          </ul>
        </div>
      </>
    ),
  },
];

export default function CgvPage() {
  return (
    <LegalPage
      path="/cgv"
      title="Conditions générales de vente"
      subtitle="Prestations de création et de refonte de sites, clients professionnels"
      meta={
        <>
          Version 1.0 · en vigueur au 1<sup>er</sup> janvier 2027
          <br />
          Dernière mise à jour&nbsp;: 3 novembre 2026
        </>
      }
      intro={
        <LegalFacts
          items={[
            { term: "Prestataire", value: `${legal.name}, ${legal.status}` },
            { term: "Nom commercial", value: "Flaura.dev" },
            { term: "Adresse", value: legal.address },
            { term: "SIREN", value: legal.siren },
            { term: "E-mail", value: mail },
            {
              term: "N° de TVA intracommunautaire",
              value: legal.vatNumber ?? <Todo>à compléter après l’option pour la TVA</Todo>,
            },
          ]}
        />
      }
      sections={sections}
    />
  );
}
