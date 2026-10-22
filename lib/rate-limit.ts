import "server-only";

/*
 * Limites d'envoi du formulaire de contact, gardées en mémoire du serveur : elles repartent
 * à zéro à chaque redémarrage, ce qui suffit contre les robots pour un petit site.
 * Les adresses IP ne restent que le temps de la fenêtre et ne sont jamais écrites sur disque.
 */

/** Messages acceptés par adresse IP sur la fenêtre glissante. */
const MAX_PER_IP = 3;
const WINDOW_MS = 10 * 60 * 1000;
/** Plafond global par jour, sous les 300 e-mails quotidiens de l'offre gratuite de Brevo. */
const MAX_PER_DAY = 50;

const recentByIp = new Map<string, number[]>();
let day = "";
let sentToday = 0;

/** Réserve un envoi pour cette adresse IP ; false si une limite est atteinte. */
export function reserveSubmission(ip: string, now = Date.now()): boolean {
  const today = new Date(now).toISOString().slice(0, 10);
  if (today !== day) {
    day = today;
    sentToday = 0;
  }
  if (sentToday >= MAX_PER_DAY) return false;

  // Oublie les envois sortis de la fenêtre, pour toutes les adresses (la table reste petite).
  for (const [key, times] of recentByIp) {
    const recent = times.filter((time) => now - time < WINDOW_MS);
    if (recent.length > 0) recentByIp.set(key, recent);
    else recentByIp.delete(key);
  }

  const times = recentByIp.get(ip) ?? [];
  if (times.length >= MAX_PER_IP) return false;

  recentByIp.set(ip, [...times, now]);
  sentToday += 1;
  return true;
}
