import Image from "next/image";
import portrait from "@/assets/photos/laura-portrait-bleu.jpg";
import {
  ArrowUpRightIcon,
  CheckIcon,
  ClockIcon,
  CoffeeIcon,
  LinkedInIcon,
  VideoIcon,
} from "@/components/ui/icons";
import { site } from "@/content/site";
import { CalendlyEmbed } from "./CalendlyEmbed";

/*
 * Bloc « Café virtuel » (l'appel découverte, même nom que l'événement Calendly) :
 * présentation à gauche (avec le lien LinkedIn, en bas), Calendly à droite. Les deux
 * colonnes se placent selon la largeur du bloc lui-même (requête de conteneur).
 */
export function BookingPanel() {
  return (
    <div
      role="region"
      aria-label="Réserver un café virtuel"
      className="@container overflow-hidden rounded-3xl border border-line bg-surface"
    >
      <div className="grid h-full @[38rem]:grid-cols-[minmax(250px,1fr)_2fr]">
        <div className="flex flex-col gap-4 border-b border-line p-7 @[38rem]:border-r @[38rem]:border-b-0">
          <Image
            src={portrait}
            alt="Laura"
            width={56}
            height={56}
            className="size-14 self-center rounded-full border-2 border-pink object-cover"
          />
          <p className="text-center font-mono text-xs text-muted">Laura · Flaura.dev</p>
          <h3 className="flex items-center gap-1.5 font-display text-[2rem] leading-none font-black uppercase">
            Café virtuel
            <CoffeeIcon size={24} className="shrink-0 text-pink" />
          </h3>
          <ul className="flex flex-col gap-2.5 text-[0.9375rem]">
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
            On parle de ton projet et de tes objectifs, et je te dis franchement si je suis la bonne
            personne pour t’aider.
          </p>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex min-h-11 press items-center justify-between gap-3 rounded-2xl border border-line px-4 py-3 text-sm font-semibold text-fg [--press-scale:0.985] hover:border-pink"
          >
            <span className="flex items-center gap-2.5">
              <LinkedInIcon className="shrink-0 text-pink" />
              Me suivre sur LinkedIn
              <span className="sr-only">(nouvel onglet)</span>
            </span>
            <ArrowUpRightIcon size={14} className="shrink-0 text-pink" />
          </a>
        </div>
        {/* Calendrier centré en hauteur dans sa colonne. */}
        <div className="flex flex-col justify-center p-7">
          <CalendlyEmbed url={site.calendlyUrl} />
        </div>
      </div>
    </div>
  );
}
