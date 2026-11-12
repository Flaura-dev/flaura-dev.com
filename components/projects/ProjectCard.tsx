import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { Project } from "@/content/projects";
import { cx } from "@/lib/cx";
import { ProjectVisual } from "./ProjectVisual";

type ProjectCardProps = {
  project: Project;
  wide?: boolean;
};

export function ProjectCard({ project, wide = false }: ProjectCardProps) {
  return (
    <article
      className={cx(
        "group flex flex-col overflow-clip rounded-3xl border border-line bg-surface",
        wide && "md:col-span-full md:grid md:grid-cols-2",
      )}
    >
      <div className={cx("relative h-[230px] overflow-clip", wide && "md:h-auto md:min-h-[300px]")}>
        <ProjectVisual project={project} eager={false} />
      </div>
      <div className={cx("flex flex-1 flex-col gap-3 p-6", wide && "md:justify-center md:p-8")}>
        <p className="font-mono text-xs text-pink">{project.label}</p>
        <div className="@container flex items-start justify-between gap-4">
          {/* titre réduit pour tenir à côté du lien */}
          <h3 className="font-display-auto text-[length:min(2.125rem,calc((100cqw_-_3.75rem)/9.5))] leading-none font-black uppercase">
            {project.title}
          </h3>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Voir le site en ligne : ${project.title} (nouvel onglet)`}
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
