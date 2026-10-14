"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type RefObject,
} from "react";
import { Container } from "@/components/ui/Container";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";
import { processSteps } from "@/content/process";
import { cx } from "@/lib/cx";

/** Durée d'affichage de chaque étape en lecture automatique (ms). */
const STEP_MS = 5000;
/** Retour rapide de la ligne (bouclage, reprise) avant de reprendre le remplissage. */
const REWIND_MS = 450;
/** Glissement de la ligne vers l'étape cliquée. */
const SELECT_MS = 500;
const EASE_OUT = "cubic-bezier(0.2, 0, 0, 1)";
const COUNT = processSteps.length;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Part de la frise couverte par la ligne, telle qu'elle est affichée en ce moment. */
function shownProgress(line: HTMLElement | null) {
  if (!line) return 0;
  return parseFloat(getComputedStyle(line).getPropertyValue("--line-p")) || 0;
}

/** Remplace l'animation en cours ; la valeur de repos devient la dernière image. */
function animateLine(
  line: HTMLElement | null,
  current: RefObject<Animation | null>,
  keyframes: Keyframe[],
  duration: number,
) {
  if (!line) return null;
  current.current?.cancel();
  line.style.setProperty("--line-p", String(keyframes[keyframes.length - 1]["--line-p"]));
  const animation = line.animate(keyframes, { duration });
  current.current = animation;
  return animation;
}

/*
 * Frise interactive. Tant qu'on n'y touche pas, elle avance toute seule (la ligne se
 * remplit pendant 5 s, puis on passe à l'étape suivante). Elle s'arrête avec le
 * bouton pause ou dès qu'on clique sur une étape (le bouton « lecture » la relance),
 * et attend quand la section n'est pas à l'écran. Sans lecture automatique si
 * l'animation est réduite.
 *
 * La ligne (--line-p, cf. globals.css) est animée avec les Web Animations en partant
 * toujours de sa valeur affichée : pause, clic ou reprise en plein remplissage, elle
 * continue d'où elle est, sans saut.
 */
