"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { sections } from "@/content/site";
import { cx } from "@/lib/cx";
import { useActiveSection } from "@/lib/use-active-section";

type Mark = { id: string; num: string; label: string; position: number };
type Drag = { offset: number; startY: number; tracking: boolean };

/** Déplacement (px) à partir duquel un appui sur la piste devient un glisser. */
const DRAG_THRESHOLD = 4;

/** Hauteur de défilement disponible (0 si la page tient dans l'écran). */
function maxScroll() {
  return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
}

/**
 * Fil conducteur à droite (desktop) : c'est la barre de défilement de la page.
 * Le point lumineux est à 75 % du rail quand on est à 75 % de la page ; on peut le
 * glisser, cliquer sur le rail pour y sauter, ou cliquer sur le repère d'une section.
 * Le défilement natif (molette, clavier, lecteurs d'écran) reste intact : ce rail n'est
 * qu'un raccourci visuel, masqué des technologies d'assistance.
 */
export function ScrollRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  const active = useActiveSection();
  const [marks, setMarks] = useState<Mark[]>([]);

  const activeIndex = marks.findIndex((mark) => mark.id === active);
  const current = activeIndex >= 0 ? marks[activeIndex] : marks[0];

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    // Un repère par section, placé là où se trouvera le point quand la section devient
    // la section en cours (son haut passe à 40 % de l'écran).
    let measureFrame = 0;
    const measure = () => {
      measureFrame = 0;
      const max = maxScroll();
      const next: Mark[] = [];
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const position = Math.min(1, Math.max(0, (top - window.innerHeight * 0.4) / max));
        next.push({ ...section, position });
      }
      setMarks(next);
    };
    const scheduleMeasure = () => {
      if (!measureFrame) measureFrame = requestAnimationFrame(measure);
    };
    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(document.body);
    window.addEventListener("resize", scheduleMeasure);

    // Pendant le défilement, l'étiquette de la section s'affiche à côté du point.
    const supportsTimeline = CSS.supports("animation-timeline", "scroll()");
    let scrollFrame = 0;
    let hideTimer = 0;
    const onScroll = () => {
      rail.dataset.scrolling = "true";
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        rail.dataset.scrolling = "false";
      }, 1200);
      if (!supportsTimeline && !scrollFrame) {
        scrollFrame = requestAnimationFrame(() => {
          scrollFrame = 0;
          rail.style.setProperty("--rail-p", String(Math.min(1, window.scrollY / maxScroll())));
        });
      }
    };
    if (!supportsTimeline) {
      rail.style.setProperty("--rail-p", String(Math.min(1, window.scrollY / maxScroll())));
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(measureFrame);
      cancelAnimationFrame(scrollFrame);
      window.clearTimeout(hideTimer);
    };
  }, []);

  /** Position de défilement correspondant à une hauteur sur le rail. */
  function scrollTopAt(clientY: number) {
    const rect = trackRef.current!.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    return ratio * maxScroll();
  }

  /** Le pointeur est capturé par la piste : le glisser continue même hors du rail. */
  function startDrag(event: ReactPointerEvent<HTMLElement>, offset: number, tracking: boolean) {
    drag.current = { offset, startY: event.clientY, tracking };
    trackRef.current!.setPointerCapture(event.pointerId);
    if (tracking) railRef.current!.dataset.dragging = "true";
  }

  // Appui sur la piste : saut fluide à cet endroit ; si l'on glisse dans la foulée,
  // le point suit le pointeur, sans avoir à relâcher pour l'attraper.
  function onTrackPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    window.scrollTo({ top: scrollTopAt(event.clientY) });
    startDrag(event, 0, false);
  }

  // Appui sur le point : il reste sous le pointeur à l'endroit où on l'a saisi.
  function onThumbPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const rect = thumbRef.current!.getBoundingClientRect();
    startDrag(event, event.clientY - (rect.top + rect.height / 2), true);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const state = drag.current;
    if (!state) return;
    if (!state.tracking) {
      // Petit seuil : un simple clic garde son saut fluide.
      if (Math.abs(event.clientY - state.startY) < DRAG_THRESHOLD) return;
      state.tracking = true;
      railRef.current!.dataset.dragging = "true";
    }
    window.scrollTo({ top: scrollTopAt(event.clientY - state.offset), behavior: "instant" });
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    drag.current = null;
    const track = trackRef.current!;
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    railRef.current!.dataset.dragging = "false";
  }

  function goToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  }

  return (
    <div
      ref={railRef}
      aria-hidden="true"
      className="group/rail fixed inset-y-0 right-0 z-50 hidden w-[88px] select-none md:block"
    >
      <div
        ref={trackRef}
        onPointerDown={onTrackPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="absolute inset-x-0 top-8 bottom-8 cursor-pointer touch-none"
      >
        <div className="absolute inset-y-0 left-[43px] w-0.5 rounded-full bg-line" />
        <div className="rail-fill absolute inset-y-0 left-[43px] w-0.5 rounded-full" />

        {marks.map((mark, index) => {
          const passed = activeIndex >= 0 && index <= activeIndex;
          return (
            <div
              key={mark.id}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => goToSection(mark.id)}
              style={{ top: `${mark.position * 100}%` }}
              className="group/mark absolute right-0 left-0 flex h-6 -translate-y-1/2 items-center"
            >
              <span
                className={cx(
                  "absolute right-[54px] font-mono text-[0.6875rem] transition-colors motion-reduce:transition-none",
                  index === activeIndex
                    ? "text-pink"
                    : passed
                      ? "text-muted"
                      : "text-dim group-hover/mark:text-muted",
                )}
              >
                {mark.num}
              </span>
              <span
                className={cx(
                  "absolute left-[39px] h-0.5 w-2.5 rounded-full transition-colors motion-reduce:transition-none",
                  passed ? "bg-pink" : "bg-faint group-hover/mark:bg-muted",
                )}
              />
              <span className="pointer-events-none absolute right-[76px] rounded-full border border-line bg-surface/90 px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.14em] whitespace-nowrap text-fg uppercase opacity-0 backdrop-blur-md transition-opacity group-hover/mark:opacity-100 motion-reduce:transition-none opaque:bg-surface opaque:backdrop-blur-none">
                {mark.label}
              </span>
            </div>
          );
        })}

        <div className="rail-thumb-track pointer-events-none absolute inset-0">
          <div
            ref={thumbRef}
            onPointerDown={onThumbPointerDown}
            className="pointer-events-auto absolute bottom-0 left-[44px] flex size-11 -translate-x-1/2 translate-y-1/2 cursor-grab touch-none items-center justify-center group-data-[dragging=true]/rail:cursor-grabbing"
          >
            <span className="size-4 rounded-full bg-pink shadow-[0_0_0_4px_var(--bg),0_0_20px_var(--pink)] transition-transform group-hover/rail:scale-125 group-data-[dragging=true]/rail:scale-150 motion-reduce:transition-none" />
            {current && (
              <span className="pointer-events-none absolute right-full mr-1 translate-x-1 rounded-full border border-line bg-bg/85 px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.18em] whitespace-nowrap text-pink uppercase opacity-0 backdrop-blur-md transition-[opacity,translate] group-hover/rail:translate-x-0 group-hover/rail:opacity-100 group-data-[dragging=true]/rail:translate-x-0 group-data-[dragging=true]/rail:opacity-100 group-data-[scrolling=true]/rail:translate-x-0 group-data-[scrolling=true]/rail:opacity-100 motion-reduce:transition-none opaque:bg-bg opaque:backdrop-blur-none">
                {current.num} — {current.label}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
