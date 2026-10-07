import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** robots.txt : tant que le site n'est pas lancé (site.indexable), rien n'est exploré. */
export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return { rules: { userAgent: "*", allow: "/" } };
}
