/** Filtres de la page /projets (en plus de « tous ») : slug pour l'URL, libellé affiché. */
export const projectFilters = [
  { slug: "creation", label: "création" },
  { slug: "refonte", label: "refonte" },
  { slug: "site-vitrine", label: "site vitrine" },
  { slug: "application-web", label: "application web" },
] as const;
export type ProjectFilter = (typeof projectFilters)[number]["slug"];

export type Project = {
  slug: string;
  title: string;
  /** Étiquette affichée sur la carte : le type de site, jamais la techno. */
  label: string;
  categories: ProjectFilter[];
  /** Visuel provisoire dessiné dans la maquette, en attendant les vraies images. */
  visual: "lea" | "pendu" | "ailleurs";
  /** Soit une description libre, soit le trio problème / solution / résultat. */
  description?: string;
  problem?: string;
  solution?: string;
  result?: string;
  /** Lien vers le site en ligne, quand il existe. */
  url?: string;
};

export const projects: Project[] = [
  {
    slug: "lea-grondin",
    title: "Site de Léa Grondin",
    label: "site vitrine · refonte",
    categories: ["site-vitrine", "refonte"],
    visual: "lea",
    problem: "[à compléter]",
    solution: "refonte complète, du design à l’hébergement",
    result: "[après mise en ligne]",
  },
  {
    slug: "pendu-de-la-faille",
    title: "Le Pendu de la Faille",
    label: "jeu en ligne · création",
    categories: ["creation"],
    visual: "pendu",
    description:
      "Un jeu du pendu dans l’univers de League of Legends, en solo ou à plusieurs. [Défi technique et résultat à détailler]",
  },
  {
    slug: "ailleurs",
    title: "Ailleurs",
    label: "application web · création",
    categories: ["application-web", "creation"],
    visual: "ailleurs",
    description:
      "Mon carnet de voyage perso, construit autour d’un globe 3D. [Défi technique et résultat à détailler]",
  },
];

/** Cartes affichées sur l'accueil ; les autres sont sur /projets. */
export const HOME_PROJECTS_COUNT = 3;

export const testimonial = {
  quote: "[Le témoignage de Léa arrivera ici, une fois son nouveau site en ligne.]",
  author: "Léa Grondin — consultante",
};
