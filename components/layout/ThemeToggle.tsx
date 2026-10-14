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

/**
 * Change de thème d'un seul bloc : fondu enchaîné de toute la page (View Transitions)
 * quand le navigateur le permet, bascule nette sinon. Les transitions de couleur des
 * éléments sont coupées pendant le changement (data-theme-switching, globals.css).
 */
function switchTheme(next: Theme) {
  const root = document.documentElement;
  if (root.getAttribute("data-theme") === next) return;
  const update = () => {
    root.dataset.themeSwitching = "";
    applyTheme(next);
  };
  // Une fois le nouveau thème affiché, les transitions peuvent revenir : plus rien ne
  // change, elles ne se déclenchent pas. On n'attend pas la fin du fondu, qui peut
  // traîner (onglet en arrière-plan).
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

/**
 * Bascule sombre/clair. Sans choix du visiteur, le site suit le réglage de son système
 * (et le suit en direct s'il change) ; le bouton passe à l'autre thème. L'icône et le
 * libellé suivent l'attribut data-theme en CSS : aucun écart entre le rendu serveur
 * et le navigateur, donc aucun flash.
 */
export function ThemeToggle() {
  // En développement, React remonte <html> et efface l'attribut posé par le script :
  // on le réapplique avant l'affichage. Sans effet en production.
  useLayoutEffect(() => {
    applyTheme(resolveTheme());
  }, []);

  useEffect(() => {
    // Le système passe en clair ou en sombre (souvent selon l'heure) : on suit, sauf
    // si le visiteur a choisi lui-même.
    const system = window.matchMedia(SYSTEM_LIGHT_QUERY);
    const onSystemChange = () => {
      if (!readStoredTheme()) switchTheme(systemTheme());
    };
    // Choix fait dans un autre onglet du site : on s'aligne.
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
