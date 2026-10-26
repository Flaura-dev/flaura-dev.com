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
 * Capture pleine page qui défile au survol (ou au focus) jusqu'en bas du site, puis
 * remonte. Sur écran tactile, elle suit le défilement de la page (globals.css).
 *
 * Conteneur de taille : « -100% + 100cqh » amène le bas de la capture en bas du cadre.
 * overflow-clip plutôt que hidden : le cadre ne peut pas défiler, même par script.
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
      {/* Indice masqué (hauteur 0) s'il reste moins de 24 px à faire défiler. */}
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
