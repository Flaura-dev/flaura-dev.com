import type { CSSProperties } from "react";

const PETAL_COUNT = 16;

// Suite pseudo-aléatoire toujours identique, pour que les pétales soient les mêmes à chaque
// rendu : chaque appel donne un nombre entre 0 et 1.
let seed = 2026;
function random() {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
}

const between = (min: number, max: number) => min + random() * (max - min);
const round = (value: number) => Math.round(value * 100) / 100;

const petals = Array.from({ length: PETAL_COUNT }, (_, index) => {
  const fall = between(18, 32);
  return {
    "--left": `${round((index + between(0.1, 0.9)) * (100 / PETAL_COUNT))}%`,
    "--size": `${round(between(12, 22))}px`,
    "--opacity": round(between(0.3, 0.6)),
    "--fall": `${round(fall)}s`,
    // Délais négatifs : au chargement, les pétales sont déjà répartis sur la hauteur.
    "--delay": `${round(-between(0, fall))}s`,
    "--sway": `${round(between(3.5, 6.5))}s`,
    "--sway-x": `${round(between(20, 60))}px`,
    "--flutter": `${round(between(2.5, 5))}s`,
  } as CSSProperties;
});

/** Pétales décoratifs en arrière-plan, masqués des lecteurs d'écran (voir .petals dans globals.css). */
export function SakuraPetals() {
  return (
    <div aria-hidden="true" className="petals">
      {petals.map((style, index) => (
        <span key={index} className="petal" style={style}>
          <span>
            <svg viewBox="0 0 20 24">
              <path d="M10 24C3 18 0 11 2.5 5.5 4 2 6.5.5 8.5 1.5L10 4l1.5-2.5C13.5.5 16 2 17.5 5.5 20 11 17 18 10 24Z" />
            </svg>
          </span>
        </span>
      ))}
    </div>
  );
}
