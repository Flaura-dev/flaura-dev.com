import "server-only";
import nodemailer from "nodemailer";
import { projectTypes, type ProjectType } from "@/content/contact";
import { site } from "@/content/site";

type ContactMessage = {
  name: string;
  email: string;
  type: ProjectType;
  message: string;
};

/** Expéditeur déclaré et authentifié dans Brevo (alias de hello@ chez Hostinger). */
const SENDER = { name: "Formulaire Flaura.dev", address: "formulaire@flaura-dev.com" };

/**
 * Envoie le message du formulaire à hello@ par le relais SMTP de Brevo. La clé SMTP ne permet
 * que l'envoi : même volée, elle n'ouvre pas le compte Brevo. E-mail en texte seul, sans HTML,
 * et « Répondre » écrit directement au visiteur.
 */
export async function sendContactEmail({ name, email, type, message }: ContactMessage) {
  const user = process.env.BREVO_SMTP_LOGIN;
  const pass = process.env.BREVO_SMTP_KEY;
  if (!user || !pass) {
    // Même forme que les erreurs de nodemailer (code EAUTH, ETIMEDOUT…), reprise dans le journal.
    throw Object.assign(new Error("Identifiants SMTP Brevo manquants"), { code: "ECONFIG" });
  }

  const transport = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    requireTLS: true,
    auth: { user, pass },
    // Le visiteur attend la réponse : on abandonne vite si Brevo ne répond pas.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  const typeLabel = projectTypes.find((option) => option.value === type)?.label ?? type;

  await transport.sendMail({
    from: SENDER,
    to: site.email,
    replyTo: { name, address: email },
    subject: `Nouveau message de ${name} · ${typeLabel}`,
    text: [
      "Nouveau message envoyé depuis le formulaire de flaura-dev.com.",
      "",
      `Nom : ${name}`,
      `E-mail : ${email}`,
      `Type de projet : ${typeLabel}`,
      "",
      "Message :",
      message,
      "",
      "—",
      "Pour lui répondre, utilise simplement « Répondre ».",
    ].join("\n"),
  });
}
