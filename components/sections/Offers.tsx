import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CheckIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  type CardRow,
  includedEverywhere,
  maintenancePlans,
  planCardRows,
  planRows,
  plans,
  redesign,
} from "@/content/offers";
import { cx } from "@/lib/cx";
import { euros, type Price, VAT_RATE, withVat } from "@/lib/price";

/*
 * Quatre cartes (trois formules + Refonte), puis la maintenance. Prix tirés de
 * content/offers.ts, comme les données structurées.
 *
 * À partir de 1280 px, les lignes s'alignent d'une carte à l'autre (subgrid) et la carte
 * recommandée déborde de 16 px. En dessous : deux cartes par ligne, puis une.
 */

// Rangées partagées par les cartes : en-tête, prix, une par ligne de planRows, bouton.
const gridRows = {
  "--card-rows": planRows.length + 3,
  "--plan-rows": planRows.length,
} as CSSProperties;

const labelClass = "font-mono text-[0.6875rem] leading-4 tracking-[0.08em] uppercase";

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
              price={plan.price}
              rows={planCardRows(plan)}
              recommended={plan.recommended}
              cta={`Choisir ${plan.name}`}
            />
          ))}
          <OfferCard
            id={redesign.id}
            name={redesign.name}
            pitch={redesign.pitch}
            price={redesign.price}
            rows={redesign.rows}
            addon
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
          <div className="flex flex-col gap-1 font-mono text-xs leading-5 text-muted">
            <p>
              Prix hors taxes, TVA {VAT_RATE}&nbsp;% en sus. Nom de domaine et hébergement non
              compris&nbsp;: ils sont à ton nom et à ta charge.
            </p>
            <p>
              Demandes particulières non comprises, elles sont chiffrées en supplément sur le devis.
              N’hésite pas à m’en faire part dès le début.
            </p>
          </div>
        </div>

        <MaintenanceCard />
      </Container>
    </section>
  );
}

type OfferCardProps = {
  id: string;
  name: string;
  pitch: string;
  price: Price;
  rows: CardRow[];
  cta: string;
  /** Formule mise en avant : carte rose et badge « Recommandée ». */
  recommended?: boolean;
  /**
   * Module Refonte, en plus d'une formule : prix « + … », et lignes empilées librement (elles
   * ne sont pas les mêmes que celles des formules, et leurs textes plus longs les agrandiraient).
   */
  addon?: boolean;
};

