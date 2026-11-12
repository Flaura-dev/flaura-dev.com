"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, CalendarIcon } from "@/components/ui/icons";
import { cx } from "@/lib/cx";

type CalendlyEmbedProps = {
  url: string;
};

// ==== REGLAGES ====
const DEFAULT_HEIGHT = 700;
const MIN_REPORTED_HEIGHT = 200; // en dessous : hauteurs du chargement, ignorées
const BOTTOM_CLIP = 2; // cache un liseré blanc en bas
// Calendly annonce 602 px pour le choix du jour, 536 suffisent
const CALENDAR_STEP_REPORTED = 602;
const CALENDAR_STEP_VISIBLE = 536;
const REVEAL_FALLBACK_MS = 30_000; // on affiche quand même si Calendly ne répond pas

// ==== LIEN CALENDLY ====
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

// ==== CHARGEMENT ====
function CalendarSkeleton() {
  return (
    <div role="status" className="absolute inset-0 flex flex-col items-center px-3 pt-[34px]">
      <span className="sr-only">Chargement des créneaux…</span>
      <i aria-hidden="true" className="skeleton h-4 w-[180px] max-w-[70%] rounded-full" />
      <div aria-hidden="true" className="mt-[50px] flex h-7 w-[204px] items-center justify-between">
        <i className="skeleton size-5 rounded-full" />
        <i className="skeleton h-3 w-[100px] rounded-full" />
        <i className="skeleton size-5 rounded-full" />
      </div>
      <div aria-hidden="true" className="w-full max-w-[316px]">
        <div className="mt-[27px] grid grid-cols-7 justify-items-center">
          {Array.from({ length: 7 }, (_, i) => (
            <i key={i} className="skeleton h-2 w-6 rounded-full" />
          ))}
        </div>
        <div className="mt-1 grid auto-rows-[3rem] grid-cols-7 place-items-center">
          {Array.from({ length: 35 }, (_, i) => (
            <i key={i} className="skeleton aspect-square w-[min(2.5rem,88%)] rounded-full" />
          ))}
        </div>
        <i className="skeleton mt-[53px] block h-3 w-[110px] rounded-full" />
        <i className="skeleton mt-[15px] block h-3 w-[220px] max-w-full rounded-full" />
      </div>
    </div>
  );
}

// ==== CALENDLY ====
// chargé au clic seulement : pas de cookie avant, donc pas de bandeau
export function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const frameRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const revealTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(revealTimer.current), []);

  useEffect(() => {
    if (src) frameRef.current?.focus();
  }, [src]);

  // le cadre suit la hauteur annoncée par Calendly
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

  const visibleHeight = !ready
    ? CALENDAR_STEP_VISIBLE
    : height <= CALENDAR_STEP_REPORTED
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
        {!ready && <CalendarSkeleton />}
        <iframe
          ref={iframeRef}
          src={src}
          title="Calendly : choisir un créneau pour le café virtuel"
          onLoad={() => {
            window.clearTimeout(revealTimer.current);
            revealTimer.current = window.setTimeout(() => setReady(true), REVEAL_FALLBACK_MS);
          }}
          // sinon le cadre devient blanc en thème sombre
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
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted underline decoration-dotted underline-offset-2 press-text hover:text-pink"
        >
          ou ouvrir l’agenda dans Calendly
          <span className="sr-only">(nouvel onglet)</span>
          <ArrowUpRightIcon size={14} className="shrink-0 text-pink" />
        </a>
      </div>
      <p className="font-mono text-xs leading-[1.6] text-muted">
        Créneaux synchronisés via Calendly · fuseau Europe/Paris. Le calendrier ne se charge
        qu’après ton clic&nbsp;; Calendly peut alors déposer{" "}
        <Link
          href="/confidentialite#cookies"
          className="py-3 underline decoration-dotted underline-offset-2 press-text hover:text-pink"
        >
          ses propres cookies
        </Link>
        .
      </p>
    </div>
  );
}
