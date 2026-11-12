"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cx } from "@/lib/cx";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const NUDGE_MS = 1600; // durée de --animate-offers-nudge + marge

type OffersCarouselProps = {
  items: { id: string; name: string }[];
  startId: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

// carrousel sous 900 px, grille au-dessus
export function OffersCarousel({
  items,
  startId,
  className,
  style,
  children,
}: OffersCarouselProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(startId);
  const currentRef = useRef(startId);

  const isCarousel = () => {
    const list = listRef.current;
    return !!list && list.scrollWidth > list.clientWidth + 1;
  };

  const center = (id: string, smooth: boolean) => {
    const list = listRef.current;
    const card = list?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
    if (!list || !card) return;
    const left = card.offsetLeft - (list.clientWidth - card.offsetWidth) / 2;
    const reduce = window.matchMedia(REDUCED_MOTION).matches;
    list.scrollTo({ left, behavior: smooth && !reduce ? "smooth" : "instant" });
  };

  const select = (id: string) => {
    currentRef.current = id;
    setCurrent(id);
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    if (isCarousel()) center(startId, false);

    // onglet actif = carte la plus proche du centre
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const middle = list.scrollLeft + list.clientWidth / 2;
        let best = currentRef.current;
        let distance = Infinity;
        for (const card of list.children) {
          if (!(card instanceof HTMLElement)) continue;
          const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - middle);
          if (d < distance) {
            distance = d;
            best = card.id;
          }
        }
        if (best !== currentRef.current) select(best);
      });
    };

    const onResize = () => {
      if (isCarousel()) center(currentRef.current, false);
    };

    // petit va-et-vient pour montrer qu'on peut glisser, une seule fois
    let touched = false;
    let nudgeTimer = 0;
    const stopNudge = () => {
      window.clearTimeout(nudgeTimer);
      delete list.dataset.nudge;
    };
    const onTouch = () => {
      touched = true;
      stopNudge();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (touched || !isCarousel() || window.matchMedia(REDUCED_MOTION).matches) return;
        list.dataset.nudge = "true";
        nudgeTimer = window.setTimeout(stopNudge, NUDGE_MS);
      },
      { threshold: 0.6 },
    );
    observer.observe(list);

    list.addEventListener("scroll", onScroll, { passive: true });
    list.addEventListener("pointerdown", onTouch);
    list.addEventListener("wheel", onTouch, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      stopNudge();
      observer.disconnect();
      list.removeEventListener("scroll", onScroll);
      list.removeEventListener("pointerdown", onTouch);
      list.removeEventListener("wheel", onTouch);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-1 md:contents">
      <nav aria-label="Formules" className="md:hidden">
        <ul className="grid grid-cols-4 gap-1 rounded-full border border-line bg-surface p-1">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current === item.id ? "true" : undefined}
                onClick={(event) => {
                  if (!isCarousel()) return;
                  event.preventDefault();
                  select(item.id);
                  center(item.id, true);
                }}
                className="flex min-h-11 items-center justify-center rounded-full px-1 font-mono text-[min(0.6875rem,3.1vw)] tracking-[0.06em] text-muted uppercase transition-[color,background-color,box-shadow,opacity] duration-200 active:opacity-60 aria-[current=true]:bg-pink/14 aria-[current=true]:text-pink aria-[current=true]:shadow-[0_0_18px_color-mix(in_oklab,var(--pink)_22%,transparent)] motion-reduce:transition-none light:aria-[current=true]:text-pink-hover"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <ul ref={listRef} style={style} className={cx("relative", className)}>
        {children}
      </ul>
    </div>
  );
}
