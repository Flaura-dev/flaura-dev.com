import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/projects/CtaBanner";
import { ProjectsBrowser } from "@/components/projects/ProjectsBrowser";
import { Container } from "@/components/ui/Container";
import { ArrowLeftIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Les projets de Flaura.dev : sites vitrines, refontes et applications web, avec pour chacun le problème de départ, la solution apportée et le résultat.",
  alternates: { canonical: "/projets" },
};

/** Tous les projets, avec filtres. Page hors menu : on y arrive par les cartes de l'accueil. */
export default function ProjectsPage() {
  return (
    <main id="contenu" className="pt-8 pb-24">
      <Container className="flex flex-col gap-8">
        <Link
          href="/#projets"
          className="inline-flex min-h-11 items-center gap-2 self-start font-mono text-xs text-muted transition-colors hover:text-pink"
        >
          <ArrowLeftIcon size={14} />
          retour à l’accueil
        </Link>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display text-section font-black uppercase">Projets</h1>
          <p className="max-w-[340px] leading-[1.6] text-muted">
            Chaque projet&nbsp;: le problème de départ, la solution apportée, et ce que ça a changé.
          </p>
        </div>

        <ProjectsBrowser />
        <CtaBanner />
      </Container>
    </main>
  );
}
