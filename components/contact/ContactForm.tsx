"use client";

import { useActionState } from "react";
import Link from "next/link";
import { sendContact, type ContactField, type ContactState } from "@/app/actions/contact";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/ui/icons";
import { contactMessages, honeypotField, projectTypes } from "@/content/contact";
import { cx } from "@/lib/cx";

const fieldClass =
  "w-full rounded-xl border border-field-line bg-bg px-4 py-3.5 font-mono text-sm text-fg placeholder:text-muted aria-invalid:border-pink";
const labelClass = "font-mono text-xs font-medium tracking-[0.125em] text-muted uppercase";

const initialState: ContactState = { status: "idle" };

/**
 * Formulaire de contact, envoyé par une Server Action (app/actions/contact.ts) : il fonctionne
 * aussi sans JavaScript. En cas d'erreur, la saisie est conservée et le champ fautif signalé.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  /** Liaison d'un champ à son éventuel message d'erreur (lecteurs d'écran compris). */
  function errorProps(field: ContactField) {
    const invalid = Boolean(state.errors?.[field]);
    return {
      "aria-invalid": invalid || undefined,
      "aria-describedby": invalid ? `f-${field}-erreur` : undefined,
    };
  }

  const notice = state.status === "idle" ? "" : contactMessages[state.status];

  return (
    <form
      action={formAction}
      className="@container flex flex-1 flex-col gap-5 rounded-3xl border border-line bg-surface p-8"
    >
      <p className="text-[1.0625rem] font-semibold">Ou écris-moi</p>

      {/* Nom et e-mail côte à côte seulement si le formulaire est assez large. */}
      <div className="grid gap-3.5 @[28rem]:grid-cols-2">
        <div className="flex flex-col gap-2.5">
          <label htmlFor="f-name" className={labelClass}>
            Nom et prénom
          </label>
          <input
            id="f-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Ton nom et prénom"
            required
            maxLength={100}
            defaultValue={state.values?.name}
            {...errorProps("name")}
            className={fieldClass}
          />
          <FieldError field="name" message={state.errors?.name} />
        </div>
        <div className="flex flex-col gap-2.5">
          <label htmlFor="f-email" className={labelClass}>
            E-mail
          </label>
          <input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="toi@exemple.com"
            required
            maxLength={254}
            defaultValue={state.values?.email}
            {...errorProps("email")}
            className={fieldClass}
          />
          <FieldError field="email" message={state.errors?.email} />
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label htmlFor="f-type" className={labelClass}>
          Type de projet
        </label>
        {/* Liste aux couleurs du site : voir .select-themed dans globals.css. */}
        <div className="relative">
          <select
            id="f-type"
            name="type"
            defaultValue={state.values?.type}
            {...errorProps("type")}
            className={`select-themed peer ${fieldClass} cursor-pointer pr-11 font-semibold transition-colors open:border-pink hover:not-open:border-pink/60`}
          >
            {projectTypes.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted transition-[rotate,color] duration-200 peer-open:rotate-180 peer-open:text-pink motion-reduce:transition-none" />
        </div>
        <FieldError field="type" message={state.errors?.type} />
      </div>

      <div className="flex flex-1 flex-col gap-2.5">
        <label htmlFor="f-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="f-message"
          name="message"
          rows={5}
          placeholder="Parle-moi de ton projet…"
          required
          minLength={10}
          maxLength={5000}
          defaultValue={state.values?.message}
          {...errorProps("message")}
          className={`${fieldClass} flex-1 resize-y`}
        />
        <FieldError field="message" message={state.errors?.message} />
      </div>

      {/* Champ piège : invisible et hors du parcours clavier, seuls les robots le remplissent. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="f-cache">Ne remplis pas ce champ</label>
        <input id="f-cache" name={honeypotField} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex min-h-[52px] w-full press cursor-pointer items-center justify-center gap-3 rounded-xl bg-pink px-6 py-[17px] font-mono text-sm font-semibold tracking-[0.18em] text-bg uppercase hover:bg-pink-hover disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Envoi…" : "Envoyer le message"}
        <ArrowRightIcon />
      </button>

      <p
        role="status"
        className={cx(
          "text-sm leading-[1.6] empty:hidden",
          state.status === "sent" ? "font-semibold text-fg" : "text-pink",
        )}
      >
        {notice}
      </p>

      <p className="text-xs leading-[1.6] text-muted">
        Tes informations servent uniquement à te répondre.{" "}
        {/* Marges verticales invisibles : 44 px de zone tactile sans décaler le texte. */}
        <Link
          href="/confidentialite"
          className="py-3.5 underline underline-offset-2 press-text hover:text-pink"
        >
          En savoir plus
        </Link>
      </p>
    </form>
  );
}

function FieldError({ field, message }: { field: ContactField; message?: string }) {
  if (!message) return null;
  return (
    <p id={`f-${field}-erreur`} className="text-xs leading-[1.5] text-pink">
      {message}
    </p>
  );
}
