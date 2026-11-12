"use client";

import { useEffect, useLayoutEffect } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/icons";
import {
  applyTheme,
  readStoredTheme,
  resolveTheme,
  storeTheme,
  SYSTEM_LIGHT_QUERY,
  systemTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

// un seul fondu pour toute la page (View Transitions)
function switchTheme(next: Theme) {
  const root = document.documentElement;
  if (root.getAttribute("data-theme") === next) return;
  const update = () => {
    root.dataset.themeSwitching = "";
    applyTheme(next);
  };
  const done = () =>
    requestAnimationFrame(() => requestAnimationFrame(() => delete root.dataset.themeSwitching));

  if (typeof document.startViewTransition === "function") {
    document
      .startViewTransition(update)
      .ready.catch(() => {})
      .finally(done);
  } else {
    update();
    done();
  }
}

// icône et libellé gérés en CSS : pas de flash
export function ThemeToggle() {
  // en dev, React efface data-theme : on le remet
  useLayoutEffect(() => {
    applyTheme(resolveTheme());
  }, []);

  useEffect(() => {
    const system = window.matchMedia(SYSTEM_LIGHT_QUERY);
    const onSystemChange = () => {
      if (!readStoredTheme()) switchTheme(systemTheme());
    };
    // choix fait dans un autre onglet
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY || event.key === null) switchTheme(resolveTheme());
    };
    system.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorage);
    return () => {
      system.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  function toggle() {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    switchTheme(next);
    storeTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex size-11 shrink-0 press cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-fg hover:border-pink hover:text-pink"
    >
      <SunIcon className="light:hidden" />
      <MoonIcon className="dark:hidden" />
      <span className="sr-only light:hidden">Passer en mode clair</span>
      <span className="sr-only dark:hidden">Passer en mode sombre</span>
    </button>
  );
}
