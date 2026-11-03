"use client";

import { useLayoutEffect } from "react";
import { PetalIcon, PetalOffIcon } from "@/components/ui/icons";
import { cx } from "@/lib/cx";
import { PETALS_STORAGE_KEY } from "@/lib/theme";

function readStored() {
  try {
    return localStorage.getItem(PETALS_STORAGE_KEY) === "off";
  } catch {
    return false;
  }
}

function apply(off: boolean) {
  if (off) document.documentElement.setAttribute("data-petals", "off");
  else document.documentElement.removeAttribute("data-petals");
}

function toggle() {
  const off = document.documentElement.getAttribute("data-petals") !== "off";
  apply(off);
  try {
    localStorage.setItem(PETALS_STORAGE_KEY, off ? "off" : "on");
  } catch {
    // Stockage indisponible : le choix vaut pour cette page.
  }
}

type PetalsToggleProps = {
  /** text : lien du footer · icon : bouton rond du header, à côté du thème · menu : ligne du menu mobile. */
  variant?: "text" | "icon" | "menu";
  className?: string;
};

/**
 * Interrupteur des pétales : toute animation permanente doit pouvoir être coupée. Libellés
 * et icônes dépendent de data-petals en CSS : les exemplaires de la page restent d'accord.
 */
export function PetalsToggle({ variant = "text", className }: PetalsToggleProps) {
  // En développement, React remonte <html> et efface l'attribut : on le réapplique.
  useLayoutEffect(() => {
    apply(readStored());
  }, []);

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={toggle}
        className={cx(
          "size-11 shrink-0 press cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-muted hover:border-pink hover:text-pink",
          className,
        )}
      >
        <PetalIcon fill="currentColor" className="text-pink petals-off:hidden" />
        <PetalOffIcon className="hidden petals-off:block" />
        <span className="sr-only petals-off:hidden">Couper les pétales</span>
        <span className="sr-only hidden petals-off:inline">Remettre les pétales</span>
      </button>
    );
  }

  if (variant === "menu") {
    return (
      <button
        type="button"
        onClick={toggle}
        className={cx(
          "flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 font-mono text-xs text-muted press-text hover:text-pink motion-reduce:hidden",
          className,
        )}
      >
        <PetalIcon size={14} fill="currentColor" className="text-pink petals-off:hidden" />
        <PetalOffIcon size={14} className="hidden petals-off:block" />
        <span className="petals-off:hidden">couper les pétales</span>
        <span className="hidden petals-off:inline">remettre les pétales</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cx(
        "inline-flex cursor-pointer items-center underline underline-offset-2 press-text hover:text-pink motion-reduce:hidden pointer-coarse:min-h-11",
        className,
      )}
    >
      <span className="petals-off:hidden">couper les pétales</span>
      <span className="hidden petals-off:inline">remettre les pétales</span>
    </button>
  );
}
