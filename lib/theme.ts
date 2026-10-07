export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const PETALS_STORAGE_KEY = "petals";

/** Couleur de la barre du navigateur mobile, alignée sur le fond de chaque thème. */
export const THEME_COLORS: Record<Theme, string> = {
  dark: "#0E0C11",
  light: "#F7F2EE",
};

/**
 * Exécuté dans <head> avant l'affichage : applique les choix mémorisés du visiteur
 * (thème clair, pétales coupés). Sans choix enregistré (ou sans JavaScript), le site
 * reste sombre, avec les pétales.
 */
export const preferencesInitScript = `(function(){try{var d=document.documentElement;if(localStorage.getItem("${PETALS_STORAGE_KEY}")==="off")d.setAttribute("data-petals","off");if(localStorage.getItem("${THEME_STORAGE_KEY}")==="light"){d.setAttribute("data-theme","light");var m=document.querySelector('meta[name="color-scheme"]');if(m)m.content="light";var c=document.querySelector('meta[name="theme-color"]');if(c)c.content="${THEME_COLORS.light}"}}catch(e){}})()`;

export function readStoredTheme(): Theme {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
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
