import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/projects/CtaBanner";
import { ProjectsBrowser } from "@/components/projects/ProjectsBrowser";
import { Container } from "@/components/ui/Container";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageUrls } from "@/lib/metadata";
import { projectsStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Projets : sites vitrines et créations web",
  description:
    "Les projets de Flaura.dev en détail : le point de départ, ce que j’ai fait et ce que ça a changé, avec le témoignage de la cliente.",
  ...pageUrls("/projets"),
};

/**
 * Tous les projets en version longue (l'accueil garde les cartes courtes), avec filtres.
 * Page hors menu : on y arrive par l'accueil et le pied de page.
 */
export default function ProjectsPage() {
  return (
    <main id="contenu" className="pt-8 pb-24">
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
          <p className="max-w-[400px] leading-[1.6] text-muted">
            Les sites et applications que j’ai conçus et développés. Pour chacun&nbsp;: le point de
            départ, ce que j’ai fait et ce que ça a changé.
          </p>
        </div>

        {/* Titre de la liste pour les lecteurs d'écran : les cartes sont en h3. */}
        <h2 className="sr-only">Sites vitrines, refontes et créations web</h2>
        <ProjectsBrowser />
        <CtaBanner />
      </Container>
      <JsonLd data={projectsStructuredData} />
    </main>
  );
}
