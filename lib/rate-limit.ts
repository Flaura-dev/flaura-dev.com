import "server-only";

// en mémoire : remis à zéro au redémarrage
const MAX_PER_IP = 3;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_DAY = 50; // Brevo gratuit : 300 par jour

const recentByIp = new Map<string, number[]>();
let day = "";
let sentToday = 0;

export function reserveSubmission(ip: string, now = Date.now()): boolean {
  const today = new Date(now).toISOString().slice(0, 10);
  if (today !== day) {
    day = today;
    sentToday = 0;
  }
  if (sentToday >= MAX_PER_DAY) return false;

  // on oublie les envois trop vieux
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
