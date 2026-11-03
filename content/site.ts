export const site = {
  name: "Flaura.dev",
  /** Titre et description de l'accueil (balises meta, h1 et données structurées). */
  title: "Flaura.dev — Laura Fontaine, développeuse web freelance dans le Var",
  description:
    "Laura Fontaine, développeuse web freelance dans le Var : création et refonte de sites internet pour TPE et indépendants, dans le Var et à distance.",
  /** Nom complet de Laura, tel qu'il apparaît dans les données structurées. */
  owner: { givenName: "Laura", familyName: "Fontaine" },
  url: "https://flaura-dev.com",
  /**
   * Adresse où le site est servi : base des liens absolus des métadonnées (image d'aperçu, canonical).
   * Domaine temporaire tant que flaura-dev.com affiche la page d'attente : reprend `url` au lancement.
   */
  servedUrl: "https://palegoldenrod-swallow-512762.hostingersite.com",
  email: "hello@flaura-dev.com",
  /**
   * Département de l'entreprise (FAQ, données structurées). Pas de commune : seules les mentions
   * légales donnent l'adresse.
   */
  address: { region: "Var" },
  linkedin: "https://www.linkedin.com/in/laura-fontaine-devweb83",
  github: "https://github.com/Flaura-dev",
  /** Lien de l'événement Calendly du café virtuel. */
  calendlyUrl: "https://calendly.com/flaura-devweb/cafe",
  /** Durée du café virtuel (l'appel découverte), en minutes. */
  callDuration: "30",
  /** Pétales de sakura qui tombent en arrière-plan. Passe à false pour les retirer du site. */
  petals: true,
  /**
   * Indexation par les moteurs de recherche. false tant que le site n'est pas lancé
   * (placeholders, mentions légales, formulaire) : passe à true le jour du lancement.
   */
  indexable: false,
  /** Dernière mise à jour du contenu (lastModified du sitemap) : à changer à la main, jamais new Date(). */
  updatedAt: "2026-11-03",
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
