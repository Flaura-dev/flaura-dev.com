import { faq } from "@/content/faq";
import { type CardRow, maintenancePlans, planCardRows, plans, redesign } from "@/content/offers";
import { site } from "@/content/site";
import type { Price } from "@/lib/price";

/*
 * Données structurées de l'accueil : un seul graphe schema.org, tiré des mêmes sources que
 * le texte affiché (content/offers.ts, content/faq.ts, content/site.ts).
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

/** Prix HT : « à partir de » (minPrice) ou fixe (price), par mois pour la maintenance. */
function priceSpecification(price: Price) {
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
  return specification;
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
  const result: Record<string, unknown> = {
    "@type": "Offer",
    "@id": `${site.url}/#${id}`,
    url: `${site.url}/#${anchor}`,
    name,
    description,
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
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: answerText(item) },
  })),
};

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [business, offerCatalog, faqPage],
};
