"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/ui/icons";

const fieldClass =
  "w-full rounded-xl border border-line bg-bg px-4 py-3.5 font-mono text-sm text-fg placeholder:text-muted";
const labelClass = "font-mono text-xs font-medium tracking-[1.5px] text-muted uppercase";

/**
 * Interface du formulaire. L'envoi (validation serveur, anti-spam, limitation de débit,
 * service d'e-mail) sera branché à l'étape dédiée : en attendant, rien ne part.
 */
export function ContactForm() {
  const [notice, setNotice] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(true);
  }

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="flex flex-1 flex-col gap-5 rounded-3xl border border-line bg-surface p-8"
    >
      <p className="text-[17px] font-semibold">Ou écrivez-moi</p>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div className="flex flex-col gap-2.5">
          <label htmlFor="f-nom" className={labelClass}>
            Nom
          </label>
          <input
            id="f-nom"
            name="nom"
            type="text"
            autoComplete="name"
            placeholder="Votre nom"
            required
            maxLength={100}
            className={fieldClass}
          />
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
            placeholder="vous@exemple.com"
            required
            maxLength={254}
            className={fieldClass}
          />
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
            className={`${fieldClass} cursor-pointer appearance-none pr-11 font-semibold`}
          >
            <option>Site vitrine</option>
            <option>Refonte</option>
            <option>Application web</option>
            <option>Je ne sais pas encore</option>
          </select>
          <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5">
        <label htmlFor="f-msg" className={labelClass}>
          Message
        </label>
        <textarea
          id="f-msg"
          name="message"
          rows={5}
          placeholder="Parlez-moi de votre projet…"
          required
          maxLength={5000}
          className={`${fieldClass} flex-1 resize-y`}
        />
      </div>

      <button
        type="submit"
        className="flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-pink px-6 py-[17px] font-mono text-sm font-semibold tracking-[2.5px] text-bg uppercase transition-colors hover:bg-pink-hover"
      >
        Envoyer le message
        <ArrowRightIcon />
      </button>

      <p role="status" className="text-sm text-pink empty:hidden">
        {notice ? "[Envoi pas encore branché : il sera mis en place à l’étape formulaire.]" : ""}
      </p>

      <p className="text-xs leading-[1.6] text-muted">
        Vos informations servent uniquement à vous répondre.{" "}
        <Link href="/confidentialite" className="underline underline-offset-2 hover:text-pink">
          En savoir plus
        </Link>
      </p>
    </form>
  );
}
