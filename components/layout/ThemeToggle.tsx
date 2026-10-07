"use client";

import { useLayoutEffect } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/icons";
import { applyTheme, readStoredTheme, THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Bascule sombre/clair. L'icône et le libellé suivent l'attribut data-theme en CSS :
 * aucun écart entre le rendu serveur et le navigateur, donc aucun flash.
 */
export function ThemeToggle() {
  // En développement, React remonte <html> et efface l'attribut posé par le script :
  // on le réapplique avant l'affichage. Sans effet en production.
  useLayoutEffect(() => {
    applyTheme(readStoredTheme());
  }, []);

  function toggle() {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Stockage indisponible (navigation privée stricte) : le choix vaut pour cette page.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-fg transition-colors hover:border-pink hover:text-pink"
    >
      <SunIcon className="light:hidden" />
      <MoonIcon className="dark:hidden" />
      <span className="sr-only light:hidden">Passer en mode clair</span>
      <span className="sr-only dark:hidden">Passer en mode sombre</span>
    </button>
  );
}
