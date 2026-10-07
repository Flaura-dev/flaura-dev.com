import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Brand } from "./Brand";
import { HeaderShell } from "./HeaderShell";
import { MobileMenu } from "./MobileMenu";
import { NavPill } from "./NavPill";
import { ThemeToggle } from "./ThemeToggle";

/*
 * Logo, pilule et boutons font environ 1 160 px de large : la pilule n'apparaît qu'à
 * partir du breakpoint « nav » (78rem). En dessous, un bouton ouvre le menu mobile.
 */
export function Header() {
  return (
    <HeaderShell>
      <Container className="flex items-center justify-between gap-6 py-[22px]">
        <Brand />
        <NavPill />
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="/#contact"
            className="group hidden min-h-11 items-center gap-2.5 rounded-full border border-pink px-5 py-[13px] text-sm font-medium text-fg transition-colors hover:bg-pink hover:text-bg sm:inline-flex"
          >
            <span
              className="size-2 rounded-full bg-pink transition-colors group-hover:bg-bg"
              aria-hidden="true"
            />
            Réserver un appel
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </HeaderShell>
  );
}
