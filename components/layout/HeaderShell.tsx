"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Durée maximale du maintien après un clic de navigation (si scrollend n'arrive pas). */
const NAV_HOLD_MS = 2000;

/**
 * Header collant : se cache quand on descend, revient quand on remonte ou au focus.
 * Reste affiché pendant le saut qui suit un clic dans le menu. Jamais caché si
 * l'animation est réduite.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    let lastY = window.scrollY;
    let holdUntil = 0;

    const onScroll = () => {
      const y = window.scrollY;
      header.dataset.scrolled = String(y > 8);
      if (performance.now() < holdUntil) {
        lastY = y;
        return;
      }
      if (Math.abs(y - lastY) < 6) return;
      // Caché quand on descend (passé le haut de page), affiché dès qu'on remonte.
      header.dataset.hidden = String(y > lastY && y > 160);
      lastY = y;
    };
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('a[href*="#"]')) return;
      holdUntil = performance.now() + NAV_HOLD_MS;
      header.dataset.hidden = "false";
    };
    // Fin du saut : la position d'arrivée devient la référence (pas de « descente »).
    const endHold = () => {
      if (!holdUntil) return;
      holdUntil = 0;
      lastY = window.scrollY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", endHold);
    header.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", endHold);
      header.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <header
      ref={ref}
      className="sticky top-0 z-40 border-b border-transparent transition-[translate,background-color,border-color] duration-300 data-[scrolled=true]:border-line data-[scrolled=true]:bg-bg/85 data-[scrolled=true]:backdrop-blur-md motion-safe:data-[hidden=true]:not-focus-within:-translate-y-full motion-reduce:transition-none md:pr-[88px] opaque:data-[scrolled=true]:bg-bg opaque:data-[scrolled=true]:backdrop-blur-none"
    >
      {children}
    </header>
  );
}
