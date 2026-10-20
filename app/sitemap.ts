import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** sitemap.xml : vide tant que le site n'est pas lancé (site.indexable). Les pages légales en sont exclues tant qu'elles sont en noindex. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable) return [];
  return [{ url: site.url }, { url: `${site.url}/projets` }];
}
