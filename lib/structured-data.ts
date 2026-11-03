import { faq } from "@/content/faq";
import { type CardRow, maintenancePlans, planCardRows, plans, redesign } from "@/content/offers";
import { type Project, projects } from "@/content/projects";
import { site } from "@/content/site";
import type { Price } from "@/lib/price";

/*
 * Données structurées : un graphe schema.org par page, tiré des mêmes sources que le texte
 * affiché (content/). Les adresses partent de site.url, le domaine final, pour que les
 * identifiants ne changent pas au lancement.
 */

const url = (path = "/") => `${site.url}${path}`;

const ids = {
  website: url("/#website"),
  person: url("/#laura-fontaine"),
  business: url("/#business"),
  catalog: url("/#offres"),
  home: url("/#webpage"),
  faq: url("/#faq"),
  projectsPage: url("/projets#webpage"),
  projectsList: url("/projets#liste"),
  breadcrumb: url("/projets#fil-ariane"),
};

/** Logo carré servi par app/icon.png. */
const logo = url("/icon.png");

const website = {
  "@type": "WebSite",
  "@id": ids.website,
  url: url(),
  name: site.name,
  alternateName: "Flaura",
  inLanguage: "fr-FR",
  publisher: { "@id": ids.business },
};

const person = {
  "@type": "Person",
  "@id": ids.person,
  name: `${site.owner.givenName} ${site.owner.familyName}`,
  givenName: site.owner.givenName,
  familyName: site.owner.familyName,
  jobTitle: "Développeuse web freelance",
  url: url(),
  worksFor: { "@id": ids.business },
  sameAs: [site.linkedin, site.github],
  knowsAbout: ["Création de site internet", "Refonte de site internet", "Développement web"],
  knowsLanguage: "fr",
};

function business(withCatalog: boolean) {
  return {
    "@type": "ProfessionalService",
    "@id": ids.business,
    name: site.name,
    url: url(),
    description: site.description,
    logo: { "@type": "ImageObject", url: logo, width: 192, height: 192 },
    image: logo,
    email: site.email,
    founder: { "@id": ids.person },
    // Département seulement : travail à distance, pas de local ouvert au public.
    address: {
      "@type": "PostalAddress",
      addressRegion: site.address.region,
      addressCountry: "FR",
    },
    // Clients francophones du monde entier, à distance : pas de zone servie à délimiter.
    knowsLanguage: "fr",
    ...(withCatalog && { hasOfferCatalog: { "@id": ids.catalog } }),
  };
}

/* --- Accueil --- */

/** Prix HT : « à partir de » (minPrice) ou fixe (price), par mois pour la maintenance. */
function priceSpecification(price: Price, note?: string) {
  const specification: Record<string, unknown> = {
    "@type": price.unit ? "UnitPriceSpecification" : "PriceSpecification",
    priceCurrency: "EUR",
    valueAddedTaxIncluded: false,
  };
  if (price.from) specification.minPrice = price.amount;
  else specification.price = price.amount;
  if (price.unit === "mois") {
    specification.unitText = "mois";
    specification.unitCode = "MON";
  }
  if (note) specification.description = note;
  return specification;
}

type OfferData = {
  id: string;
  /** Ancre de la page où l'offre est affichée (par défaut : id). */
  anchor?: string;
  name: string;
  description: string;
  price: Price;
  /** Précision sur le prix, comme sur la carte. */
  priceNote?: string;
  serviceType: string;
};

function offer({ id, anchor = id, name, description, price, priceNote, serviceType }: OfferData) {
  const result: Record<string, unknown> = {
    "@type": "Offer",
    "@id": url(`/#${id}`),
    url: url(`/#${anchor}`),
    name,
    description,
    priceSpecification: priceSpecification(price, priceNote),
    seller: { "@id": ids.business },
    itemOffered: {
      "@type": "Service",
      name: `${serviceType} : ${name}`,
      serviceType,
      provider: { "@id": ids.business },
    },
  };
  // Prix fixe : Google le veut aussi directement sur l'offre.
  if (!price.from) {
    result.price = price.amount;
    result.priceCurrency = "EUR";
  }
  return result;
}

