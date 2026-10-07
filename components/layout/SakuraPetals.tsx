import type { CSSProperties } from "react";

/** Générateur pseudo-aléatoire à graine fixe : mêmes pétales côté serveur et navigateur. */
function seededRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PETAL_COUNT = 16;

const random = seededRandom(2026);
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

/**
 * Pétales de sakura qui tombent doucement derrière le contenu. Purement décoratifs :
 * masqués des lecteurs d'écran, absents si l'animation est réduite ou si le visiteur
 * les coupe depuis le footer (voir .petals dans globals.css).
 */
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
