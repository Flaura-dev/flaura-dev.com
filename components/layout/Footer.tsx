import Image from "next/image";
import Link from "next/link";
import logoDark from "@/assets/logos/flaura-logo-long-slogan-blanc.webp";
import logoLight from "@/assets/logos/flaura-logo-long-slogan-noir.webp";
import { AvailabilityDot } from "@/components/ui/AvailabilityDot";
import { Container } from "@/components/ui/Container";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import { PetalsToggle } from "./PetalsToggle";

const columnTitle = "mb-1 font-mono text-xs text-pink";
// Au doigt, chaque lien fait au moins 44 px de haut (la colonne se resserre d'autant).
const linkClass =
  "press-text inline-flex items-center text-fg hover:text-pink pointer-coarse:min-h-11";
const columnClass = "flex flex-col gap-3 text-[0.9375rem] pointer-coarse:gap-1";
const legalLink =
  "press-text inline-flex items-center underline underline-offset-2 hover:text-pink pointer-coarse:min-h-11";

export function Footer() {
  return (
    <footer className="border-t border-line pt-16 pb-8">
      <Container className="flex flex-col gap-12">
        <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
          <div className="flex max-w-[23.75rem] flex-col gap-3.5">
            <Link
              href="/#accueil"
              aria-label="Flaura.dev, retour en haut"
              className="block w-full max-w-[340px] press-text"
            >
              <Image src={logoDark} alt="" sizes="340px" className="h-auto w-full light:hidden" />
              <Image src={logoLight} alt="" sizes="340px" className="h-auto w-full dark:hidden" />
            </Link>
            <p className="text-[0.9375rem] leading-[1.6] text-muted">
              Tes clients doivent pouvoir te trouver, ton site doit leur donner envie de te choisir.
            </p>
            {site.available && (
              <p className="flex items-center gap-2 font-mono text-xs text-muted">
                <AvailabilityDot />
                disponible pour de nouveaux projets
              </p>
            )}
          </div>

          <nav aria-label="Plan du site" className={columnClass}>
            <p className={columnTitle}>{"// navigation"}</p>
            <Link href="/#apropos" className={linkClass}>
              À propos
            </Link>
            <Link href="/#projets" className={linkClass}>
              Projets
            </Link>
            <Link href="/#offres" className={linkClass}>
              Offres
            </Link>
            <Link href="/#faq" className={linkClass}>
              FAQ
            </Link>
          </nav>

          <div className={columnClass}>
            <p className={columnTitle}>{"// contact"}</p>
            <Link href="/#contact" className={linkClass}>
              Réserver un appel
            </Link>
            <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
              {site.email}
            </a>
            <span className="text-muted">Var, France · remote</span>
          </div>

          <div className={columnClass}>
            <p className={columnTitle}>{"// réseaux"}</p>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} gap-1.5`}
            >
              LinkedIn
              <ArrowUpRightIcon />
              <span className="sr-only">(nouvel onglet)</span>
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} gap-1.5`}
            >
              GitHub
              <ArrowUpRightIcon />
              <span className="sr-only">(nouvel onglet)</span>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-xs text-muted">
          <span>© 2026 Flaura.dev · Laura Fontaine · [SIRET]</span>
          <span className="flex flex-wrap gap-5 pointer-coarse:gap-y-0">
            <Link href="/mentions-legales" className={legalLink}>
              mentions légales
            </Link>
            <Link href="/confidentialite" className={legalLink}>
              confidentialité
            </Link>
            {site.petals && <PetalsToggle />}
            <a
              href="#contenu"
              className="inline-flex items-center text-pink press-text hover:text-pink-hover pointer-coarse:min-h-11"
            >
              retour en haut ↑
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
