"use client";

import { useEffect, useRef, type ReactNode } from "react";

const NAV_HOLD_MS = 2000; // si scrollend n'arrive pas

// se cache quand on descend, revient quand on remonte
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
      header.dataset.hidden = String(y > lastY && y > 160);
      lastY = y;
    };
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('a[href*="#"]')) return;
      holdUntil = performance.now() + NAV_HOLD_MS;
      header.dataset.hidden = "false";
    };
    // fin du saut après un clic dans le menu
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

  // flou sur ::before et pas sur le header, sinon il ne voit pas la page
  return (
    <header
      ref={ref}
      className="sticky top-0 z-40 border-b border-transparent transition-[translate,border-color] duration-300 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:-bottom-6 before:-z-10 before:bg-bg/70 before:[mask-image:linear-gradient(to_bottom,black_calc(100%-1.5rem),transparent)] before:opacity-0 before:backdrop-blur-md before:backdrop-saturate-160 before:transition-opacity before:duration-300 data-[scrolled=true]:before:opacity-100 motion-safe:data-[hidden=true]:not-focus-within:-translate-y-full motion-reduce:transition-none motion-reduce:before:transition-none md:pr-[88px] opaque:before:bottom-0 opaque:before:bg-bg opaque:before:[mask-image:none] opaque:before:backdrop-filter-none opaque:data-[scrolled=true]:border-line"
    >
      {children}
    </header>
  );
}
