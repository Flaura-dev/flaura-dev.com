import type { Metadata } from "next";
import { site } from "@/content/site";

/** Champs Open Graph communs. Un `openGraph` défini dans une page remplace celui du layout en entier. */
export const openGraphBase = {
  type: "website",
  locale: "fr_FR",
  siteName: site.name,
} as const;

/**
 * Canonical et og:url propres à une page (chemin relatif à `metadataBase`).
 * À déclarer dans chaque page, jamais dans le layout : toutes les pages en hériteraient.
 */
export function pageUrls(path: string): Pick<Metadata, "alternates" | "openGraph"> {
  return { alternates: { canonical: path }, openGraph: { ...openGraphBase, url: path } };
}