/** « Pages : 1 page. Contenu : … » : les lignes remplies d'une carte, en phrases. */
function describeRows(rows: CardRow[]) {
  return rows
    .filter(({ value }) => value)
    .map(({ label, value }) => `${label} : ${value}.`)
    .join(" ");
}

const offerCatalog = {
  "@type": "OfferCatalog",
  "@id": ids.catalog,
  name: "Offres et tarifs Flaura.dev",
  url: ids.catalog,
  itemListElement: [
    ...plans.map((plan) =>
      offer({
        id: `offre-${plan.id}`,
        name: plan.name,
        description: `${plan.pitch} ${describeRows(planCardRows(plan))}`,
        price: plan.price,
        serviceType: "Création de site internet",
      }),
    ),
    offer({
      id: redesign.id,
      name: redesign.name,
      description: `${redesign.pitch} ${describeRows(redesign.rows)}`,
      price: redesign.price,
      priceNote: "En plus de la formule choisie",
      serviceType: "Refonte de site internet",
    }),
    ...maintenancePlans.map((formula) =>
      offer({
        id: `maintenance-${formula.id}`,
        anchor: "maintenance",
        name: `Maintenance ${formula.name}`,
        description: formula.text,
        price: formula.price,
        serviceType: "Maintenance de site internet",
      }),
    ),
  ],
};

/** Texte d'une réponse de la FAQ (schema.org autorise les balises <p>, <ul> et <li>). */
function answerText({ a, list, after }: (typeof faq)[number]) {
  if (!list) return a;
  const items = list.map((item) => `<li>${item}</li>`).join("");
  const end = after ? `<p>${after}</p>` : "";
  return `<p>${a}</p><ul>${items}</ul>${end}`;
}

const faqPage = {
  "@type": "FAQPage",
  "@id": ids.faq,
  isPartOf: { "@id": ids.home },
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: answerText(item) },
  })),
};

const homePage = {
  "@type": "WebPage",
  "@id": ids.home,
  url: url(),
  name: site.title,
  description: site.description,
  inLanguage: "fr-FR",
  isPartOf: { "@id": ids.website },
  about: { "@id": ids.business },
};

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [website, person, business(true), homePage, offerCatalog, faqPage],
};

/* --- /projets --- */

/** Les sites encore sur un domaine temporaire n'apparaissent pas dans le balisage. */
function isFinalUrl(href?: string): href is string {
  return !!href && !new URL(href).hostname.endsWith(".hostingersite.com");
}

/** « Problème : … Solution : … Résultat : … », comme sur la carte. */
function describeProject({ description, problem, solution, result }: Project) {
  if (description) return description;
  return [
    ["Problème", problem],
    ["Solution", solution],
    ["Résultat", result],
  ]
    .filter(([, text]) => text)
    .map(([label, text]) => `${label} : ${text}.`)
    .join(" ");
}

function projectItem(project: Project) {
  const anchor = url(`/projets#${project.slug}`);
  return {
    "@type": "CreativeWork",
    "@id": anchor,
    name: project.title,
    url: isFinalUrl(project.url) ? project.url : anchor,
    description: describeProject(project),
    keywords: project.label.split(" · "),
    inLanguage: "fr-FR",
    creator: { "@id": ids.person },
  };
}

export const projectsStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    website,
    person,
    business(false),
    {
      "@type": "CollectionPage",
      "@id": ids.projectsPage,
      url: url("/projets"),
      name: "Projets",
      inLanguage: "fr-FR",
      isPartOf: { "@id": ids.website },
      breadcrumb: { "@id": ids.breadcrumb },
      mainEntity: { "@id": ids.projectsList },
    },
    {
      "@type": "BreadcrumbList",
      "@id": ids.breadcrumb,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: url() },
        { "@type": "ListItem", position: 2, name: "Projets", item: url("/projets") },
      ],
    },
    {
      "@type": "ItemList",
      "@id": ids.projectsList,
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: projectItem(project),
      })),
    },
  ],
};
