import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import type { Project } from "@/content/projects";
import { ProjectVisual } from "./ProjectVisual";

type ProjectCardProps = {
  project: Project;
  /** Accueil : la flèche mène à la page /projets. Sur /projets : lien vers le site, s'il existe. */
  variant: "home" | "page";
};

const arrowClass =
  "mt-auto inline-flex size-11 items-center justify-center self-end rounded-full border border-pink text-pink transition-colors hover:bg-pink hover:text-bg";

export function ProjectCard({ project, variant }: ProjectCardProps) {
  return (
    <article
      id={variant === "page" ? project.slug : undefined}
      className="flex scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-line bg-surface"
    >
      <div className="relative h-[230px] overflow-hidden">
        <ProjectVisual project={project} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="font-mono text-xs text-pink">{project.label}</p>
        <h3 className="font-display text-[34px] leading-none font-black uppercase">
          {project.title}
        </h3>
        <p className="text-sm leading-[1.6] text-muted">
          {project.description ?? (
            <>
              <strong className="font-semibold text-fg">Problème</strong> {project.problem} ·{" "}
              <strong className="font-semibold text-fg">Solution</strong> {project.solution} ·{" "}
              <strong className="font-semibold text-fg">Résultat</strong> {project.result}
            </>
          )}
        </p>

        {variant === "home" && (
          <Link
            href={`/projets#${project.slug}`}
            aria-label={`Voir le projet : ${project.title}`}
            className={arrowClass}
          >
            <ArrowRightIcon />
          </Link>
        )}
        {variant === "page" && project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Voir le site en ligne : ${project.title} (nouvel onglet)`}
            className={arrowClass}
          >
            <ArrowUpRightIcon size={16} />
          </a>
        )}
      </div>
    </article>
  );
}
