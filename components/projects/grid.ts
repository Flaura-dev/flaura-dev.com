import { projects } from "@/content/projects";

/*
 * Deux colonnes tant qu'il n'y a que deux projets (pas de case vide à côté des cartes),
 * trois au-delà. Même largeur de carte sur l'accueil et sur /projets, quel que soit le filtre.
 */
const twoColumns = projects.length < 3;

/** Un seul projet : sa carte prend toute la ligne, capture à gauche et texte à droite. */
export const SINGLE_PROJECT = projects.length === 1;

// grid-cols-1 : sans colonne définie, la carte s'élargit à son contenu et dépasse sur petit écran.
export const PROJECT_GRID = twoColumns
  ? "grid-cols-1 md:grid-cols-2"
  : "grid-cols-1 md:grid-cols-3";

/** Largeur affichée des captures, pour que next/image charge la bonne taille. */
export const PROJECT_SHOT_SIZES = twoColumns
  ? "(min-width: 1280px) 592px, (min-width: 900px) 50vw, 100vw"
  : "(min-width: 1280px) 380px, (min-width: 900px) 33vw, 100vw";
