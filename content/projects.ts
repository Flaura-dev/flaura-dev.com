/** Filtres de la page /projets (en plus de « tous ») : slug pour l'URL, libellé affiché. */
export const projectFilters = [
  { slug: "creation", label: "création" },
  { slug: "refonte", label: "refonte" },
  { slug: "site-vitrine", label: "site vitrine" },
] as const;
export type ProjectFilter = (typeof projectFilters)[number]["slug"];

export type Project = {
  slug: string;
  title: string;
  /** Étiquette affichée sur la carte : le type de site, jamais la techno. */
  label: string;
  categories: ProjectFilter[];
  /** Visuel provisoire dessiné dans la maquette, en attendant les vraies images. */
  visual: "lea" | "pendu";
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
    title: "Site de Léa Grondin — Consultante Business",
    label: "site vitrine · refonte",
    categories: ["site-vitrine", "refonte"],
    visual: "lea",
    problem:
      "un one-page créé sur Lovable (IA), trop long pour comprendre vite ce que propose cette consultante business et on ne retrouvait pas la signature de Léa",
    solution:
      "un site vitrine multi-pages et une interface responsive en Next.js, structuré pour être bien référencé sur Google et les IA",
    result: "une offre plus claire et un site qui lui ressemble",
  },
  {
    slug: "pendu-de-la-faille",
    title: "Le Pendu de la Faille",
    label: "jeu en ligne · création",
    categories: ["creation"],
    visual: "pendu",
    url: "https://darkslateblue-bear-545715.hostingersite.com/",
    description:
      "Un jeu du pendu en ligne dans l’univers de League of Legends, en solo ou à plusieurs sur le même écran. Intégration de l’API Data Dragon de Riot Games pour charger les champions et leurs citations en direct, avec gestion des accents et des coupures réseau. Développé en JavaScript sans framework, avec une interface responsive pensée pour mobile, tablette et ordinateur.",
  },
];

/** Cartes affichées sur l'accueil ; les autres sont sur /projets. */
export const HOME_PROJECTS_COUNT = 3;

export const testimonial = {
  /** Paragraphes de la citation ; les passages entre astérisques ressortent en rose. */
  quote: [
    "Laura a refait entièrement mon site web. Et c’est un vrai plaisir d’avoir travaillé avec elle ! Elle a *tout de suite compris mon positionnement* et ses recommandations ont été super pertinentes pour clarifier mon offre. Côté technique, elle maîtrise son sujet : *le résultat est très pro* et je suis ravie de mon nouveau site.",
    "Mais ce que j’ai le plus apprécié, c’est sa posture : à l’écoute, rigoureuse dans le suivi, réactive sur les corrections. On se sent *entre de bonnes mains*. Si vous cherchez quelqu’un pour votre site, *foncez !*",
  ],
  author: "Léa Grondin — Consultante Business",
};
