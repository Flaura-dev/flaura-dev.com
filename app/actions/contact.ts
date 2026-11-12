"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { honeypotField, projectTypes, type ProjectType } from "@/content/contact";
import { sendContactEmail } from "@/lib/mail";
import { reserveSubmission } from "@/lib/rate-limit";

export type ContactField = "name" | "email" | "type" | "message";

export type ContactState = {
  status: "idle" | "sent" | "invalid" | "limited" | "failed";
  errors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
};

// ==== VALIDATION ====
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

// IP derrière le proxy Hostinger
async function clientIp() {
  const requestHeaders = await headers();
  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "inconnue"
  );
}

// ==== ENVOI ====
export async function sendContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // champ piège rempli : on fait comme si c'était envoyé
  if (formData.get(honeypotField)) return { status: "sent" };

  const field = (key: ContactField) => String(formData.get(key) ?? "").trim();
  const values = {
    // pas de saut de ligne, le nom va dans l'objet du mail
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
    // jamais le message ni l'adresse dans les logs
    const { code, responseCode } = (error ?? {}) as { code?: string; responseCode?: number };
    console.error(
      "Formulaire de contact : envoi impossible",
      code ?? responseCode ?? "erreur inconnue",
    );
    return { status: "failed", values };
  }
}
