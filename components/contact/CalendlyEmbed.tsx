"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarIcon } from "@/components/ui/icons";
import { cx } from "@/lib/cx";

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
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const configured = isCalendlyUrl(url);

  // Le bouton disparaît au clic : le focus passe au calendrier au lieu de se perdre.
  useEffect(() => {
    if (src) frameRef.current?.focus();
  }, [src]);

  if (src) {
    return (
      <div ref={frameRef} tabIndex={-1} className="relative h-[700px] outline-none">
        {!loaded && (
          <div
            role="status"
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line text-sm text-muted"
          >
            <CalendarIcon size={32} className="text-pink motion-safe:animate-pulse" />
            Chargement des créneaux…
          </div>
        )}
        <iframe
          src={src}
          title="Calendly : choisir un créneau pour l’appel découverte"
          onLoad={() => setLoaded(true)}
          className={cx(
            "relative size-full rounded-2xl border-0 motion-safe:transition-opacity motion-safe:duration-300",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-[18px]">
      <p className="text-[1.0625rem] font-semibold">Choisis un créneau</p>
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
          className="min-h-12 press cursor-pointer rounded-full bg-pink px-[26px] py-[15px] font-semibold text-bg hover:bg-pink-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          Voir les créneaux disponibles
        </button>
      </div>
      <p className="font-mono text-[0.6875rem] text-muted">
        Créneaux synchronisés via Calendly · fuseau Europe/Paris. Le calendrier se charge uniquement
        si tu cliques.
      </p>
    </div>
  );
}
