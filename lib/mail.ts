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

// Heure de Paris, quel que soit le fuseau du serveur.
const day = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Europe/Paris",
  day: "2-digit",
  month: "2-digit",
});
const time = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Europe/Paris",
  hour: "2-digit",
  minute: "2-digit",
});

/**
 * « Nouveau message de Léa · Refonte · 22/10 à 13:03 ». La date et l'heure rendent chaque objet
 * unique : sans elles, Gmail regroupe en une conversation les messages au même objet.
 */
function subjectFor(name: string, typeLabel: string, sentAt = new Date()) {
  return `Nouveau message de ${name} · ${typeLabel} · ${day.format(sentAt)} à ${time.format(sentAt)}`;
}

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
    subject: subjectFor(name, typeLabel),
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
