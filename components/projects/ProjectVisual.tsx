import Image, { type StaticImageData } from "next/image";
import leaAfter from "@/assets/projects/lea-apres.webp";
import leaBefore from "@/assets/projects/lea-avant.webp";
import pendu from "@/assets/projects/pendu-pleine-page.webp";
import type { Project } from "@/content/projects";
import { BeforeAfter } from "./BeforeAfter";
import { BrowserFrame } from "./BrowserFrame";
import { PROJECT_SHOT_SIZES as SIZES } from "./grid";
import { ScrollingShot } from "./ScrollingShot";

/*
 * Captures faites en 1440 × 900 (double résolution), toutes au même format pour que
 * l'avant et l'après se superposent au pixel près. Seul le haut de page est visible.
 * Sans comparateur, la capture couvre toute la page et défile (ScrollingShot).
 */

function Shot({ src, alt }: { src: StaticImageData; alt: string }) {
  return <Image src={src} alt={alt} fill sizes={SIZES} className="object-cover object-top" />;
}

export function ProjectVisual({ project }: { project: Project }) {
  switch (project.visual) {
    case "lea":
      return (
        <BrowserFrame interactive="drag">
          <BeforeAfter
            before={<Shot src={leaBefore} alt="" />}
            after={<Shot src={leaAfter} alt="" />}
            label="Comparer l’ancien et le nouveau site de Léa Grondin"
          />
        </BrowserFrame>
      );
    case "pendu": {
      const shot = (
        <ScrollingShot
          src={pendu}
          alt="Page d’accueil du jeu Le Pendu de la Faille"
          sizes={SIZES}
        />
      );
      if (!project.url) return <BrowserFrame>{shot}</BrowserFrame>;
      // La capture mène au site, comme on s'y attend. Hors de l'ordre de tabulation :
      // au clavier, c'est le bouton ↗ de la carte qui fait ce lien.
      return (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          className="block size-full"
        >
          <BrowserFrame interactive="link">{shot}</BrowserFrame>
        </a>
      );
    }
  }
}
