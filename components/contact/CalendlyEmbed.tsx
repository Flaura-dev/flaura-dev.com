"use client";

import { useState } from "react";
import { CalendarIcon } from "@/components/ui/icons";

type CalendlyEmbedProps = {
  /** Lien de l'événement Calendly. Seuls les liens https://calendly.com/ sont acceptés. */
  url: string | null;
};

function isCalendlyUrl(url: string | null): url is string {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === "calendly.com";
  } catch {
    return false;
  }
}

/** Ajoute au lien Calendly les réglages d'intégration et les couleurs du thème en cours. */
function buildEmbedSrc(url: string) {
  const light = document.documentElement.getAttribute("data-theme") === "light";
  const src = new URL(url);
  src.searchParams.set("hide_gdpr_banner", "1");
  src.searchParams.set("embed_domain", window.location.hostname);
  src.searchParams.set("embed_type", "Inline");
  src.searchParams.set("background_color", light ? "ffffff" : "17141b");
  src.searchParams.set("text_color", light ? "1b1720" : "f3edf0");
  src.searchParams.set("primary_color", light ? "c2386b" : "f07fa2");
  return src.toString();
}

/**
 * Calendly n'est chargé qu'au clic du visiteur : aucune requête ni cookie tiers avant
 * qu'il le demande, donc pas besoin de bandeau cookies. Tant que le lien n'est pas
 * configuré (content/site.ts), on affiche un emplacement d'attente.
 */
export function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  const [src, setSrc] = useState<string | null>(null);
  const configured = isCalendlyUrl(url);

  if (src) {
    return (
      <iframe
        src={src}
        title="Calendly : choisir un créneau pour l’appel découverte"
        className="h-[700px] w-full rounded-2xl border-0"
      />
    );
  }

  return (
    <div className="flex h-full flex-col gap-[18px]">
      <p className="text-[17px] font-semibold">Choisissez un créneau</p>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line p-8 text-center">
        <CalendarIcon size={32} className="text-pink" />
        <p className="max-w-[320px] text-sm leading-[1.6] text-muted">
          {configured
            ? "Les créneaux disponibles s’affichent ici, synchronisés avec mon agenda."
            : "[Calendrier Calendly : lien à fournir]"}
        </p>
        <button
          type="button"
          disabled={!configured}
          onClick={() => {
            if (configured) setSrc(buildEmbedSrc(url));
          }}
          className="min-h-12 cursor-pointer rounded-full bg-pink px-[26px] py-[15px] font-semibold text-bg transition-colors hover:bg-pink-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          Voir les créneaux disponibles
        </button>
      </div>
      <p className="font-mono text-[11px] text-muted">
        Créneaux synchronisés via Calendly · fuseau Europe/Paris. Le calendrier se charge uniquement
        si vous cliquez.
      </p>
    </div>
  );
}