export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const inViewRef = useRef(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const autoplay = playing && !reducedMotion;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        setInView(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      animationRef.current?.cancel();
    };
  }, []);

  // Lecture automatique : un segment par étape, qui part de la valeur affichée.
  useLayoutEffect(() => {
    if (!autoplay) return;
    const line = lineRef.current;
    const start = active / COUNT;
    const end = (active + 1) / COUNT;
    const shown = shownProgress(line);
    const fillMs = (from: number) => Math.max(0, (end - from) * COUNT * STEP_MS);

    let animation: Animation | null;
    if (shown >= start - 0.001 && shown <= end + 0.001) {
      // Déjà sur cette étape (reprise après une pause) : on finit le remplissage.
      animation = animateLine(
        line,
        animationRef,
        [{ "--line-p": shown }, { "--line-p": end }],
        fillMs(shown),
      );
    } else {
      // Ailleurs (retour au début de la frise) : retour rapide, puis remplissage.
      const total = REWIND_MS + fillMs(start);
      animation = animateLine(
        line,
        animationRef,
        [
          { "--line-p": shown, easing: EASE_OUT },
          { "--line-p": start, offset: REWIND_MS / total },
          { "--line-p": end },
        ],
        total,
      );
    }
    if (!animation) return;
    if (!inViewRef.current) animation.pause();
    animation.onfinish = () => setActive((index) => (index + 1) % COUNT);
    // Pas d'annulation au nettoyage : la pause doit figer la ligne là où elle est.
  }, [active, autoplay]);

  // Hors de l'écran, la frise attend.
  useEffect(() => {
    const animation = animationRef.current;
    if (!autoplay || !animation) return;
    if (inView) animation.play();
    else animation.pause();
  }, [inView, autoplay, active]);

  // Animation réduite : la ligne se place directement sur l'étape choisie.
  useLayoutEffect(() => {
    if (!reducedMotion) return;
    animationRef.current?.cancel();
    animationRef.current = null;
    lineRef.current?.style.setProperty("--line-p", String((active + 1) / COUNT));
  }, [reducedMotion, active]);

  function togglePlaying() {
    if (playing) animationRef.current?.pause();
    setPlaying(!playing);
  }

  function select(index: number) {
    const line = lineRef.current;
    const shown = shownProgress(line);
    setPlaying(false);
    setActive(index);
    if (reducedMotion) return;
    animateLine(
      line,
      animationRef,
      [{ "--line-p": shown, easing: EASE_OUT }, { "--line-p": (index + 1) / COUNT }],
      SELECT_MS,
    );
  }

  return (
    <section ref={sectionRef} aria-labelledby="process-titre" className="pt-[72px]">
      <Container className="flex flex-col gap-7">
        <div className="flex items-center justify-between gap-4">
          <h2
            id="process-titre"
            className="font-mono text-xs tracking-[0.17em] text-muted uppercase"
          >
            {"// comment on travaille ensemble"}
          </h2>
          <button
            type="button"
            onClick={togglePlaying}
            className="inline-flex min-h-11 press cursor-pointer items-center gap-2 rounded-full border border-line px-4 font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase hover:border-pink hover:text-pink motion-reduce:hidden"
          >
            {playing ? <PauseIcon size={12} /> : <PlayIcon size={12} />}
            {playing ? "pause" : "lecture"}
            <span className="sr-only"> du défilement automatique des étapes</span>
          </button>
        </div>

        <div className="relative">
          {/* Ligne de progression : verticale sur mobile, horizontale sur desktop. */}
          <span
            ref={lineRef}
            aria-hidden="true"
            style={{ "--line-p": 0 } as CSSProperties}
            className="process-line absolute top-0 -left-px h-full w-0.5 bg-pink md:-top-px md:left-0 md:h-0.5 md:w-full"
          />
          <ol className="grid border-l border-line md:grid-cols-4 md:border-t md:border-l-0">
            {processSteps.map((step, index) => {
              const current = index === active;
              const reached = index <= active;
              return (
                <li
                  key={step.num}
                  className="group relative flex flex-col gap-2.5 rounded-lg pb-10 pl-7 outline-offset-4 last:pb-0 has-focus-visible:outline-2 has-focus-visible:outline-pink md:pt-8 md:pr-7 md:pb-0 md:pl-0"
                >
                  <span
                    aria-hidden="true"
                    className={cx(
                      "absolute top-1 -left-1.5 size-[11px] rounded-full motion-safe:transition-[background-color,border-color,box-shadow] motion-safe:duration-300 md:-top-1.5 md:left-0",
                      reached ? "bg-pink" : "border-[1.5px] border-pink bg-bg",
                      current && "shadow-[0_0_0_4px_var(--bg),0_0_14px_var(--pink)]",
                    )}
                  />
                  <span
                    className={cx(
                      "font-mono text-xs motion-safe:transition-colors",
                      current ? "text-pink" : "text-dim",
                    )}
                  >
                    {step.num}
                  </span>
                  <h3 className="font-display text-[2rem] leading-none font-black uppercase">
                    {/* Le bouton couvre toute l'étape (pseudo-élément) : clic n'importe où. */}
                    <button
                      type="button"
                      onClick={() => select(index)}
                      aria-current={current ? "step" : undefined}
                      className={cx(
                        "cursor-pointer text-left uppercase press-text after:absolute after:inset-0 focus-visible:outline-none",
                        current ? "text-fg" : "text-dim group-hover:text-muted",
                      )}
                    >
                      {step.title}
                    </button>
                  </h3>
                  <p
                    className={cx(
                      "text-[0.9375rem] leading-[1.6] motion-safe:transition-colors",
                      current ? "text-muted" : "text-dim",
                    )}
                  >
                    {step.text}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
