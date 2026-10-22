import { projects } from "@/content/projects";

/*
 * Deux colonnes tant qu'il n'y a que deux projets (pas de case vide à côté des cartes),
 * trois au-delà. Même largeur de carte sur l'accueil et sur /projets, quel que soit le filtre.
 */
const twoColumns = projects.length < 3;

export const PROJECT_GRID = twoColumns ? "md:grid-cols-2" : "md:grid-cols-3";

/** Largeur affichée des captures, pour que next/image charge la bonne taille. */
export const PROJECT_SHOT_SIZES = twoColumns
  ? "(min-width: 1280px) 592px, (min-width: 900px) 50vw, 100vw"
  : "(min-width: 1280px) 380px, (min-width: 900px) 33vw, 100vw";
