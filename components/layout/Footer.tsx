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
const linkClass = "text-fg transition-colors hover:text-pink";

export function Footer() {
  return (
    <footer className="border-t border-line pt-16 pb-8">
      <Container className="flex flex-col gap-12">
        <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
          <div className="flex max-w-[380px] flex-col gap-3.5">
            <Link
              href="/#accueil"
              aria-label="Flaura.dev, retour en haut"
              className="block w-full max-w-[340px]"
            >
              <Image src={logoDark} alt="" sizes="340px" className="h-auto w-full light:hidden" />
              <Image src={logoLight} alt="" sizes="340px" className="h-auto w-full dark:hidden" />
            </Link>
            <p className="text-[15px] leading-[1.6] text-muted md:whitespace-nowrap">
              Créative dans le design. Rigoureuse dans le code.
            </p>
            {site.available && (
              <p className="flex items-center gap-2 font-mono text-xs text-muted">
                <AvailabilityDot />
                disponible pour de nouveaux projets
              </p>
            )}
          </div>

          <nav aria-label="Plan du site" className="flex flex-col gap-3 text-[15px]">
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

          <div className="flex flex-col gap-3 text-[15px]">
            <p className={columnTitle}>{"// contact"}</p>
            <Link href="/#contact" className={linkClass}>
              Réserver un appel
            </Link>
            <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
              {site.email}
            </a>
            <span className="text-muted">Var, France · remote</span>
          </div>

          <div className="flex flex-col gap-3 text-[15px]">
            <p className={columnTitle}>{"// réseaux"}</p>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} inline-flex items-center gap-1.5`}
            >
              LinkedIn
              <ArrowUpRightIcon />
              <span className="sr-only">(nouvel onglet)</span>
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} inline-flex items-center gap-1.5`}
            >
              GitHub
              <ArrowUpRightIcon />
              <span className="sr-only">(nouvel onglet)</span>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-xs text-muted">
          <span>© 2026 Flaura.dev · Laura Fontaine · [SIRET]</span>
          <span className="flex flex-wrap gap-5">
            <Link href="/mentions-legales" className="underline underline-offset-2 hover:text-pink">
              mentions légales
            </Link>
            <Link href="/confidentialite" className="underline underline-offset-2 hover:text-pink">
              confidentialité
            </Link>
            {site.petals && <PetalsToggle />}
            <a href="#contenu" className="text-pink hover:text-pink-hover">
              retour en haut ↑
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
