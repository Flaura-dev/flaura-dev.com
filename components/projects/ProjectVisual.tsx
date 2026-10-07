import Image, { type StaticImageData } from "next/image";
import leaAfter from "@/assets/projects/lea-apres.webp";
import leaBefore from "@/assets/projects/lea-avant.webp";
import pendu from "@/assets/projects/pendu.webp";
import type { Project } from "@/content/projects";
import { BeforeAfter } from "./BeforeAfter";
import { BrowserFrame } from "./BrowserFrame";

/*
 * Captures faites en 1440 × 900 (double résolution), toutes au même format pour que
 * l'avant et l'après se superposent au pixel près. Seul le haut de page est visible.
 */
const SIZES = "(min-width: 1280px) 380px, (min-width: 900px) 33vw, 100vw";

function Shot({ src, alt }: { src: StaticImageData; alt: string }) {
  return <Image src={src} alt={alt} fill sizes={SIZES} className="object-cover object-top" />;
}

/** Illustration provisoire (maquette), en attendant une capture du projet. */
function AilleursVisual() {
  return (
    <div aria-hidden="true" className="flex size-full items-center justify-center bg-[#161A26]">
      <div className="relative size-[150px] overflow-hidden rounded-full border-[1.5px] border-[#8C93B0] shadow-[0_0_60px_#3B3F66]">
        <div className="absolute inset-x-10 inset-y-0 rounded-full border-[1.5px] border-[#4E5576]" />
        <div className="absolute inset-x-3 inset-y-0 rounded-full border-[1.5px] border-[#4E5576]" />
        <div className="absolute inset-x-0 top-1/2 h-[1.5px] bg-[#4E5576]" />
        <div className="absolute inset-x-0 top-[28%] h-[1.5px] bg-[#3A3F5A]" />
        <div className="absolute inset-x-0 top-[72%] h-[1.5px] bg-[#3A3F5A]" />
        <div className="absolute top-[38px] left-11 size-2.5 rounded-full bg-pink" />
        <div className="absolute top-[84px] left-[94px] size-2.5 rounded-full bg-pink" />
      </div>
    </div>
  );
}

export function ProjectVisual({ project }: { project: Project }) {
  switch (project.visual) {
    case "lea":
      return (
        <BrowserFrame>
          <BeforeAfter
            before={<Shot src={leaBefore} alt="" />}
            after={<Shot src={leaAfter} alt="" />}
            label="Comparer l’ancien et le nouveau site de Léa Grondin"
          />
        </BrowserFrame>
      );
    case "pendu":
      return (
        <BrowserFrame>
          <Shot src={pendu} alt="Page d’accueil du jeu Le Pendu de la Faille" />
        </BrowserFrame>
      );
    case "ailleurs":
      return <AilleursVisual />;
  }
}
