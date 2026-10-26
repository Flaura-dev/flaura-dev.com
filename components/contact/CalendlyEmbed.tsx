"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarIcon } from "@/components/ui/icons";
import { cx } from "@/lib/cx";

type CalendlyEmbedProps = {
  /** Lien de l'événement Calendly (https://calendly.com/…). */
  url: string;
};

/** Hauteur du cadre avant que Calendly n'annonce celle de son contenu (px). */
const DEFAULT_HEIGHT = 700;
/** Hauteurs transitoires envoyées au chargement, ignorées. */
const MIN_REPORTED_HEIGHT = 200;
/** Rogne 2 px en bas : évite un liseré blanc sous le calendrier. */
const BOTTOM_CLIP = 2;
/**
 * Étape « choisir un jour » : Calendly annonce toujours 602 px, mais le calendrier n'en
 * occupe que 474 à 506 (mois de 5 ou 6 semaines). 536 px suffisent sans rien couper.
 */
const CALENDAR_STEP_REPORTED = 602;
const CALENDAR_STEP_VISIBLE = 536;
/**
 * Calendly reste vide quelques secondes après le chargement : le message d'attente reste
 * affiché jusqu'à ce qu'il annonce sa hauteur. Passé ce délai, on affiche quand même.
 */
const REVEAL_FALLBACK_MS = 30_000;

/** Lien Calendly aux couleurs du thème, sans les détails de l'événement (déjà à gauche). */
function buildEmbedSrc(url: string) {
  const light = document.documentElement.getAttribute("data-theme") === "light";
  const src = new URL(url);
  src.searchParams.set("hide_gdpr_banner", "1");
  src.searchParams.set("hide_event_type_details", "1");
  src.searchParams.set("embed_domain", window.location.hostname);
  src.searchParams.set("embed_type", "Inline");
  src.searchParams.set("background_color", light ? "ffffff" : "160f21");
  src.searchParams.set("text_color", light ? "1b1720" : "f3edf0");
  src.searchParams.set("primary_color", light ? "c2386b" : "f07fa2");
  return src.toString();
}

/** Chargé seulement au clic : aucune requête ni cookie tiers avant, donc pas de bandeau cookies. */
export function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const frameRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const revealTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(revealTimer.current), []);

  // Le bouton disparaît au clic : le focus passe au calendrier au lieu de se perdre.
  useEffect(() => {
    if (src) frameRef.current?.focus();
  }, [src]);

  // Calendly annonce la hauteur de son contenu (choix du jour, des horaires, formulaire) :
  // le cadre la suit, sans barre de défilement intérieure.
  useEffect(() => {
    if (!src) return;
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== "https://calendly.com") return;
      if (event.source !== iframeRef.current?.contentWindow) return;
      const data = event.data as { event?: string; payload?: { height?: string } } | null;
      if (data?.event !== "calendly.page_height") return;
      const next = parseFloat(data.payload?.height ?? "");
      if (!Number.isFinite(next) || next < MIN_REPORTED_HEIGHT) return;
      setHeight(Math.ceil(next));
      setReady(true);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [src]);

  const visibleHeight =
    height <= CALENDAR_STEP_REPORTED
      ? Math.min(height, CALENDAR_STEP_VISIBLE)
      : height - BOTTOM_CLIP;

  if (src) {
    return (
      <div
        ref={frameRef}
        tabIndex={-1}
        style={{ height: visibleHeight }}
        className="relative overflow-hidden rounded-2xl outline-none motion-safe:transition-[height] motion-safe:duration-300 motion-safe:ease-out"
      >
        {!ready && (
          <div
            role="status"
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line text-sm text-muted"
          >
            <CalendarIcon size={32} className="text-pink motion-safe:animate-pulse" />
            Chargement des créneaux…
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={src}
          title="Calendly : choisir un créneau pour le café virtuel"
          // Chaque étape de Calendly peut recharger le cadre : un seul minuteur à la fois.
          onLoad={() => {
            window.clearTimeout(revealTimer.current);
            revealTimer.current = window.setTimeout(() => setReady(true), REVEAL_FALLBACK_MS);
          }}
          // Même color-scheme que Calendly, sinon le cadre est peint en blanc en thème sombre.
          style={{ height, colorScheme: "light" }}
          className={cx(
            "relative block w-full border-0 motion-safe:transition-opacity motion-safe:duration-300",
            ready ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-[18px]">
      <p className="text-[1.0625rem] font-semibold">Choisis un créneau</p>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line p-8 text-center">
        <CalendarIcon size={32} className="text-pink" />
        <p className="max-w-[320px] text-sm leading-[1.6] text-muted">
          Les créneaux disponibles s’affichent ici, synchronisés avec mon agenda.
        </p>
        <button
          type="button"
          onClick={() => setSrc(buildEmbedSrc(url))}
          className="min-h-12 press cursor-pointer rounded-full bg-pink px-[26px] py-[15px] font-semibold text-bg hover:bg-pink-hover"
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
