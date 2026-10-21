import type { Price } from "@/lib/price";

// Source unique des tarifs : les cartes d'offres, la FAQ et les données structurées en sont tirées.
// Tous les montants sont en euros hors taxes ; le TTC est calculé à l'affichage (lib/price.ts).
// Les espaces insécables ( ) évitent qu'un « ? » ou un « € » se retrouve seul en début de ligne.

/**
 * Tarif de lancement sur les trois formules. active: false remet les prix normaux partout
 * (cartes, FAQ, données structurées).
 */
export const launch = {
  active: true,
  /** Remise en %. */
  discount: 20,
  /** Fin de l'offre, au format AAAA-MM-JJ : à fournir. Tant qu'elle manque, un [crochet] s'affiche. */
  endsOn: null as string | null,
};

/** Prix affiché aujourd'hui : le prix de lancement tant que l'offre court. */
export function currentPrice(amount: number) {
  return launch.active ? Math.round(amount * (100 - launch.discount)) / 100 : amount;
}

/** Lignes comparées d'une formule à l'autre, dans l'ordre d'affichage. */
export const planRows = [
  { key: "pages", label: "Pages" },
  { key: "content", label: "Contenu" },
  { key: "design", label: "Maquette" },
  { key: "blog", label: "Blog" },
  { key: "custom", label: "Sur mesure" },
  { key: "gift", label: "Cadeau" },
] as const;

/** Une ligne d'une carte : null = non inclus. */
export type CardRow = { label: string; value: string | null };

type Plan = {
  id: string;
  name: string;
  pitch: string;
  /** Prix normal HT (hors lancement). */
  price: number;
  recommended?: boolean;
  /** null : non inclus dans cette formule. */
  rows: Record<(typeof planRows)[number]["key"], string | null>;
};

export const plans: Plan[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    pitch:
      "Un site vitrine d’une page pour présenter ton activité clairement et donner envie de te contacter.",
    price: 900,
    rows: {
      pages: "1 page",
      content: "Accueil, prestations, contact",
      design: "1 piste graphique",
      blog: null,
      custom: null,
      gift: null,
    },
  },
  {
    id: "visibilite",
    name: "Visibilité",
    pitch:
      "Un site vitrine avec assez de pages pour que Google comprenne ce que tu fais, et que tes clients aient envie de te choisir.",
    price: 1500,
    recommended: true,
    rows: {
      pages: "Jusqu’à 5 pages",
      content: "Ex. : accueil, prestations, équipe, réalisations, contact",
      design: "1 piste graphique + moodboard",
      blog: null,
      custom: null,
      gift: "1 mois de maintenance Sérénité",
    },
  },
  {
    id: "pro",
    name: "Pro",
    pitch:
      "Une page par prestation pour être trouvé sur chacune, et un blog pour publier toi-même.",
    price: 2800,
    rows: {
      pages: "Jusqu’à 10 pages",
      content: "Une page par prestation",
      design: "2 pistes graphiques",
      blog: "Blog que tu gères toi-même",
      custom: "1 fonctionnalité",
      gift: "3 mois de maintenance Sérénité",
    },
  },
];

/** Inclus dans les trois formules (repris des engagements du site et de la FAQ). */
export const includedEverywhere = [
  "Design sur mesure",
  "Adapté au mobile",
  "Bases SEO / GEO",
  "Mise en ligne",
  "Site à ton nom",
];

/** Module refonte : 4e carte, à droite des formules. Hors tarif de lancement. */
export const redesign = {
  id: "refonte",
  name: "Refonte",
  pitch:
    "Tu as déjà un site ? Ajoute ce module à ta formule : je garde ce qui marche, y compris ton référencement.",
  rows: [
    { label: "Audit", value: "Ce qui coince sur ton site actuel" },
    { label: "Migration", value: "Tes contenus repris sur le nouveau site" },
    {
      label: "Redirections",
      value: "Tes anciennes adresses, pour que Google ne perde pas ta trace",
    },
  ] satisfies CardRow[],
  price: { amount: 400 } satisfies Price,
};

export const customProject = {
  id: "sur-mesure",
  name: "Sur mesure",
  text: "Plus de 10 pages, plusieurs fonctionnalités, des besoins bien à toi : quand ton projet sort du cadre des trois formules, on le cadre ensemble et tu reçois un devis détaillé.",
  price: { amount: 3500, from: true } satisfies Price,
};

export const maintenancePlans = [
  {
    id: "serenite",
    name: "Sérénité",
    text: "Mises à jour, sauvegardes et correction des bugs.",
    price: { amount: 49, unit: "mois" } satisfies Price,
  },
  {
    id: "evolution",
    name: "Évolution",
    text: "Tout Sérénité, plus 1 h de petites modifications chaque mois.",
    price: { amount: 99, unit: "mois" } satisfies Price,
  },
];

/** note : précision affichée sous l'option, en petit. */
export const extras: { label: string; price: Price; note?: string }[] = [
  { label: "Page supplémentaire", price: { amount: 150, unit: "page" } },
  { label: "Fonctionnalité sur mesure", price: { amount: 300, upTo: 800 } },
  { label: "Optimisation SEO / GEO", price: { amount: 150, unit: "page" } },
  {
    label: "Mini kit graphique",
    price: { amount: 450 },
    note: "Palette, typographies et déclinaisons simples. Le logo est à fournir de ton côté.",
  },
];

/** Renfort freelance pour les agences de communication et studios (sous-traitance). */
export const agencies = {
  id: "agences",
  title: "Renfort freelance pour les agences de communication",
  text: "Un pic de charge, un projet web à sous-traiter ? Je rejoins ton équipe le temps d’une mission.",
  skills: [
    "Intégration de tes maquettes",
    "Sites vitrines et applications web",
    "Animations et interactions",
    "Performance, SEO technique et mise en ligne",
  ],
  background:
    "Ancienne cheffe de projets en bureau d’études : brief, planning et points d’étape, je m’adapte à ton organisation.",
  price: { amount: 350, from: true, unit: "jour" } satisfies Price,
};
