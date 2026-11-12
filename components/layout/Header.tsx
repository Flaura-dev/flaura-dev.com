import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PhoneIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import { Brand } from "./Brand";
import { HeaderShell } from "./HeaderShell";
import { MobileMenu } from "./MobileMenu";
import { NavPill } from "./NavPill";
import { PetalsToggle } from "./PetalsToggle";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <HeaderShell>
      <Container className="flex items-center justify-between gap-2 py-[22px] min-[360px]:gap-6">
        <Brand />
        <NavPill />
        <div className="flex items-center gap-2.5 xl:gap-2">
          {site.petals && (
            <PetalsToggle variant="icon" className="hidden xl:motion-safe:inline-flex" />
          )}
          <ThemeToggle />
          <Link
            href="/#contact"
            className="group hidden min-h-11 press items-center gap-2.5 rounded-full border border-pink bg-pink/10 px-5 py-[13px] text-sm font-semibold text-fg hover:bg-pink hover:text-bg sm:inline-flex"
          >
            <PhoneIcon className="text-pink transition-colors group-hover:text-bg" />
            Réserver un appel
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </HeaderShell>
  );
}
