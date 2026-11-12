import Image, { type StaticImageData } from "next/image";
import leaAfter from "@/assets/projects/lea-apres.webp";
import leaBefore from "@/assets/projects/lea-avant.webp";
import type { Project } from "@/content/projects";
import { BeforeAfter } from "./BeforeAfter";
import { BrowserFrame } from "./BrowserFrame";
import { PROJECT_SHOT_SIZES as SIZES } from "./grid";

// captures en 1440x900 : l'avant et l'après se superposent
type ShotProps = {
  src: StaticImageData;
  alt: string;
  eager: boolean;
  sizes: string;
  priority?: boolean; // LCP seulement
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
