"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CopyIcon } from "@/components/ui/icons";
import { projectFilters, projects, type ProjectFilter } from "@/content/projects";
import { cx } from "@/lib/cx";
import { ProjectCard } from "./ProjectCard";

type ProjectsViewProps = {
  active: ProjectFilter | null;
  onSelect?: (filter: ProjectFilter | null) => void;
};

function ProjectsView({ active, onSelect }: ProjectsViewProps) {
  const [copied, setCopied] = useState(false);
  const visible = active ? projects.filter((p) => p.categories.includes(active)) : projects;
  const options = [{ slug: null, label: "tous" }, ...projectFilters];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-line py-3.5">
        <div
          role="group"
          aria-label="Filtrer les projets"
          className="flex flex-wrap gap-2 font-mono text-[13px]"
        >
          {options.map((option) => {
            const pressed = active === option.slug;
            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={pressed}
                onClick={() => {
                  setCopied(false);
                  onSelect?.(option.slug);
                }}
                className={cx(
                  "min-h-11 cursor-pointer rounded-full border px-4 py-2.5 transition-colors",
                  pressed
                    ? "border-pink bg-pink text-bg"
                    : "border-line text-fg hover:border-pink hover:text-pink",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-muted">
          <span>
            flaura-dev.com/projets
            {active && (
              <>
                ?type=<span className="text-pink">{active}</span>
              </>
            )}
          </span>
          <button
            type="button"
            onClick={copyLink}
            aria-label="Copier le lien de cette sélection"
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-pink hover:text-pink"
          >
            <CopyIcon />
          </button>
          <span role="status" className="text-pink">
            {copied ? "lien copié" : ""}
          </span>
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} variant="page" />
          ))}
        </div>
      ) : (
        <p className="text-muted">Aucun projet dans cette catégorie pour l’instant.</p>
      )}
    </>
  );
}

function ProjectsWithUrlState() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("type");
  const active = projectFilters.find((filter) => filter.slug === requested)?.slug ?? null;

  function select(filter: ProjectFilter | null) {
    // Next.js synchronise useSearchParams avec l'historique natif : pas de rechargement.
    window.history.replaceState(null, "", filter ? `/projets?type=${filter}` : "/projets");
  }

  return <ProjectsView active={active} onSelect={select} />;
}

/**
 * Liste filtrable des projets. Le filtre actif est dans l'URL (/projets?type=refonte),
 * ce qui permet de partager une sélection. Avant l'hydratation, tous les projets
 * s'affichent.
 */
export function ProjectsBrowser() {
  return (
    <Suspense fallback={<ProjectsView active={null} />}>
      <ProjectsWithUrlState />
    </Suspense>
  );
}
