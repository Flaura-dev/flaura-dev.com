import Link from "next/link";
import { CtaBanner } from "@/components/projects/CtaBanner";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Testimonial } from "@/components/projects/Testimonial";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_PROJECTS_COUNT, projects, SHOW_ALL_PROJECTS_FROM } from "@/content/projects";

export function Projects() {
  return (
    <section id="projets" aria-labelledby="projets-titre" className="py-24">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading num="02" id="projets-titre" className="whitespace-nowrap">
            Projets
          </SectionHeading>
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

        {projects.length >= SHOW_ALL_PROJECTS_FROM && (
          <div className="flex justify-center">
            <Link
              href="/projets"
              className="inline-flex min-h-12 items-center gap-3 rounded-full border border-line px-[26px] py-4 font-mono text-sm text-fg transition-colors hover:border-pink hover:text-pink"
            >
              voir tous les projets
              <ArrowRightIcon />
            </Link>
          </div>
        )}

        <Testimonial />
      </Container>
    </section>
  );
}
