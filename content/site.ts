export const site = {
  name: "Flaura.dev",
  url: "https://flaura-dev.com",
  email: "hello@flaura-dev.com",
  linkedin: "https://www.linkedin.com/in/laura-fontaine-devweb83",
  github: "https://github.com/Flaura-98",
  /** Lien de l'événement Calendly (https://calendly.com/…). Tant qu'il est vide, rien n'est chargé. */
  calendlyUrl: null as string | null,
  /** Durée de l'appel découverte, en minutes. */
  callDuration: "30",
  /** Pétales de sakura qui tombent en arrière-plan. Passe à false pour les retirer du site. */
  petals: true,
  /** Passe à false pour masquer les mentions « disponible ». */
  available: true,
};

/** Sections de la page d'accueil : navigation, menu mobile et fil conducteur. */
export const sections = [
  { id: "accueil", num: "00", label: "Accueil" },
  { id: "apropos", num: "01", label: "À propos" },
  { id: "projets", num: "02", label: "Projets" },
  { id: "offres", num: "03", label: "Offres" },
  { id: "faq", num: "04", label: "FAQ" },
  { id: "contact", num: "05", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
