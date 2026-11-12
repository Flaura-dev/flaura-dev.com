"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { usePathname } from "next/navigation";
import { sections } from "@/content/site";
import { cx } from "@/lib/cx";
import { useActiveSection } from "@/lib/use-active-section";

type RailSection = { id: string; num: string; label: string; element: HTMLElement };
type Mark = RailSection & { position: number; showNum: boolean };
type Drag = { offset: number; startY: number; tracking: boolean };

// ==== REGLAGES ====
const DRAG_THRESHOLD = 4; // px avant qu'un appui devienne un glisser
const MIN_NUM_GAP = 18; // px mini entre deux numéros
const LABEL_FLIP = 96; // en dessous, l'étiquette passe sous le point

// ==== FONCTIONS UTILES ====
function maxScroll() {
  return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
}

// les pages gardées en cache sont masquées : on les ignore
function isShown(element: HTMLElement | null): element is HTMLElement {
  return element !== null && element.getClientRects().length > 0;
}

// sections signalées par la page (data-rail-*), sinon celles de l'accueil
function railSections(): { fromPage: boolean; list: RailSection[] } {
  const marked = Array.from(document.querySelectorAll<HTMLElement>("[data-rail-label]")).filter(
    isShown,
  );
  if (marked.length > 0) {
    const list = marked.map((element) => ({
      id: element.id,
      num: element.dataset.railNum ?? "",
      label: element.dataset.railLabel ?? "",
      element,
    }));
    return { fromPage: true, list };
  }
  const list = sections.flatMap((section) => {
    const element = document.getElementById(section.id);
    return isShown(element) ? [{ ...section, element }] : [];
  });
  return { fromPage: false, list };
}

// ==== FIL CONDUCTEUR ====
export function ScrollRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  const pathname = usePathname();
  const homeActive = useActiveSection();
  const [pageActive, setPageActive] = useState<string | null>(null);
  const [fromPage, setFromPage] = useState(false);
  const [marks, setMarks] = useState<Mark[]>([]);

  const active = fromPage ? pageActive : homeActive;
  const activeIndex = marks.findIndex((mark) => mark.id === active);
  const current = activeIndex >= 0 ? marks[activeIndex] : marks[0];

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let pageMarks: Mark[] = [];

    // section en cours = dernier repère atteint par le point
    const updatePageActive = () => {
      if (pageMarks.length === 0) return;
      const progress = window.scrollY / maxScroll();
      let id = pageMarks[0].id;
      for (const mark of pageMarks) if (mark.position <= progress + 0.001) id = mark.id;
      setPageActive(id);
    };

    const updateLabelSide = () => {
      const progress = Math.min(1, window.scrollY / maxScroll());
      const thumbY = progress * (trackRef.current?.clientHeight ?? 0);
      rail.dataset.labelBelow = String(thumbY < LABEL_FLIP);
    };

    // un repère par section, là où son haut passe à 40 % de l'écran
    const measure = () => {
      const max = maxScroll();
      const railHeight = trackRef.current?.clientHeight ?? 0;
      const { fromPage, list } = railSections();
      const next: Mark[] = [];
      let lastNum = -Infinity;
      for (const section of list) {
        const top = section.element.getBoundingClientRect().top + window.scrollY;
        const position = Math.min(1, Math.max(0, (top - window.innerHeight * 0.4) / max));
        const showNum = (position - lastNum) * railHeight >= MIN_NUM_GAP;
        if (showNum) lastNum = position;
        next.push({ ...section, position, showNum });
      }
      pageMarks = fromPage ? next : [];
      setFromPage(fromPage);
      setMarks(next);
      updatePageActive();
      updateLabelSide();
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    window.addEventListener("resize", measure);

    // Firefox : pas d'animation liée au défilement, on met --rail-p à jour ici
    const supportsTimeline = CSS.supports("animation-timeline", "scroll()");
    const updateProgress = () => {
      rail.style.setProperty("--rail-p", String(Math.min(1, window.scrollY / maxScroll())));
    };
    if (!supportsTimeline) updateProgress();

    let hideTimer = 0;
    const onScroll = () => {
      rail.dataset.scrolling = "true";
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        rail.dataset.scrolling = "false";
      }, 1200);
      if (!supportsTimeline) updateProgress();
      updatePageActive();
      updateLabelSide();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(hideTimer);
    };
  }, [pathname]);

  // == GLISSER ==
  function scrollTopAt(clientY: number) {
    const rect = trackRef.current!.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    return ratio * maxScroll();
  }

  // pointeur capturé : le glisser continue hors du rail
  function startDrag(event: ReactPointerEvent<HTMLElement>, offset: number, tracking: boolean) {
    drag.current = { offset, startY: event.clientY, tracking };
    trackRef.current!.setPointerCapture(event.pointerId);
    if (tracking) railRef.current!.dataset.dragging = "true";
  }

  // clic sur le rail : saut, puis glisser sans relâcher
  function onTrackPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    window.scrollTo({ top: scrollTopAt(event.clientY) });
    startDrag(event, 0, false);
  }

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

  function goToSection(mark: Mark) {
    mark.element.scrollIntoView({ block: "start" });
  }

  // == AFFICHAGE ==
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
              onClick={() => goToSection(mark)}
              style={{ top: `${mark.position * 100}%` }}
              className="group/mark absolute right-0 left-0 flex h-6 -translate-y-1/2 items-center"
            >
              {mark.showNum && (
                <span
                  className={cx(
                    "absolute right-[60px] font-mono text-[0.6875rem] transition-colors motion-reduce:transition-none",
                    index === activeIndex
                      ? "text-pink"
                      : passed
                        ? "text-muted"
                        : "text-dim group-hover/mark:text-muted",
                  )}
                >
                  {mark.num}
                </span>
              )}
              <span
                className={cx(
                  "absolute left-[39px] h-0.5 w-2.5 rounded-full transition-colors motion-reduce:transition-none",
                  passed ? "bg-pink" : "bg-faint group-hover/mark:bg-muted",
                )}
              />
              <span className="pointer-events-none absolute right-[76px] max-w-80 truncate rounded-full border border-line bg-surface/90 px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.14em] text-fg uppercase opacity-0 backdrop-blur-md transition-opacity group-hover/mark:opacity-100 motion-reduce:transition-none opaque:bg-surface opaque:backdrop-blur-none">
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
            {/* pages légales : le numéro seul */}
            {current && (
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-0.5 flex w-max max-w-20 -translate-x-1/2 flex-col items-center gap-0.5 rounded-xl border border-line bg-bg/85 px-2 py-1.5 text-center font-mono text-[0.6875rem] leading-4 tracking-[0.08em] uppercase opacity-0 backdrop-blur-md transition-opacity group-hover/rail:opacity-100 group-data-[dragging=true]/rail:opacity-100 group-data-[label-below=true]/rail:top-full group-data-[label-below=true]/rail:bottom-auto group-data-[label-below=true]/rail:mt-0.5 group-data-[label-below=true]/rail:mb-0 group-data-[scrolling=true]/rail:opacity-100 motion-reduce:transition-none opaque:bg-bg opaque:backdrop-blur-none">
                <span className="text-pink">{current.num}</span>
                {!fromPage && <span className="text-fg">{current.label}</span>}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
