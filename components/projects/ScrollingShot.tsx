import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { ArrowDownIcon } from "@/components/ui/icons";

type ScrollingShotProps = {
  /** Capture pleine page, 1600 px de large comme les autres. */
  src: StaticImageData;
  alt: string;
  sizes: string;
};

/**
 * Capture pleine page qui défile dans le cadre navigateur, pour les projets sans
 * comparateur avant/après. Au survol du cadre (ou quand le lien de la carte a le focus
 * clavier), elle descend jusqu'en bas du site, puis remonte plus vite. Sur écran
 * tactile, elle défile au rythme de la page (globals.css). Animation réduite : le haut
 * de page, immobile.
 *
 * Le conteneur est un conteneur de taille : 100cqw et 100cqh valent la largeur et la
 * hauteur visibles, donc « -100% + 100cqh » amène pile le bas de la capture en bas du
 * cadre. Si la capture est plus courte que le cadre (carte étroite, page courte), elle
 * le remplit quand même (min-h-full) et ne bouge pas. overflow-clip plutôt que hidden :
 * le cadre ne peut pas défiler, même par script (scrollIntoView), donc la course part
 * toujours du haut de la capture.
 */
export function ScrollingShot({ src, alt, sizes }: ScrollingShotProps) {
  const ratio = src.height / src.width;
  // Plus la page est longue, plus la descente dure : la vitesse reste à peu près la même.
  const duration = Math.max(2, ratio * 1.5);

  return (
    <div
      className="scroll-shot [container-type:size] absolute inset-0 overflow-clip"
      style={{ "--shot-duration": `${duration}s` } as CSSProperties}
    >
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        className="block h-auto min-h-full w-full object-cover object-top motion-safe:transition-[translate] motion-safe:duration-700 motion-safe:ease-in-out motion-safe:group-hover/frame:translate-y-[calc(-100%_+_100cqh)] motion-safe:group-hover/frame:duration-(--shot-duration) motion-safe:group-has-[:focus-visible]:translate-y-[calc(-100%_+_100cqh)] motion-safe:group-has-[:focus-visible]:duration-(--shot-duration)"
      />
      {/*
       * L'indice n'a de sens que s'il reste au moins 24 px à parcourir. La course vaut
       * 100cqw × ratio − 100cqh : sa boîte prend (course − 24 px) × 1000 de haut, soit 0
       * quand la capture tient presque entière dans le cadre, et l'indice est rogné.
       */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 hidden max-h-full overflow-hidden motion-safe:[@media(hover:hover)]:block"
        style={{ height: `max(0px, (100cqw * ${ratio} - 100cqh - 24px) * 1000)` }}
      >
        <span className="absolute top-4 right-3.5 flex items-center gap-1.5 rounded-full bg-bg px-2.5 py-1 font-mono text-[0.6875rem] text-fg transition-opacity duration-300 group-hover/frame:opacity-0 group-has-[:focus-visible]:opacity-0">
          <ArrowDownIcon size={11} />
          survole
        </span>
      </div>
    </div>
  );
}
