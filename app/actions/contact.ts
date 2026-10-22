"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { honeypotField, projectTypes, type ProjectType } from "@/content/contact";
import { sendContactEmail } from "@/lib/mail";
import { reserveSubmission } from "@/lib/rate-limit";

export type ContactField = "name" | "email" | "type" | "message";

export type ContactState = {
  status: "idle" | "sent" | "invalid" | "limited" | "failed";
  /** Message d'erreur par champ, quand la validation échoue. */
  errors?: Partial<Record<ContactField, string>>;
  /** Saisie du visiteur, renvoyée pour ne rien lui faire retaper en cas d'erreur. */
  values?: Partial<Record<ContactField, string>>;
};

// Le navigateur vérifie déjà ces règles, mais un robot peut envoyer n'importe quoi au serveur.
const schema = z.object({
  name: z.string().min(2, "Indique ton nom et prénom.").max(100, "100 caractères au maximum."),
  email: z.email("Indique une adresse e-mail valide.").max(254, "Adresse e-mail trop longue."),
  type: z.enum(projectTypes.map((option) => option.value) as [ProjectType, ...ProjectType[]], {
    error: "Choisis un type de projet dans la liste.",
  }),
  message: z
    .string()
    .min(10, "Ton message doit faire au moins 10 caractères.")
    .max(5000, "5 000 caractères au maximum."),
});

/** Adresse du visiteur derrière le proxy de Hostinger (premier maillon de X-Forwarded-For). */
async function clientIp() {
  const requestHeaders = await headers();
  // Falsifiable par un robot : le plafond quotidien de lib/rate-limit.ts reste la vraie protection.
  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "inconnue"
  );
}

/** Envoi du formulaire de contact (components/contact/ContactForm.tsx). */
export async function sendContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Réponse identique à un vrai envoi : le robot n'apprend pas qu'il a été repéré.
  if (formData.get(honeypotField)) return { status: "sent" };

  const field = (key: ContactField) => String(formData.get(key) ?? "").trim();
  const values = {
    // Pas de saut de ligne dans le nom : il est repris dans l'objet de l'e-mail.
    name: field("name").replace(/[\r\n\t]+/g, " "),
    email: field("email"),
    type: field("type"),
    message: field("message"),
  };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    const errors = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, messages]) => [key, messages?.[0]]),
    );
    return { status: "invalid", errors, values };
  }

  if (!reserveSubmission(await clientIp())) return { status: "limited", values };

  try {
    await sendContactEmail(parsed.data);
    return { status: "sent" };
  } catch (error) {
    // Jamais le contenu du message ni l'adresse du visiteur dans les journaux du serveur.
    const { code, responseCode } = (error ?? {}) as { code?: string; responseCode?: number };
    console.error(
      "Formulaire de contact : envoi impossible",
      code ?? responseCode ?? "erreur inconnue",
    );
    return { status: "failed", values };
  }
}
