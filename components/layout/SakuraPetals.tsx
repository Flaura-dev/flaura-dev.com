import type { CSSProperties } from "react";

const PETAL_COUNT = 16;

// aléatoire mais toujours pareil d'un rendu à l'autre
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
    // délai négatif : déjà répartis au chargement
    "--delay": `${round(-between(0, fall))}s`,
    "--sway": `${round(between(3.5, 6.5))}s`,
    "--sway-x": `${round(between(20, 60))}px`,
    "--flutter": `${round(between(2.5, 5))}s`,
  } as CSSProperties;
});

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
