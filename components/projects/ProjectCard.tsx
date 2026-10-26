import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { Project } from "@/content/projects";
import { ProjectVisual } from "./ProjectVisual";

type ProjectCardProps = {
  project: Project;
  /** Sur /projets, chaque carte porte une ancre (/projets#slug). */
  withAnchor?: boolean;
};

/** Carte projet, avec un lien ↗ quand le site est en ligne. */
export function ProjectCard({ project, withAnchor = false }: ProjectCardProps) {
  return (
    <article
      id={withAnchor ? project.slug : undefined}
      className="group flex scroll-mt-28 flex-col overflow-clip rounded-3xl border border-line bg-surface"
    >
      <div className="relative h-[230px] overflow-clip">
        <ProjectVisual project={project} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="font-mono text-xs text-pink">{project.label}</p>
        {/* Le lien ↗ déborde sans agrandir la ligne : les titres restent alignés entre les cartes. */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[2.125rem] leading-none font-black uppercase">
            {project.title}
          </h3>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Voir le site en ligne : ${project.title} (nouvel onglet)`}
              className="-my-1.5 inline-flex size-11 shrink-0 press items-center justify-center rounded-full border border-pink text-pink hover:bg-pink hover:text-bg"
            >
              <ArrowUpRightIcon size={16} />
            </a>
          )}
        </div>
        {project.description ? (
          <p className="text-sm leading-[1.6] text-pretty text-muted">{project.description}</p>
        ) : (
          <dl className="space-y-1.5 text-sm leading-[1.6] text-balance text-muted">
            {(
              [
                ["Problème", project.problem],
                ["Solution", project.solution],
                ["Résultat", project.result],
              ] as const
            ).map(([term, text]) => (
              <div key={term}>
                <dt className="inline font-semibold text-fg">{term}&nbsp;:</dt>{" "}
                <dd className="inline">{text}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </article>
  );
}
