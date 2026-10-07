"use client";

import Link from "next/link";
import { sections } from "@/content/site";
import { useActiveSection } from "@/lib/use-active-section";

/** Menu en pilule (desktop). Le lien de la section en cours passe en rose. */
export function NavPill() {
  const active = useActiveSection();

  return (
    <nav
      aria-label="Navigation principale"
      className="hidden rounded-full border border-line bg-surface px-[30px] py-[13px] text-[13px] tracking-[1.5px] uppercase nav:block"
    >
      <ul className="flex gap-[30px]">
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              href={`/#${section.id}`}
              aria-current={active === section.id ? "true" : undefined}
              className="text-fg transition-colors hover:text-pink aria-[current=true]:text-pink"
            >
              {section.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
