// ==== FILTRES ====
export const projectFilters = [
  { slug: "refonte", label: "refonte" },
  { slug: "site-vitrine", label: "site vitrine" },
] as const;
export type ProjectFilter = (typeof projectFilters)[number]["slug"];

// ==== PROJETS ====
export type Project = {
  slug: string;
  title: string;
  label: string;
  categories: ProjectFilter[];
  visual: "lea";
  description?: string; // ou problem / solution / result
  problem?: string;
  solution?: string;
  result?: string;
  url?: string;
  year: number;
  caseStudy: {
    facts: [term: string, value: string][];
    sections: { title: string; paragraphs: string[] }[];
    note?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "lea-grondin",
    title: "Site de Léa Grondin — Consultante Business",
    label: "site vitrine · refonte",
    categories: ["site-vitrine", "refonte"],
    visual: "lea",
    problem:
      "un one-page créé sur Lovable (IA), trop long pour comprendre vite ce que propose cette consultante business, et où l’on ne retrouvait pas la signature de Léa",
    solution:
      "un site vitrine de plusieurs pages, rapide et agréable sur téléphone comme sur ordinateur, structuré pour être bien référencé sur Google et les IA",
    result: "une offre plus claire et un site qui lui ressemble",
    url: "https://leagrondin.fr/",
    year: 2026,
    caseStudy: {
      facts: [
        ["Cliente", "Léa Grondin, consultante business"],
        ["Projet", "refonte d’un site d’une seule page"],
        ["Pages", "5 après la refonte"],
        ["Propriété", "le site appartient à Léa, sans abonnement"],
      ],
      sections: [
        {
          title: "Le point de départ",
          paragraphs: [
            "Léa Grondin est consultante business, le bras droit pédagogique des formateurs, écoles et coachs. Son site tenait sur une seule page, générée avec Lovable, un outil d’IA. Elle était si longue qu’on ne comprenait pas vite ce que Léa propose, et on n’y retrouvait pas sa signature.",
          ],
        },
        {
          title: "Ce que j’ai fait",
          paragraphs: [
            "J’ai commencé par relever tout le contenu de son site, mot pour mot, pour ne rien perdre. Tout ce qui est en ligne vient d’elle : ses textes, ses clients, ses témoignages, sa photo. Aucun chiffre ni logo inventé.",
            "J’ai ensuite conçu et développé un site vitrine de cinq pages : accueil, offre, à propos, blog et contact. Il s’affiche aussi bien sur téléphone que sur ordinateur, et chaque page a son titre et sa description pour Google. Deux séries de retours, fin août puis début octobre, ont affiné les contenus.",
            "Ses pages légales reprennent les textes qu’elle m’a fournis : je ne rédige pas de documents juridiques.",
            "Léa possède son site : ce sont de simples fichiers, qu’elle peut héberger où elle veut, sans abonnement à une plateforme.",
          ],
        },
        {
          title: "Ce que ça a changé",
          paragraphs: [
            "Son offre est plus claire, et son site lui ressemble. Elle en parle mieux que moi :",
          ],
        },
      ],
    },
  },
];

// ==== PAGE PROJETS ====
export const projectsPage = {
  intro:
    "Je suis Laura Fontaine, et voici les sites que j’ai conçus et développés sous le nom Flaura.dev. Pour chacun : le point de départ, ce que j’ai fait et ce que ça a changé.",
  description:
    "Les projets de Flaura.dev en détail : le point de départ, ce que j’ai fait et ce que ça a changé, avec le témoignage de la cliente.",
  listTitle: "Sites vitrines, refontes et créations web",
};

export const HOME_PROJECTS_COUNT = 3; // cartes sur l'accueil

// ==== TEMOIGNAGE ====
export const testimonial = {
  projectSlug: "lea-grondin",
  // *texte* = en rose
  quote: [
    "Laura a refait entièrement mon site web. Et c’est un vrai plaisir d’avoir travaillé avec elle ! Elle a *tout de suite compris mon positionnement* et ses recommandations ont été super pertinentes pour clarifier mon offre. Côté technique, elle maîtrise son sujet : *le résultat est très pro* et je suis ravie de mon nouveau site.",
    "Mais ce que j’ai le plus apprécié, c’est sa posture : à l’écoute, rigoureuse dans le suivi, réactive sur les corrections. On se sent *entre de bonnes mains*. Si vous cherchez quelqu’un pour votre site, *foncez !*",
  ],
  author: "Léa Grondin — Consultante Business",
};
