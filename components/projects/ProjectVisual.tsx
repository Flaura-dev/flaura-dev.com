import type { Project } from "@/content/projects";
import { BeforeAfter } from "./BeforeAfter";

/*
 * Visuels provisoires repris de la maquette, en attendant les vraies images
 * (captures avant/après du site de Léa, visuels des projets).
 */

function LeaBefore() {
  return (
    <div className="flex size-full flex-col gap-2 bg-[#DAD8D6] px-5 pt-[70px] pb-5 [filter:grayscale(1)_brightness(0.85)]">
      <div className="h-[22px] bg-[#7C8A99]" />
      <div className="flex gap-1.5">
        <div className="h-[70px] flex-1 bg-[#B7BEC6]" />
        <div className="flex flex-1 flex-col gap-[5px]">
          <div className="h-[5px] bg-[#A9AFB5]" />
          <div className="h-[5px] bg-[#A9AFB5]" />
          <div className="h-[5px] bg-[#A9AFB5]" />
          <div className="h-[5px] w-3/5 bg-[#A9AFB5]" />
        </div>
      </div>
      <div className="flex gap-1.5">
        <div className="h-10 flex-1 bg-[#CDD2D7]" />
        <div className="h-10 flex-1 bg-[#CDD2D7]" />
        <div className="h-10 flex-1 bg-[#CDD2D7]" />
      </div>
    </div>
  );
}

function LeaAfter() {
  return (
    <div className="flex size-full gap-3.5 bg-[#F4EFE8] px-5 pt-[70px] pb-5">
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-3 w-[85%] rounded-[3px] bg-[#3A3542]" />
        <div className="h-3 w-3/5 rounded-[3px] bg-[#3A3542]" />
        <div className="mt-1.5 h-[5px] w-[90%] rounded-[3px] bg-[#DDD3C5]" />
        <div className="mt-2 h-[18px] w-[70px] rounded-full bg-[#8E9F86]" />
      </div>
      <div className="w-[90px] rounded-[45px_45px_8px_8px] bg-[#C9D3C0]" />
    </div>
  );
}

function PenduVisual() {
  return (
    <div
      aria-hidden="true"
      className="flex size-full items-center justify-center gap-6 bg-[#1D1924]"
    >
      <svg
        width="80"
        height="110"
        viewBox="0 0 90 120"
        fill="none"
        stroke="#F3EDF0"
        strokeWidth="4"
        strokeLinecap="round"
      >
        <path d="M10 115h50M25 115V10h45v18" />
        <circle cx="70" cy="40" r="10" />
        <path d="M70 50v30M70 60l-12 10M70 60l12 10" />
      </svg>
      <span className="font-mono text-[26px] tracking-[6px] text-pink">_A__E</span>
    </div>
  );
}

function AilleursVisual() {
  return (
    <div aria-hidden="true" className="flex size-full items-center justify-center bg-[#161A26]">
      <div className="relative size-[150px] overflow-hidden rounded-full border-[1.5px] border-[#8C93B0] shadow-[0_0_60px_#3B3F66]">
        <div className="absolute inset-x-10 inset-y-0 rounded-full border-[1.5px] border-[#4E5576]" />
        <div className="absolute inset-x-3 inset-y-0 rounded-full border-[1.5px] border-[#4E5576]" />
        <div className="absolute inset-x-0 top-1/2 h-[1.5px] bg-[#4E5576]" />
        <div className="absolute inset-x-0 top-[28%] h-[1.5px] bg-[#3A3F5A]" />
        <div className="absolute inset-x-0 top-[72%] h-[1.5px] bg-[#3A3F5A]" />
        <div className="absolute top-[38px] left-11 size-2.5 rounded-full bg-pink" />
        <div className="absolute top-[84px] left-[94px] size-2.5 rounded-full bg-pink" />
      </div>
    </div>
  );
}

export function ProjectVisual({ project }: { project: Project }) {
  switch (project.visual) {
    case "lea":
      return (
        <BeforeAfter
          before={<LeaBefore />}
          after={<LeaAfter />}
          label="Comparer l’ancien et le nouveau site"
        />
      );
    case "pendu":
      return <PenduVisual />;
    case "ailleurs":
      return <AilleursVisual />;
  }
}
