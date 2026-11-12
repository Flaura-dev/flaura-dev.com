"use client";

import { useActionState } from "react";
import Link from "next/link";
import { sendContact, type ContactField, type ContactState } from "@/app/actions/contact";
import { ArrowRightIcon, CheckIcon, ChevronDownIcon } from "@/components/ui/icons";
import {
  contactMessages,
  fieldHints,
  honeypotField,
  projectTypes,
  responseNote,
} from "@/content/contact";
import { cx } from "@/lib/cx";

// 16 px mini sur mobile, sinon l'iPhone zoome
const fieldClass =
  "w-full rounded-xl border border-field-line bg-bg px-4 py-3.5 font-mono text-base text-fg placeholder:text-muted user-invalid:border-pink aria-invalid:border-pink md:text-sm";
const labelClass = "font-mono text-xs font-medium tracking-[0.125em] text-muted uppercase";

const initialState: ContactState = { status: "idle" };

// ==== FORMULAIRE ====
export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

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
      <div className="flex flex-col gap-1">
        <p className="text-[1.0625rem] font-semibold">Ou écris-moi</p>
        <p className="text-sm text-muted">{responseNote}</p>
      </div>

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
            placeholder="Prénom Nom"
            required
            minLength={2}
            maxLength={100}
            defaultValue={state.values?.name}
            {...errorProps("name")}
            className={`peer ${fieldClass}`}
          />
          <FieldError field="name" message={state.errors?.name} hint={fieldHints.name} />
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
            className={`peer ${fieldClass}`}
          />
          <FieldError field="email" message={state.errors?.email} hint={fieldHints.email} />
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label htmlFor="f-type" className={labelClass}>
          Type de projet
        </label>
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
          className={`peer ${fieldClass} flex-1 resize-y`}
        />
        <FieldError field="message" message={state.errors?.message} hint={fieldHints.message} />
      </div>

      {/* champ piège pour les robots */}
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
          state.status === "sent" ? "flex items-center gap-2.5 font-semibold text-fg" : "text-pink",
        )}
      >
        {notice}
        {state.status === "sent" && (
          <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-avail text-[#0D0817]">
            <CheckIcon size={14} strokeWidth={3} />
          </span>
        )}
      </p>

      <p className="text-xs leading-[1.6] text-muted">
        Tes informations servent uniquement à te répondre.{" "}
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

// ==== ERREURS ====
// erreur du serveur, sinon le hint s'affiche en CSS (:user-invalid)
function FieldError({
  field,
  message,
  hint,
}: {
  field: ContactField;
  message?: string;
  hint?: string;
}) {
  if (message) {
    return (
      <p id={`f-${field}-erreur`} className="text-xs leading-[1.5] text-pink">
        {message}
      </p>
    );
  }
  if (!hint) return null;
  return <p className="hidden text-xs leading-[1.5] text-pink peer-user-invalid:block">{hint}</p>;
}
