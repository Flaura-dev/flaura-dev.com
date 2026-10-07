"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Header collant : il prend un fond dès qu'on quitte le haut de page, se cache quand
 * on descend et revient dès qu'on remonte (ou qu'un de ses liens reçoit le focus).
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      header.dataset.scrolled = String(y > 8);
      if (Math.abs(y - lastY) < 6) return;
      header.dataset.hidden = String(y > lastY && y > 160);
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      ref={ref}
      className="sticky top-0 z-40 border-b border-transparent transition-[translate,background-color,border-color] duration-300 data-[hidden=true]:not-focus-within:-translate-y-full data-[scrolled=true]:border-line data-[scrolled=true]:bg-bg/85 data-[scrolled=true]:backdrop-blur-md motion-reduce:transition-none md:pr-[88px]"
    >
      {children}
    </header>
  );
}
