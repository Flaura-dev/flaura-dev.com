import Image from "next/image";
import heroPhoto from "@/assets/photos/laura-hero-detouree.webp";
import { AvailabilityDot } from "@/components/ui/AvailabilityDot";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { site } from "@/content/site";

/*
 * Grand écran (xl) : la composition de la maquette, en positions absolues exprimées en
 * unités cqi (% de la largeur de la colonne) — à 1 200 px de large, on retombe exactement
 * sur les valeurs de la maquette, et tout se réduit proportionnellement en dessous.
 * Plus petit : la même chose empilée (titre, photo qui chevauche le bas du titre,
 * accroche et bouton, carte « disponible »).
 */
export function Hero() {
  return (
    <section id="accueil" className="pt-6 pb-16">
      <Container>
        <div className="@container">
          <div className="relative xl:h-[58.33cqi]">
            <h1 className="relative text-center font-display text-[min(330px,27.5cqi)] leading-[0.82] font-black tracking-[-0.012em] xl:absolute xl:inset-x-0 xl:top-[0.83cqi]">
              <span aria-hidden="true">
                <span className="uppercase">Flaura</span>
                <span className="ml-[0.024em] font-mono text-[max(14px,0.158em)] font-medium tracking-normal text-pink">
                  .dev_
                </span>
              </span>
              <span className="sr-only">
                Flaura.dev — Laura Fontaine, développeuse web freelance dans le Var
              </span>
            </h1>

            <div className="relative mx-auto -mt-[9.2cqi] w-[min(480px,82cqi)] xl:absolute xl:top-[14.17cqi] xl:left-1/2 xl:mt-0 xl:w-[45cqi] xl:-translate-x-1/2">
              <div
                aria-hidden="true"
                className="absolute top-0 left-1/2 -mt-[3.7%] aspect-[460/420] w-[85%] -translate-x-1/2 rounded-full bg-[#C2457A] opacity-50 blur-[7.5cqi]"
              />
              <Image
                src={heroPhoto}
                alt="Laura, développeuse web"
                sizes="(min-width: 1280px) 540px, (min-width: 640px) 480px, 82vw"
                loading="eager"
                fetchPriority="high"
                className="relative block h-auto w-full [filter:saturate(0.9)_contrast(1.05)_drop-shadow(0_0_40px_rgb(240_127_162/0.25))]"
              />
            </div>

            <div className="relative mt-6 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between xl:static xl:mt-0">
              <div className="flex max-w-[360px] flex-col gap-[18px] xl:absolute xl:bottom-0 xl:left-0">
                <p className="font-mono text-xs tracking-[2px] text-pink uppercase">
                  {"// Développeuse web freelance"}
                </p>
                <p className="font-display text-[44px] leading-none font-bold uppercase">
                  Créative dans le design. Rigoureuse dans le code
                  <span className="text-pink">.</span>
                </p>
                <ButtonLink href="/#contact" className="self-start">
                  Réserver un appel
                  <ArrowRightIcon />
                </ButtonLink>
              </div>

              {site.available && (
                <div className="flex flex-col gap-3.5 rounded-[20px] border border-line bg-surface p-[22px] sm:w-[260px] xl:absolute xl:right-0 xl:bottom-0">
                  <p className="flex items-center gap-2 font-mono text-xs text-muted uppercase">
                    <AvailabilityDot />
                    Disponible
                  </p>
                  <p className="text-lg leading-[1.3] font-semibold">
                    Freelance
                    <br />
                    <span className="font-normal text-muted">Var · France en remote</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
