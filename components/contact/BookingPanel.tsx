import Image from "next/image";
import portrait from "@/assets/photos/laura-portrait-bleu.jpg";
import { CheckIcon, ClockIcon, VideoIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import { CalendlyEmbed } from "./CalendlyEmbed";

/*
 * Bloc « Appel découverte » : présentation à gauche, Calendly à droite. Les deux
 * colonnes se placent selon la largeur du bloc lui-même (requête de conteneur).
 */
export function BookingPanel() {
  return (
    <div
      role="region"
      aria-label="Réserver un appel découverte"
      className="@container overflow-hidden rounded-3xl border border-line bg-surface"
    >
      <div className="grid h-full @[38rem]:grid-cols-[minmax(230px,1fr)_2fr]">
        <div className="flex flex-col gap-4 border-b border-line p-7 @[38rem]:border-r @[38rem]:border-b-0">
          <Image
            src={portrait}
            alt="Laura"
            width={56}
            height={56}
            className="size-14 self-center rounded-full border-2 border-pink object-cover"
          />
          <p className="text-center font-mono text-xs text-muted">Laura · Flaura.dev</p>
          <h3 className="font-display text-[34px] leading-none font-black uppercase">
            Appel découverte
          </h3>
          <ul className="flex flex-col gap-2.5 text-[15px]">
            <li className="flex items-center gap-2.5">
              <ClockIcon className="shrink-0 text-pink" />
              {site.callDuration}&nbsp;min
            </li>
            <li className="flex items-center gap-2.5">
              <VideoIcon className="shrink-0 text-pink" />
              Visio
            </li>
            <li className="flex items-center gap-2.5">
              <CheckIcon className="shrink-0 text-pink" />
              Gratuit, sans engagement
            </li>
          </ul>
          <p className="text-sm leading-[1.6] text-muted">
            On parle de votre projet et de vos objectifs, et je vous dis franchement si je suis la
            bonne personne pour vous aider.
          </p>
        </div>
        <div className="p-7">
          <CalendlyEmbed url={site.calendlyUrl} />
        </div>
      </div>
    </div>
  );
}
