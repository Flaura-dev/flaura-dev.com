"use client";

import { useCallback, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { sections, type SectionId } from "@/content/site";

/*
 * Section en cours, partagée par la navigation, le menu mobile et le fil conducteur.
 * Un seul IntersectionObserver surveille une ligne horizontale placée à 40 % de la
 * hauteur d'écran : la section qui la traverse est la section active.
 */

let active: SectionId | null = null;
let observedPath: string | null = null;
let observer: IntersectionObserver | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function observe(pathname: string) {
  observer?.disconnect();
  observer = null;
  observedPath = pathname;

  const targets = sections
    .map((section) => document.getElementById(section.id))
    .filter((el): el is HTMLElement => el !== null);

  active = targets.length > 0 ? sections[0].id : null;
  if (targets.length === 0) return;

  observer = new IntersectionObserver(
    (entries) => {
      let changed = false;
      for (const entry of entries) {
        if (entry.isIntersecting && entry.target.id !== active) {
          active = entry.target.id as SectionId;
          changed = true;
        }
      }
      if (changed) notify();
    },
    { rootMargin: "-40% 0px -60% 0px" },
  );
  targets.forEach((target) => observer?.observe(target));
}

export function useActiveSection(): SectionId | null {
  const pathname = usePathname();

  const subscribe = useCallback(
    (listener: () => void) => {
      listeners.add(listener);
      if (observedPath !== pathname) {
        observe(pathname);
        notify();
      }
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          observer?.disconnect();
          observer = null;
          observedPath = null;
        }
      };
    },
    [pathname],
  );

  return useSyncExternalStore(
    subscribe,
    () => active,
    () => null,
  );
}
