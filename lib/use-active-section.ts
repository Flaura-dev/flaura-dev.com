"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { sections, type SectionId } from "@/content/site";

/*
 * Section en cours, pour la navigation, le menu mobile et le fil conducteur : celle qui
 * traverse une ligne horizontale placée à 40 % de la hauteur de l'écran.
 */
export function useActiveSection(): SectionId | null {
  const pathname = usePathname();
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname.startsWith("/projets")) return "projets";
  if (pathname !== "/") return null;
  return active ?? sections[0].id;
}
