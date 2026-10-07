import Link from "next/link";
import { CtaBanner } from "@/components/projects/CtaBanner";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Testimonial } from "@/components/projects/Testimonial";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_PROJECTS_COUNT, projects } from "@/content/projects";

export function Projects() {
  return (
    <section id="projets" aria-labelledby="projets-titre" className="py-24">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
            <SectionHeading num="02" id="projets-titre" className="whitespace-nowrap">
              Projets
            </SectionHeading>
            {/* Petit bouton vers /projets : 34 px de haut à l'œil, 44 px de zone cliquable. */}
            <Link
              href="/projets"
              className="relative mb-2 inline-flex h-[34px] items-center gap-2 rounded-full border border-pink/60 px-3.5 font-mono text-xs text-fg transition-colors after:absolute after:inset-x-0 after:-inset-y-1.5 hover:border-pink hover:bg-pink hover:text-bg"
            >
              voir tous les projets
              <ArrowRightIcon size={14} />
            </Link>
          </div>
          <p className="max-w-[340px] leading-[1.6] text-muted">
            Chaque projet&nbsp;: le problème de départ, la solution apportée, et ce que ça a changé.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {projects.slice(0, HOME_PROJECTS_COUNT).map((project) => (
            <ProjectCard key={project.slug} project={project} variant="home" />
          ))}
          <CtaBanner />
        </div>

        <Testimonial />
      </Container>
    </section>
  );
}
