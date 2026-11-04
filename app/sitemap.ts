import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** sitemap.xml : vide tant que le site n'est pas lancé (site.indexable). Sans les pages légales, hors index (cf. legalRobots). */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable) return [];
  return ["", "/projets"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: site.updatedAt,
  }));
}
