import Image from "next/image";
import photo from "@/assets/photos/laura-ordi.jpg";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, MapPinIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { career } from "@/content/about";
import { cx } from "@/lib/cx";

/*
 * Bento sur 4 colonnes (desktop) : photo sur deux rangées, présentation, « Var, France »,
 * puis le parcours. Une seule colonne sur mobile.
 */
export function About() {
  return (
    <section id="apropos" aria-labelledby="apropos-titre" className="pt-[120px] pb-24">
      <Container className="flex flex-col gap-8">
        <SectionHeading num="01" id="apropos-titre">
          Hello World<span className="text-pink">.</span>
        </SectionHeading>

        <div className="grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-4">
          {/* Photo en bichromie rose / nuit : noir et blanc contrasté, puis deux calques de fusion. */}
          <div className="relative min-h-[380px] overflow-hidden rounded-3xl md:row-span-2">
            <Image
              src={photo}
              alt="Laura concentrée devant son ordinateur"
              fill
              sizes="(min-width: 900px) 300px, 100vw"
              className="object-cover object-[60%_30%] [filter:grayscale(1)_contrast(1.25)_brightness(1.1)]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-pink mix-blend-multiply" />
            <div aria-hidden="true" className="absolute inset-0 bg-[#2B1030] mix-blend-screen" />
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-3xl bg-linear-to-b from-transparent from-50% to-[rgb(14_12_17/0.85)] shadow-[inset_0_0_0_1px_rgb(240_127_162/0.5)]"
            />
          </div>

          <div className="flex flex-col justify-between gap-[18px] rounded-3xl border border-line bg-surface p-8 md:col-span-2">
            <p className="text-[30px] leading-[1.2] font-medium tracking-[-0.5px]">
              Moi c’est Laura. Sur le web, c’est{" "}
              <span className="whitespace-nowrap">
                <span className="font-display text-[46px] leading-none font-black uppercase">
                  Flaura
                </span>
                <span className="font-mono text-lg text-pink">.dev_</span>
              </span>
            </p>
            <p className="leading-[1.7] text-muted">
              Je fais des sites de A à Z : le design, le code, l’hébergement et les animations qui
              donnent envie de scroller.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-3xl bg-pink p-7 text-bg">
            <MapPinIcon size={28} />
            <p className="font-display text-[40px] leading-[0.95] font-black uppercase">
              Var,
              <br />
              France
            </p>
            <p className="font-mono text-xs">+ remote partout en France</p>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-7 md:col-span-3">
            <p className="font-mono text-xs text-pink">{"// avant le code"}</p>
            <ol className="flex flex-wrap items-center gap-2.5 text-[15px]">
              {career.map((job, index) => {
                const current = index === career.length - 1;
                return (
                  <li key={job} className="flex items-center gap-2.5">
                    <span
                      className={cx(
                        "rounded-full px-3.5 py-2",
                        current ? "bg-fg font-semibold text-bg" : "border border-line text-muted",
                      )}
                    >
                      {job}
                    </span>
                    {!current && <ArrowRightIcon size={14} className="text-faint" />}
                  </li>
                );
              })}
            </ol>
            <p className="leading-[1.6] text-muted">
              Des années en ingénierie m’ont appris à tenir un planning, un budget et une promesse.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
