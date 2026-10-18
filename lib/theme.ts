export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const PETALS_STORAGE_KEY = "petals";

/** Réglage clair/sombre du système du visiteur. */
export const SYSTEM_LIGHT_QUERY = "(prefers-color-scheme: light)";

/** Couleur de la barre du navigateur mobile, alignée sur le fond de chaque thème. */
export const THEME_COLORS: Record<Theme, string> = {
  dark: "#0D0817",
  light: "#F7F2EE",
};

/**
 * Exécuté dans <head> avant l'affichage : applique le thème du visiteur (son choix
 * mémorisé, sinon le réglage clair/sombre de son système) et les pétales coupés.
 * Sans JavaScript, le site reste sombre, avec les pétales.
 */
export const preferencesInitScript = `(function(){var d=document.documentElement,t=null;try{if(localStorage.getItem("${PETALS_STORAGE_KEY}")==="off")d.setAttribute("data-petals","off");t=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}if(t!=="light"&&t!=="dark")t=window.matchMedia&&matchMedia("${SYSTEM_LIGHT_QUERY}").matches?"light":"dark";if(t==="light"){d.setAttribute("data-theme","light");var m=document.querySelector('meta[name="color-scheme"]');if(m)m.content="light";var c=document.querySelector('meta[name="theme-color"]');if(c)c.content="${THEME_COLORS.light}"}})()`;

/** Thème du système du visiteur. */
export function systemTheme(): Theme {
  return window.matchMedia(SYSTEM_LIGHT_QUERY).matches ? "light" : "dark";
}

/** Choix explicite du visiteur, s'il en a fait un (sinon le site suit son système). */
export function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

/** Thème à afficher : le choix du visiteur, sinon celui de son système. */
export function resolveTheme(): Theme {
  return readStoredTheme() ?? systemTheme();
}

/**
 * Mémorise le choix du visiteur. S'il revient au thème de son système, on efface
 * l'exception : le site suivra de nouveau son système (y compris s'il bascule
 * automatiquement entre clair et sombre selon l'heure).
 */
export function storeTheme(theme: Theme) {
  try {
    if (theme === systemTheme()) localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Stockage indisponible (navigation privée stricte) : le choix vaut pour cette page.
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document
    .querySelector<HTMLMetaElement>('meta[name="color-scheme"]')
    ?.setAttribute("content", theme);
  document
    .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLORS[theme]);
}
