import { faq } from "@/content/faq";
import {
  agencies,
  type CardRow,
  extras,
  maintenancePlans,
  planCardRows,
  plans,
  redesign,
} from "@/content/offers";
import { site } from "@/content/site";
import type { Price } from "@/lib/price";

/*
 * Données structurées de l'accueil : un seul graphe schema.org (recommandation de l'audit SEO),
 * tiré des mêmes sources que le texte affiché (content/offers.ts, content/faq.ts, content/site.ts),
 * pour que le balisage corresponde toujours exactement à la page.
 */

const businessId = `${site.url}/#business`;
const areaServed = [
  { "@type": "AdministrativeArea", name: site.address.region },
  { "@type": "Country", name: "France" },
];

const business = {
  "@type": "ProfessionalService",
  "@id": businessId,
  name: site.name,
  url: `${site.url}/`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: "FR",
  },
  areaServed,
  hasOfferCatalog: { "@id": `${site.url}/#offres` },
};

const unitCodes = { mois: "MON", jour: "DAY" } as const;

function priceSpecification({ amount, from, unit }: Price) {
  return {
    "@type": unit ? "UnitPriceSpecification" : "PriceSpecification",
    ...(from ? { minPrice: amount } : { price: amount }),
    priceCurrency: "EUR",
    valueAddedTaxIncluded: false,
    ...(unit && { unitText: unit }),
    ...(unit && unit !== "page" && { unitCode: unitCodes[unit] }),
  };
}

type OfferData = {
  id: string;
  /** Ancre de la page où l'offre est affichée (par défaut : id). */
  anchor?: string;
  name: string;
  description: string;
  price: Price;
  serviceType: string;
};

function offer({ id, anchor = id, name, description, price, serviceType }: OfferData) {
  return {
    "@type": "Offer",
    "@id": `${site.url}/#${id}`,
    url: `${site.url}/#${anchor}`,
    name,
    description,
    ...(!price.from && { price: price.amount, priceCurrency: "EUR" }),
    priceSpecification: priceSpecification(price),
    seller: { "@id": businessId },
    itemOffered: {
      "@type": "Service",
      name: `${serviceType} : ${name}`,
      serviceType,
      provider: { "@id": businessId },
      areaServed,
    },
  };
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
  "@id": `${site.url}/#offres`,
  name: "Offres et tarifs Flaura.dev",
  url: `${site.url}/#offres`,
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
    ...extras.map(({ id, name, price, note }) =>
      offer({
        id: `option-${id}`,
        anchor: "options",
        name,
        description: `Option à la carte : ${name}.${note ? ` ${note}` : ""}`,
        price,
        serviceType: name,
      }),
    ),
    offer({
      id: agencies.id,
      name: agencies.title,
      description: `${agencies.text} ${agencies.skills.join(", ")}.`,
      price: agencies.price,
      serviceType: "Développement web en sous-traitance pour agences",
    }),
  ],
};

const faqPage = {
  "@type": "FAQPage",
  mainEntity: faq.map(({ q, a, list, after }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      // Balises <p>, <ul>, <li> autorisées par schema.org dans le texte d'une réponse.
      text: list
        ? `<p>${a}</p><ul>${list.map((item) => `<li>${item}</li>`).join("")}</ul>${after ? `<p>${after}</p>` : ""}`
        : a,
    },
  })),
};

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [business, offerCatalog, faqPage],
};
