import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowUpRightIcon, CheckIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  agencies,
  type CardRow,
  extras,
  includedEverywhere,
  maintenancePlans,
  planCardRows,
  planRows,
  plans,
  redesign,
} from "@/content/offers";
import { site } from "@/content/site";
import { cx } from "@/lib/cx";
import { euros, type Price, VAT_RATE, withVat } from "@/lib/price";

/*
 * Offres : quatre cartes (Essentiel, Visibilité mise en avant, Pro, puis le module Refonte),
 * puis deux cartes en longueur (maintenance, options à la carte) et le renfort pour les
 * agences. Composant serveur : tous les prix sont du texte dans le HTML initial, lisibles par
 * Google et les IA. Les données structurées (OfferCatalog, lib/structured-data.ts) viennent de
 * la même source (content/offers.ts).
 *
 * Grand écran : les lignes des quatre cartes s'alignent d'une carte à l'autre (subgrid), comme
 * un tableau comparatif, et la carte recommandée déborde de 16 px en haut et en bas.
 * En dessous : deux cartes par ligne, puis une seule.
 */

// Rangées partagées par les cartes (subgrid) : en-tête, prix, une par ligne de planRows, bouton.
// Calculées depuis content/offers.ts : ajouter une ligne aux formules ne casse pas l'alignement.
const gridRows = {
  "--card-rows": planRows.length + 3,
  "--plan-rows": planRows.length,
} as CSSProperties;

const cardClass = "rounded-3xl border border-line bg-surface p-7";
const pillClass =
  "self-start rounded-full px-3 py-1 font-mono text-[0.6875rem] leading-4 tracking-[0.08em] uppercase";
const labelClass = "font-mono text-[0.6875rem] leading-4 tracking-[0.08em] uppercase";
const bigPriceClass = "font-display leading-none font-black whitespace-nowrap";
const buttonClass =
  "inline-flex min-h-12 w-full press items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.9375rem] font-semibold";
const outlineButtonClass = cx(buttonClass, "border border-line hover:border-pink hover:text-pink");

export function Offers() {
  return (
    <section id="offres" aria-labelledby="offres-titre" className="py-24">
      <Container className="flex flex-col gap-8">
        <SectionHeading num="03" id="offres-titre" subtitle="Tarifs de création de site internet">
          Offres
        </SectionHeading>

        <ul
          style={gridRows}
          className="grid gap-x-4 gap-y-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-y-0 xl:py-4"
        >
          {plans.map((plan) => (
            <OfferCard
              key={plan.id}
              id={`offre-${plan.id}`}
              name={plan.name}
              pitch={plan.pitch}
              highlighted={plan.recommended}
              price={<PriceTag price={plan.price} inverted={plan.recommended} />}
              rows={planCardRows(plan)}
              giftLabel="Cadeau"
              cta={`Choisir ${plan.name}`}
            />
          ))}
          <OfferCard
            id={redesign.id}
            name={redesign.name}
            pitch={redesign.pitch}
            price={
              <PriceTag
                price={redesign.price}
                prefix="+&nbsp;"
                note="En plus de la formule choisie"
              />
            }
            rows={redesign.rows}
            alignRows={false}
            cta="Ajouter la refonte"
          />
        </ul>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs leading-5 text-muted">Inclus dans toutes les formules</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {includedEverywhere.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckIcon className="shrink-0 text-pink" />
                {item}
              </li>
            ))}
          </ul>
          <p className="font-mono text-xs leading-5 text-muted">
            Prix hors taxes, TVA {VAT_RATE}&nbsp;% en sus.
          </p>
        </div>

        <TilesCard
          id="maintenance"
          title="Maintenance"
          text={
            <>
              Ton site reste à jour, sauvegardé et en ligne, sans que tu aies à y penser.
              L’hébergement reste à ton nom&nbsp;: je m’en occupe avec l’accès que tu me donnes.
            </>
          }
          tiles={maintenancePlans}
        />

        <TilesCard
          id="options"
          title="Options à la carte"
          text="À ajouter à ta formule, selon ce dont tu as besoin."
          tiles={extras}
        />

        <article
          id={agencies.id}
          aria-labelledby="agences-titre"
          className="grid gap-8 rounded-3xl border border-pink bg-surface p-7 md:p-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
        >
          <div className="flex flex-col gap-5">
            <CardTitle id="agences-titre" className="text-[clamp(2.25rem,1.6rem+2vw,3rem)]">
              {agencies.title}
            </CardTitle>
            <p className="max-w-[60ch] leading-[1.65] text-muted">{agencies.text}</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {agencies.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-2">
                  <CheckIcon className="shrink-0 text-pink" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-end gap-6">
            <p className="leading-[1.65] text-muted">{agencies.background}</p>
            <PriceTag
              price={agencies.price}
              label="Taux journalier, à partir de"
              vat={false}
              note="ou au forfait, sur devis"
            />
            <div className="flex flex-col gap-3">
              <Link
                href="/#contact"
                className={cx(buttonClass, "bg-pink text-bg hover:bg-pink-hover")}
              >
                Parlons de ta mission
              </Link>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={outlineButtonClass}
              >
                Mon profil LinkedIn
                <span className="sr-only">(nouvel onglet)</span>
                <ArrowUpRightIcon />
              </a>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}

