"use client";

import Link from "next/link";
import { sections } from "@/content/site";
import { useActiveSection } from "@/lib/use-active-section";

/** Menu en pilule (desktop). Section en cours en rose, bulle de survol (cf. .nav-bubble). */
export function NavPill() {
  const active = useActiveSection();

  return (
    <nav
      aria-label="Navigation principale"
      className="hidden rounded-full border border-line bg-surface px-[18px] py-[7px] text-[13px] tracking-[1.5px] uppercase nav:block"
    >
      <ul className="nav-bubble flex gap-1.5">
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              href={`/#${section.id}`}
              aria-current={active === section.id ? "true" : undefined}
              className="block rounded-full px-3 py-1.5 text-fg transition-colors hover:text-pink focus-visible:outline-offset-0 aria-[current=true]:text-pink"
            >
              {section.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
