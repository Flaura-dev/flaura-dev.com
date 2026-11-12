import { projects } from "@/content/projects";

// 2 colonnes tant qu'il y a moins de 3 projets
const twoColumns = projects.length < 3;

export const SINGLE_PROJECT = projects.length === 1;

// grid-cols-1 : sinon la carte dépasse sur mobile
export const PROJECT_GRID = twoColumns
  ? "grid-cols-1 md:grid-cols-2"
  : "grid-cols-1 md:grid-cols-3";

export const PROJECT_SHOT_SIZES = twoColumns
  ? "(min-width: 1280px) 592px, (min-width: 900px) 50vw, 100vw"
  : "(min-width: 1280px) 380px, (min-width: 900px) 33vw, 100vw";
