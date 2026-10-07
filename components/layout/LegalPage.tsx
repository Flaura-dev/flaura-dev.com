import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowLeftIcon } from "@/components/ui/icons";

/** Gabarit des pages légales (mentions légales, confidentialité). */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main id="contenu" className="pt-8 pb-24">
      <Container className="flex max-w-3xl flex-col gap-8">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 self-start font-mono text-xs text-muted transition-colors hover:text-pink"
        >
          <ArrowLeftIcon size={14} />
          retour à l’accueil
        </Link>
        <h1 className="font-display text-section font-black uppercase">{title}</h1>
        <div className="flex flex-col gap-6 leading-[1.7] text-muted [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-fg">
          {children}
        </div>
      </Container>
    </main>
  );
}
