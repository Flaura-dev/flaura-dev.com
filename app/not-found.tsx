import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Page introuvable",
};

/** Page 404 de tout le site (adresse inconnue). Next y ajoute lui-même noindex et le statut 404. */
export default function NotFound() {
  return (
    <main id="contenu" className="pt-16 pb-28">
      <Container className="flex flex-col items-start gap-6">
        <p
          aria-hidden="true"
          className="font-display text-[clamp(7rem,4rem+14vw,15rem)] leading-[0.8] font-black text-pink"
        >
          404
        </p>
        <p className="font-mono text-xs tracking-[0.17em] text-pink uppercase">{"// erreur 404"}</p>
        <h1 className="font-display text-section font-black uppercase">Page introuvable</h1>
        <p className="max-w-[34rem] text-[1.1875rem] leading-[1.6] text-muted">
          Cette page n’existe pas, ou plus. Le lien est peut-être incomplet, ou la page a déménagé.
          Pas de panique, tout le reste est là.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <ButtonLink href="/">
            <ArrowLeftIcon />
            Retour à l’accueil
          </ButtonLink>
          <Link
            href="/projets"
            className="inline-flex min-h-12 press items-center justify-center gap-3 rounded-full border border-line px-6 py-[15px] text-[0.9375rem] font-semibold text-fg hover:border-pink hover:text-pink"
          >
            Voir les projets
            <ArrowRightIcon />
          </Link>
        </div>
      </Container>
    </main>
  );
}
