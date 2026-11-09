import Image, { type StaticImageData } from "next/image";
import leaAfter from "@/assets/projects/lea-apres.webp";
import leaBefore from "@/assets/projects/lea-avant.webp";
import type { Project } from "@/content/projects";
import { BeforeAfter } from "./BeforeAfter";
import { BrowserFrame } from "./BrowserFrame";
import { PROJECT_SHOT_SIZES as SIZES } from "./grid";

/*
 * Captures faites en 1440 × 900 (double résolution), toutes au même format pour que
 * l'avant et l'après se superposent au pixel près. Seul le haut de page est visible.
 * Sans comparateur, la capture couvre toute la page et défile (ScrollingShot).
 */

type ShotProps = {
  src: StaticImageData;
  alt: string;
  eager: boolean;
  sizes: string;
  /** Priorité réseau haute : seulement pour le plus grand élément affiché (LCP). */
  priority?: boolean;
};

function Shot({ src, alt, eager, sizes, priority = true }: ShotProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading={eager ? "eager" : undefined}
      fetchPriority={eager && priority ? "high" : undefined}
      className="object-cover object-top"
    />
  );
}

type ProjectVisualProps = {
  project: Project;
  eager: boolean;
  /** Largeur affichée des captures : celle des cartes par défaut. */
  sizes?: string;
};

export function ProjectVisual({ project, eager, sizes = SIZES }: ProjectVisualProps) {
  switch (project.visual) {
    case "lea":
      return (
        <BrowserFrame interactive="drag">
          <BeforeAfter
            before={
              <Shot
                src={leaBefore}
                eager={eager}
                sizes={sizes}
                alt="Ancien site de Léa Grondin : une seule page, un grand titre centré sur fond blanc, sans photo"
              />
            }
            after={
              <Shot
                src={leaAfter}
                eager={eager}
                priority={false}
                sizes={sizes}
                alt="Nouveau site de Léa Grondin : un menu, son titre de bras droit pédagogique des formateurs et sa photo devant son ordinateur"
              />
            }
            label="Comparer l’ancien et le nouveau site de Léa Grondin"
          />
        </BrowserFrame>
      );
  }
}
