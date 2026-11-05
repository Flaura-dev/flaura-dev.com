import type { ReactNode } from "react";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { Project } from "@/content/projects";
import { ProjectVisual } from "./ProjectVisual";

/** Le visuel occupe toute la largeur de la colonne de contenu (1 200 px au plus). */
const CASE_SHOT_SIZES = "(min-width: 1280px) 1200px, 100vw";

type ProjectCaseStudyProps = {
  project: Project;
  /** Premier projet de la page : captures chargées tout de suite. */
  eager?: boolean;
  /** Bas de l'encart, sur toute sa largeur : le témoignage du client. */
  children?: ReactNode;
};

/**
 * Version longue d'un projet, sur /projets : le visuel en grand, puis les repères (type,
 * pages, année…) à gauche et le récit à droite. Sur mobile, tout se suit sur une colonne.
 */
export function ProjectCaseStudy({ project, eager = false, children }: ProjectCaseStudyProps) {
  const { caseStudy } = project;
  const facts = [...caseStudy.facts, ["Année", String(project.year)]];

  return (
    <article
      id={project.slug}
      className="scroll-mt-28 overflow-clip rounded-3xl border border-line bg-surface"
    >
      <div className="relative h-[230px] overflow-clip sm:h-[320px] lg:h-[440px]">
        <ProjectVisual project={project} eager={eager} sizes={CASE_SHOT_SIZES} />
      </div>
      <div className="grid gap-x-12 gap-y-8 p-6 md:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="flex flex-col gap-5">
          <p className="font-mono text-xs text-pink">{project.label}</p>
          {/* Le lien ↗ déborde sans agrandir la ligne, comme sur la carte. */}
          <div className="@container flex items-start justify-between gap-4">
            {/* Même règle que la carte : « Consultante Business » (insécable) mesure environ 9,3 fois
                la taille de la police et doit tenir dans la colonne, à côté du lien ↗ (3,75 rem). */}
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
          <dl className="flex flex-col border-t border-line text-sm leading-[1.5]">
            {facts.map(([term, value]) => (
              <div
                key={term}
                className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 border-b border-line py-2.5"
              >
                <dt className="font-mono text-xs leading-[1.75] text-muted">{term}</dt>
                <dd className="text-pretty">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex max-w-[68ch] flex-col gap-7">
          {caseStudy.sections.map((section) => (
            <section key={section.title} className="flex flex-col gap-2.5">
              <h4 className="text-[1.0625rem] font-semibold">{section.title}</h4>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-[1.7] text-pretty text-muted">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          {caseStudy.note && <p className="font-mono text-xs text-muted">{caseStudy.note}</p>}
        </div>
      </div>
      {children}
    </article>
  );
}
