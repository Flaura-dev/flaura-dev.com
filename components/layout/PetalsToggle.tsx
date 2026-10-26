"use client";

import { useLayoutEffect } from "react";
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

/** Interrupteur des pétales (footer) : toute animation permanente doit pouvoir être coupée. */
export function PetalsToggle() {
  // En développement, React remonte <html> et efface l'attribut : on le réapplique.
  useLayoutEffect(() => {
    apply(readStored());
  }, []);

  function toggle() {
    const off = document.documentElement.getAttribute("data-petals") !== "off";
    apply(off);
    try {
      localStorage.setItem(PETALS_STORAGE_KEY, off ? "off" : "on");
    } catch {
      // Stockage indisponible : le choix vaut pour cette page.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex cursor-pointer items-center underline underline-offset-2 press-text hover:text-pink motion-reduce:hidden pointer-coarse:min-h-11"
    >
      <span className="petals-off:hidden">couper les pétales</span>
      <span className="hidden petals-off:inline">remettre les pétales</span>
    </button>
  );
}