function OfferCard({
  id,
  name,
  pitch,
  price,
  rows,
  cta,
  recommended = false,
  addon = false,
}: OfferCardProps) {
  return (
    <li
      id={id}
      className={cx(
        "relative flex flex-col rounded-3xl p-7 xl:row-span-(--card-rows) xl:grid xl:grid-rows-subgrid",
        recommended
          ? "bg-pink text-bg shadow-[0_24px_60px_-24px_var(--pink)] xl:-my-4 xl:py-11"
          : "border border-line bg-surface",
      )}
    >
      <div className="flex flex-col gap-3 pb-6">
        <CardTitle inverted={recommended}>{name}</CardTitle>
        {/* À cheval sur le bord haut de la carte : le titre garde toute la largeur. */}
        {recommended && (
          <p className="absolute -top-3 right-7 self-start rounded-full border border-pink bg-bg px-3 py-1 font-mono text-[0.6875rem] leading-4 tracking-[0.08em] text-pink uppercase">
            Recommandée
          </p>
        )}
        <p className={cx("leading-normal", !recommended && "text-muted")}>{pitch}</p>
      </div>

      <div className="pb-6">
        {addon ? (
          <PriceTag price={price} prefix="+&nbsp;" note="En plus de la formule choisie" />
        ) : (
          <PriceTag price={price} inverted={recommended} />
        )}
      </div>

      <dl className={cx("xl:row-span-(--plan-rows)", !addon && "xl:grid xl:grid-rows-subgrid")}>
        {rows.map(({ label, value }) => {
          // Le cadeau inclus est mis en valeur, en rose et en gras.
          const gift = value && label === "Cadeau";
          return (
            <div
              key={label}
              className={cx(
                "flex flex-col gap-0.5 border-t py-3",
                recommended ? "border-bg/25" : "border-line",
              )}
            >
              <dt className={cx(labelClass, !recommended && "text-muted")}>{label}</dt>
              <dd
                className={cx(
                  gift && "font-semibold",
                  gift && !recommended && "text-pink",
                  !value && !recommended && "text-dim",
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
          className={cx(
            "inline-flex min-h-12 w-full press items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.9375rem] font-semibold",
            recommended
              ? "bg-bg text-fg hover:opacity-90"
              : "border border-line hover:border-pink hover:text-pink",
          )}
        >
          {cta}
        </Link>
      </div>
    </li>
  );
}

/** Maintenance en longueur : présentation à gauche, formules à droite à partir de 1280 px. */
function MaintenanceCard() {
  return (
    <article
      id="maintenance"
      aria-labelledby="maintenance-titre"
      className="grid gap-6 rounded-3xl border border-line bg-surface p-7 md:p-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] xl:items-center xl:gap-10"
    >
      <div className="flex flex-col gap-4">
        <CardTitle id="maintenance-titre">Maintenance</CardTitle>
        <p className="leading-[1.65] text-muted">
          Ton site reste à jour, sauvegardé et en ligne, sans que tu aies à y penser. L’hébergement
          reste à ton nom&nbsp;: je m’en occupe avec l’accès que tu me donnes.
        </p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {maintenancePlans.map((formula) => (
          <li key={formula.id} className="flex flex-col gap-3 rounded-2xl border border-line p-5">
            <h4 className="text-lg leading-snug font-semibold">{formula.name}</h4>
            <p className="text-[0.9375rem] leading-normal text-muted">{formula.text}</p>
            <PriceTag price={formula.price} small className="mt-auto" />
          </li>
        ))}
      </ul>
    </article>
  );
}

/** Titre de carte : « // » rose puis le nom, dans la police des titres. */
function CardTitle({
  id,
  inverted = false,
  children,
}: {
  id?: string;
  inverted?: boolean;
  children: ReactNode;
}) {
  return (
    // Interligne de 1,1 : sur deux lignes, les « // » ne touchent pas la ligne du dessous.
    <h3
      id={id}
      className="font-display text-[2.25rem] leading-[1.1] font-black text-balance uppercase"
    >
      <span aria-hidden="true" className={inverted ? "opacity-60" : "text-pink"}>
        {"// "}
      </span>
      {children}
    </h3>
  );
}

/** Prix HT en grand, avec « à partir de » au-dessus et le TTC en italique dessous. */
function PriceTag({
  price,
  prefix,
  note,
  small = false,
  inverted = false,
  className,
}: {
  price: Price;
  prefix?: string;
  note?: string;
  /** Prix plus petit et rose (formules de maintenance). */
  small?: boolean;
  /** Sur la carte rose. */
  inverted?: boolean;
  className?: string;
}) {
  const unit = price.unit ? ` / ${price.unit}` : "";
  const detailClass = cx("font-mono text-xs leading-5", !inverted && "text-muted");
  return (
    <div className={cx("flex flex-col gap-1", className)}>
      {price.from && <p className={cx(labelClass, !inverted && "text-muted")}>à partir de</p>}
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span
          className={cx(
            "font-display leading-none font-black whitespace-nowrap",
            small ? "text-[2.25rem] text-pink" : "text-[3.25rem]",
          )}
        >
          {prefix}
          {euros(price.amount)}
        </span>
        <span className="font-mono text-sm whitespace-nowrap">HT{unit}</span>
      </p>
      <p className={cx(detailClass, "italic")}>
        soit {euros(withVat(price.amount))}&nbsp;TTC{unit}
      </p>
      {note && <p className={detailClass}>{note}</p>}
    </div>
  );
}
