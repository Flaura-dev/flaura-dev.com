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

export const contactMessages = {
  sent: "Merci ! Je reviens vers toi sous 48 h.",
  invalid: "Vérifie les champs signalés, puis renvoie ton message.",
  limited: `Tu as déjà envoyé plusieurs messages. Réessaie un peu plus tard, ou écris-moi directement à ${site.email}.`,
  failed: `L’envoi n’a pas abouti. Écris-moi directement à ${site.email}, je te réponds aussi vite.`,
};
