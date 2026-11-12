// ==== SITE ====
const indexable = true; // false = invisible pour Google
const url = "https://flaura-dev.com";
const temporaryUrl = "https://palegoldenrod-swallow-512762.hostingersite.com";

export const site = {
  name: "Flaura.dev",
  title: "Flaura.dev — Laura Fontaine, développeuse web freelance dans le Var",
  description:
    "Laura Fontaine, développeuse web freelance dans le Var : création et refonte de sites internet pour TPE et indépendants, dans le Var et à distance.",
  owner: { givenName: "Laura", familyName: "Fontaine" },
  url,
  servedUrl: indexable ? url : temporaryUrl,
  email: "hello@flaura-dev.com",
  address: { region: "Var" },
  linkedin: "https://www.linkedin.com/in/laura-fontaine-devweb83",
  github: "https://github.com/Flaura-dev",
  calendlyUrl: "https://calendly.com/flaura-devweb/cafe",
  callDuration: "30", // minutes
  petals: true,
  indexable,
  updatedAt: "2026-11-09", // date du sitemap, à changer à la main
  available: true, // mentions "disponible"
};

// ==== SECTIONS ====
export const sections = [
  { id: "accueil", num: "00", label: "Accueil" },
  { id: "apropos", num: "01", label: "À propos" },
  { id: "projets", num: "02", label: "Projets" },
  { id: "offres", num: "03", label: "Offres" },
  { id: "faq", num: "04", label: "FAQ" },
  { id: "contact", num: "05", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