/** Titre de carte : « // » rose puis le nom, dans la police des titres. */
function CardTitle({
  id,
  inverted,
  className,
  children,
}: {
  id?: string;
  inverted?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <h3
      id={id}
      className={cx(
        // Interligne de 1,1 : sur deux lignes, les « // » ne touchent pas la ligne du dessous.
        "font-display text-[2.25rem] leading-[1.1] font-black text-balance uppercase",
        className,
      )}
    >
      <span aria-hidden="true" className={inverted ? "opacity-60" : "text-pink"}>
        {"// "}
      </span>
      {children}
    </h3>
  );
}

/**
 * Prix HT en grand. Au-dessus : « à partir de » (ou label). Dessous : TTC en italique (sauf
 * vat=false, pour les agences qui récupèrent la TVA) puis la note. inverted : carte rose.
 */
function PriceTag({
  price,
  prefix,
  label,
  note,
  size = "large",
  vat = true,
  inverted,
  className,
}: {
  price: Price;
  prefix?: string;
  label?: string;
  note?: string;
  size?: "large" | "small";
  vat?: boolean;
  inverted?: boolean;
  className?: string;
}) {
  const unit = price.unit ? ` / ${price.unit}` : "";
  const caption = label ?? (price.from ? "à partir de" : undefined);
  const small = cx("font-mono text-xs leading-5", !inverted && "text-muted");
  return (
    <div className={cx("flex flex-col gap-1", className)}>
      {caption && <p className={cx(labelClass, !inverted && "text-muted")}>{caption}</p>}
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span
          className={cx(
            bigPriceClass,
            size === "large" ? "text-[3.25rem]" : "text-[2.25rem] text-pink",
          )}
        >
          {prefix}
          {euros(price.amount)}
        </span>
        <span className="font-mono text-sm whitespace-nowrap">HT{unit}</span>
      </p>
      {vat && (
        <p className={cx(small, "italic")}>
          soit {euros(withVat(price.amount))}&nbsp;TTC{unit}
        </p>
      )}
      {note && <p className={small}>{note}</p>}
    </div>
  );
}

type Tile = { id: string; name: string; text?: string; note?: string; price: Price };

/**
 * Carte en longueur : titre et présentation à gauche, formules en vignettes à droite (à partir
 * de 1280 px ; au-dessus des vignettes en dessous, pour que trois vignettes gardent leur largeur).
 */
