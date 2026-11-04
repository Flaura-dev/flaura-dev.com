import { site } from "@/content/site";

// Formulaire de contact : options proposées et messages affichés au visiteur.
// La validation côté serveur (app/actions/contact.ts) n'accepte que ces types de projet.

export const projectTypes = [
  { value: "site-vitrine", label: "Site vitrine" },
  { value: "refonte", label: "Refonte" },
  { value: "application-web", label: "Application web" },
  { value: "je-ne-sais-pas", label: "Je ne sais pas encore" },
] as const;

export type ProjectType = (typeof projectTypes)[number]["value"];

/** Nom du champ piège, invisible pour les visiteurs : un robot qui le remplit est ignoré. */
export const honeypotField = "champ_cache";

/**
 * Indications affichées dès qu'on quitte un champ mal rempli, avant l'envoi : mêmes phrases
 * que la validation du serveur (app/actions/contact.ts).
 */
export const fieldHints = {
  name: "Indique ton nom et prénom.",
  email: "Indique une adresse e-mail valide.",
  message: "Ton message doit faire au moins 10 caractères.",
};

/** Délai de réponse, annoncé au-dessus du formulaire. */
export const responseNote = "Je te réponds sous 48 h.";

export const contactMessages = {
  sent: "Merci ! Je reviens vers toi sous 48 h.",
  invalid: "Vérifie les champs signalés, puis renvoie ton message.",
  limited: `Tu as déjà envoyé plusieurs messages. Réessaie un peu plus tard, ou écris-moi directement à ${site.email}.`,
  failed: `L’envoi n’a pas abouti. Écris-moi directement à ${site.email}, je te réponds aussi vite.`,
};
