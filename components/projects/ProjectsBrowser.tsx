"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";
import { projectFilters, projects, testimonial, type ProjectFilter } from "@/content/projects";
import { site } from "@/content/site";
import { cx } from "@/lib/cx";
import { ProjectCaseStudy } from "./ProjectCaseStudy";
import { Testimonial } from "./Testimonial";

type ProjectsViewProps = {
  active: ProjectFilter | null;
  onSelect?: (filter: ProjectFilter | null) => void;
};

const COPY_FEEDBACK_MS = 2000;
const DISPLAY_URL = `${new URL(site.url).host}/projets`;

function ProjectsView({ active, onSelect }: ProjectsViewProps) {
  const [copy, setCopy] = useState<"idle" | "copied" | "failed">("idle");
  const resetTimer = useRef(0);
  const visible = active ? projects.filter((p) => p.categories.includes(active)) : projects;
  const options = [{ slug: null, label: "tous" }, ...projectFilters];

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  async function copyLink() {
    window.clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopy("copied");
    } catch {
      setCopy("failed");
    }
    resetTimer.current = window.setTimeout(() => setCopy("idle"), COPY_FEEDBACK_MS);
  }

  return (
    <>
      {projects.length > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-line py-3.5">
          <div
            role="group"
            aria-label="Filtrer les projets"
            className="flex flex-wrap gap-2 font-mono text-[0.8125rem]"
          >
            {options.map((option) => {
              const pressed = active === option.slug;
              return (
                <button
                  key={option.label}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => onSelect?.(option.slug)}
                  className={cx(
                    "min-h-11 press cursor-pointer rounded-full border px-4 py-2.5",
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
              {DISPLAY_URL}
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
              className={cx(
                "inline-flex size-11 press cursor-pointer items-center justify-center rounded-full border hover:border-pink hover:text-pink",
                copy === "copied" ? "border-pink text-pink" : "border-line text-fg",
              )}
            >
              {copy === "copied" ? <CheckIcon /> : <CopyIcon />}
            </button>
            <span role="status" className="text-pink">
              {copy === "copied" && "lien copié"}
              {copy === "failed" && "copie impossible : copie l’adresse à la main"}
            </span>
          </div>
        </div>
      )}

      <p role="status" className="sr-only">
        {active
          ? `${visible.length} projet${visible.length > 1 ? "s" : ""} affiché${visible.length > 1 ? "s" : ""}`
          : ""}
      </p>
      {visible.length > 0 ? (
        <div className="flex flex-col gap-10">
          {visible.map((project, index) => (
            <ProjectCaseStudy key={project.slug} project={project} eager={index === 0}>
              {testimonial.projectSlug === project.slug && (
                <Testimonial className="border-t border-line px-6 py-9 md:px-9 md:py-11" />
              )}
            </ProjectCaseStudy>
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
    // Next suit l'historique natif : pas de rechargement
    window.history.replaceState(null, "", filter ? `/projets?type=${filter}` : "/projets");
  }

  return <ProjectsView active={active} onSelect={select} />;
}

// filtre dans l'URL : /projets?type=refonte
export function ProjectsBrowser() {
  return (
    <Suspense fallback={<ProjectsView active={null} />}>
      <ProjectsWithUrlState />
    </Suspense>
  );
}