function TilesCard({
  id,
  title,
  text,
  tiles,
}: {
  id: string;
  title: string;
  text: ReactNode;
  tiles: Tile[];
}) {
  return (
    <article
      id={id}
      aria-labelledby={`${id}-titre`}
      className={cx(
        cardClass,
        "grid gap-6 md:p-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] xl:items-center xl:gap-10",
      )}
    >
      <div className="flex flex-col gap-4">
        <CardTitle id={`${id}-titre`}>{title}</CardTitle>
        <p className="leading-[1.65] text-muted">{text}</p>
      </div>
      <ul className={cx("grid gap-3", tiles.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
        {tiles.map((tile) => (
          <li key={tile.id} className="flex flex-col gap-3 rounded-2xl border border-line p-5">
            <h4 className="text-lg leading-snug font-semibold">{tile.name}</h4>
            {tile.text && <p className="text-[0.9375rem] leading-normal text-muted">{tile.text}</p>}
            {tile.note && (
              <p className="text-[0.8125rem] leading-normal text-muted italic">{tile.note}</p>
            )}
            <PriceTag price={tile.price} size="small" className="mt-auto" />
          </li>
        ))}
      </ul>
    </article>
  );
}

function OfferCard({
  id,
  name,
  pitch,
  highlighted,
  price,
  rows,
  giftLabel,
  alignRows = true,
  cta,
}: {
  id: string;
  name: string;
  pitch: string;
  highlighted?: boolean;
  price: ReactNode;
  rows: CardRow[];
  /** Ligne mise en valeur (en rose et en gras) quand elle contient quelque chose. */
  giftLabel?: string;
  /**
   * false : lignes empilées librement (Refonte). Ses lignes ne sont pas les mêmes que celles
   * des formules, et ses textes plus longs agrandiraient les leurs.
   */
  alignRows?: boolean;
  cta: string;
}) {
  return (
    <li
      id={id}
      className={cx(
        // Rangées partagées entre les cartes : voir gridRows.
        "relative flex flex-col rounded-3xl p-7 xl:row-span-(--card-rows) xl:grid xl:grid-rows-subgrid",
        highlighted
          ? "bg-pink text-bg shadow-[0_24px_60px_-24px_var(--pink)] xl:-my-4 xl:py-11"
          : "border border-line bg-surface",
      )}
    >
      <div className="flex flex-col gap-3 pb-6">
        <CardTitle inverted={highlighted}>{name}</CardTitle>
        {/* À cheval sur le bord haut de la carte : le titre garde toute la largeur. */}
        {highlighted && (
          <p
            className={cx(pillClass, "absolute -top-3 right-7 border border-pink bg-bg text-pink")}
          >
            Recommandée
          </p>
        )}
        <p className={cx("leading-normal", !highlighted && "text-muted")}>{pitch}</p>
      </div>

      <div className="pb-6">{price}</div>

      <dl className={cx("xl:row-span-(--plan-rows)", alignRows && "xl:grid xl:grid-rows-subgrid")}>
        {rows.map(({ label, value }) => {
          const gift = value && label === giftLabel;
          return (
            <div
              key={label}
              className={cx(
                "flex flex-col gap-0.5 border-t py-3",
                highlighted ? "border-bg/25" : "border-line",
              )}
            >
              <dt className={cx(labelClass, !highlighted && "text-muted")}>{label}</dt>
              <dd
                className={cx(
                  gift && "font-semibold",
                  gift && !highlighted && "text-pink",
                  !value && !highlighted && "text-dim",
                )}
              >
                {value ?? (
                  <>
                    <span aria-hidden="true">—</span>
                    <span className="sr-only">Non inclus</span>
                  </>
                )}
              </dd>
            </div>
          );
        })}
      </dl>

      <div className="mt-auto pt-6 xl:self-end">
        <Link
          href="/#contact"
          className={
            highlighted ? cx(buttonClass, "bg-bg text-fg hover:opacity-90") : outlineButtonClass
          }
        >
          {cta}
        </Link>
      </div>
    </li>
  );
}
