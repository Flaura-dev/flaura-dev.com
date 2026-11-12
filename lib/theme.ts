// ==== REGLAGES ====
export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const PETALS_STORAGE_KEY = "petals";

export const SYSTEM_LIGHT_QUERY = "(prefers-color-scheme: light)";

// barre du navigateur mobile
export const THEME_COLORS: Record<Theme, string> = {
  dark: "#0D0817",
  light: "#F7F2EE",
};

// ==== AVANT L'AFFICHAGE ====
// lancé dans <head> : pas de flash au chargement
export const preferencesInitScript = `(function(){var d=document.documentElement,t=null;try{if(localStorage.getItem("${PETALS_STORAGE_KEY}")==="off")d.setAttribute("data-petals","off");t=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}if(t!=="light"&&t!=="dark")t=window.matchMedia&&matchMedia("${SYSTEM_LIGHT_QUERY}").matches?"light":"dark";if(t==="light"){d.setAttribute("data-theme","light");var m=document.querySelector('meta[name="color-scheme"]');if(m)m.content="light";var c=document.querySelector('meta[name="theme-color"]');if(c)c.content="${THEME_COLORS.light}"}})()`;

// ==== THEME ====
export function systemTheme(): Theme {
  return window.matchMedia(SYSTEM_LIGHT_QUERY).matches ? "light" : "dark";
}

export function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

export function resolveTheme(): Theme {
  return readStoredTheme() ?? systemTheme();
}

// retour au thème du système : on oublie le choix
export function storeTheme(theme: Theme) {
  try {
    if (theme === systemTheme()) localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // stockage indisponible
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
