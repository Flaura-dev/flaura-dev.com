import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { legalPages, type LegalPath } from "@/content/legal";
import { cx } from "@/lib/cx";

export type LegalSection = {
  /** Ancre de la section : on peut y renvoyer depuis un devis (/cgv#article-4). */
  id: string;
  num: string;
  /** Numéro affiché dans le sommaire, si `num` est trop long pour sa colonne (« A » pour « annexe »). */
  tocNum?: string;
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  path: LegalPath;
  title: string;
  subtitle?: string;
  /** Date de mise à jour ou version, sous le titre. */
  meta: ReactNode;
  intro?: ReactNode;
  sections: LegalSection[];
};

/** Gabarit des pages légales : pages et sommaire à gauche (en haut sur mobile), texte à droite. */
export function LegalPage({ path, title, subtitle, meta, intro, sections }: LegalPageProps) {
  return (
    <main id="contenu" className="pt-8 pb-24">
      <Container className="flex flex-col gap-8">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 self-start font-mono text-xs text-muted press-text hover:text-pink"
        >
          <ArrowLeftIcon size={14} />
          retour à l’accueil
        </Link>

        <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] xl:gap-16">
          <div className="flex [scrollbar-width:thin] [scrollbar-color:var(--line)_transparent] flex-col gap-10 lg:sticky lg:top-28 lg:max-h-[calc(100dvh-8rem)] lg:self-start lg:overflow-y-auto">
            <nav aria-labelledby="pages-legales" className="flex flex-col gap-4">
              <p id="pages-legales" className="font-mono text-xs text-pink">
                {"// informations légales"}
              </p>
              <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                {legalPages.map((page) => {
                  const current = page.href === path;
                  return (
                    <li key={page.href}>
                      <Link
                        href={page.href}
                        aria-current={current ? "page" : undefined}
                        className={cx(
                          "inline-flex min-h-11 press items-center rounded-full border px-4 text-[0.9375rem] lg:flex lg:rounded-xl lg:px-3.5",
                          current
                            ? "border-transparent bg-pink/14 text-fg opaque:bg-surface"
                            : "border-line text-muted hover:text-pink lg:border-transparent",
                        )}
                      >
                        {page.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <nav aria-labelledby="sommaire" className="hidden flex-col gap-3 lg:flex">
              <p id="sommaire" className="font-mono text-xs text-pink">
                {"// sur cette page"}
              </p>
              <ol className="flex flex-col">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex items-baseline gap-3 py-1.5 text-sm leading-[1.4] text-muted press-text hover:text-pink pointer-coarse:min-h-11 pointer-coarse:items-center"
                    >
                      <span className="w-7 shrink-0 font-mono text-[0.6875rem] text-dim">
                        {section.tocNum ?? section.num}
                      </span>{" "}
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <article className="flex max-w-3xl min-w-0 flex-col gap-12">
            <header
              id={`${path.slice(1)}-haut`}
              data-rail-num="00"
              data-rail-label={title}
              className="flex flex-col gap-4"
            >
              <h1 className="font-display text-[clamp(2.5rem,1.4rem+4.5vw,5.5rem)] leading-[0.9] font-black uppercase">
                {title}
              </h1>
              {subtitle && <p className="text-[1.1875rem] leading-[1.6] text-muted">{subtitle}</p>}
              <p className="font-mono text-xs text-muted">{meta}</p>
            </header>

            {intro && <div className="legal-prose">{intro}</div>}

            {/* data-rail-* : repères du fil conducteur (ScrollRail). */}
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-titre`}
                data-rail-num={section.tocNum ?? section.num}
                data-rail-label={section.title}
                className="flex flex-col gap-5 border-t border-line pt-10"
              >
                <h2
                  id={`${section.id}-titre`}
                  className="flex items-baseline gap-4 font-display-auto text-[1.75rem] leading-none font-black uppercase md:text-[2rem]"
                >
                  <span className="font-mono text-sm font-normal text-pink">{section.num}</span>{" "}
                  {section.title}
                </h2>
                <div className="legal-prose">{section.content}</div>
              </section>
            ))}
          </article>
        </div>
      </Container>
    </main>
  );
}

/** Fiche d'identité (éditrice, hébergeur, prestataire) : intitulé à gauche, valeur à droite. */
export function LegalFacts({ items }: { items: { term: string; value: ReactNode }[] }) {
  return (
    <dl className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 sm:grid sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-baseline sm:gap-x-8 sm:gap-y-3 md:p-6">
      {items.map(({ term, value }) => (
        <div key={term} className="flex flex-col gap-1 sm:contents">
          <dt className="font-mono text-xs text-muted">{term}</dt>
          <dd className="text-fg">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Information encore manquante : reste visible tant qu'elle n'est pas fournie. */
export function Todo({ children }: { children: ReactNode }) {
  return <span className="font-mono text-[0.875em] text-pink">[{children}]</span>;
}

/** Lien vers un autre site, ouvert dans un nouvel onglet. */
export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (nouvel onglet)</span>
    </a>
  );
}
