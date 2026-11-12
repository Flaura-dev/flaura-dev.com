import type { Metadata } from "next";
import apercu from "@/assets/partage/apercu-liens.jpg";
import { site } from "@/content/site";

// un openGraph de page remplace celui du layout en entier
export const openGraphBase = {
  type: "website",
  locale: "fr_FR",
  siteName: site.name,
  images: {
    url: apercu.src,
    width: apercu.width,
    height: apercu.height,
    type: "image/jpeg",
    alt: "Tes clients doivent pouvoir te trouver, ton site doit leur donner envie de te choisir. Flaura.dev, développeuse web freelance.",
  },
} as const;

// pages légales hors Google (elles affichent l'adresse)
export const legalRobots: Metadata["robots"] = { index: false, follow: true };

// dans chaque page, jamais dans le layout
export function pageUrls(path: string): Pick<Metadata, "alternates" | "openGraph"> {
  return { alternates: { canonical: path }, openGraph: { ...openGraphBase, url: path } };
}
