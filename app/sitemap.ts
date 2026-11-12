import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// sans les pages légales (hors index)
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable) return [];
  return ["", "/projets"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: site.updatedAt,
  }));
}
