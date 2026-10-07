"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/icons";
import { sections } from "@/content/site";
import { useActiveSection } from "@/lib/use-active-section";

/** Même valeur que --breakpoint-nav dans globals.css : au-delà, la pilule prend le relais. */
const NAV_BREAKPOINT = "(width >= 78rem)";

/**
 * Menu des petits écrans, dans un <dialog> modal : focus piégé, fermeture avec Échap,
 * le geste retour (Android) ou un clic à côté, et retour du focus sur le bouton.
 */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Le menu n'a plus lieu d'être si l'écran s'élargit (rotation d'une tablette).
    const wide = window.matchMedia(NAV_BREAKPOINT);
    const closeIfWide = () => {
      if (wide.matches) dialog.close();
    };
    wide.addEventListener("change", closeIfWide);

    // Safari ne gère pas encore closedby="any" : clic sur le fond = fermeture.
    const closeOnBackdrop = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const inside =
        rect.top <= event.clientY &&
        event.clientY <= rect.bottom &&
        rect.left <= event.clientX &&
        event.clientX <= rect.right;
      if (!inside) dialog.close();
    };
    const needsFallback = !("closedBy" in HTMLDialogElement.prototype);
    if (needsFallback) dialog.addEventListener("click", closeOnBackdrop);

    return () => {
      wide.removeEventListener("change", closeIfWide);
      if (needsFallback) dialog.removeEventListener("click", closeOnBackdrop);
    };
  }, []);

  function openMenu() {
    dialogRef.current?.showModal();
    setOpen(true);
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        type="button"
        onClick={openMenu}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="menu-mobile"
        className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-fg transition-colors hover:border-pink hover:text-pink nav:hidden"
      >
        <MenuIcon />
        <span className="sr-only">Ouvrir le menu</span>
      </button>

      <dialog
        ref={dialogRef}
        id="menu-mobile"
        aria-labelledby="menu-mobile-titre"
        closedby="any"
        onClose={() => setOpen(false)}
        className="menu-dialog inset-x-0 top-0 bottom-auto m-0 h-auto max-h-dvh w-full max-w-none overflow-y-auto border-0 bg-transparent p-0 text-fg"
      >
        <div className="rounded-b-3xl border-b border-line bg-surface px-5 pt-5 pb-8 md:px-10">
          <div className="flex items-center justify-between gap-4">
            <p
              id="menu-mobile-titre"
              className="font-mono text-xs tracking-[2px] text-muted uppercase"
            >
              {"// menu"}
            </p>
            <button
              type="button"
              onClick={closeMenu}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-pink hover:text-pink"
            >
              <CloseIcon />
              <span className="sr-only">Fermer le menu</span>
            </button>
          </div>

          <nav aria-label="Navigation principale" className="mt-6">
            <ul className="flex flex-col">
              {sections.map((section) => (
                <li key={section.id} className="border-b border-line last:border-b-0">
                  <Link
                    href={`/#${section.id}`}
                    onClick={closeMenu}
                    aria-current={active === section.id ? "true" : undefined}
                    className="flex min-h-14 items-baseline gap-4 py-2 text-fg transition-colors hover:text-pink aria-[current=true]:text-pink"
                  >
                    <span className="font-mono text-xs text-pink" aria-hidden="true">
                      {section.num}
                    </span>
                    <span className="font-display text-[40px] leading-none font-black uppercase">
                      {section.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ButtonLink href="/#contact" onClick={closeMenu} className="mt-6 w-full">
            <PhoneIcon />
            Réserver un appel
          </ButtonLink>
        </div>
      </dialog>
    </>
  );
}
