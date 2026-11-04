import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/projects/CtaBanner";
import { ProjectsBrowser } from "@/components/projects/ProjectsBrowser";
import { Container } from "@/components/ui/Container";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { projectsPage } from "@/content/projects";
import { pageUrls } from "@/lib/metadata";
import { projectsStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Projets : sites vitrines et créations web",
  description: projectsPage.description,
  ...pageUrls("/projets"),
};

/**
 * Tous les projets en version longue (l'accueil garde les cartes courtes), avec filtres.
 * Page hors menu : on y arrive par l'accueil et le pied de page.
 */
export default function ProjectsPage() {
  return (
    <main id="contenu" tabIndex={-1} className="pt-8 pb-24 outline-none">
      <Container className="flex flex-col gap-8">
        <Link
          href="/#projets"
          className="inline-flex min-h-11 items-center gap-2 self-start font-mono text-xs text-muted press-text hover:text-pink"
        >
          <ArrowLeftIcon size={14} />
          retour à l’accueil
        </Link>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display text-section font-black uppercase">Projets</h1>
          <p className="max-w-[400px] leading-[1.6] text-muted">{projectsPage.intro}</p>
        </div>

        {/* Titre de la liste pour les lecteurs d'écran : les cartes sont en h3. */}
        <h2 className="sr-only">{projectsPage.listTitle}</h2>
        <ProjectsBrowser />
        <CtaBanner />
      </Container>
      <JsonLd data={projectsStructuredData} />
    </main>
  );
}
