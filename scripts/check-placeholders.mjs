// bloque le build s'il reste un texte entre crochets ([SIRET]...)
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] ?? ".next/server/app";
const placeholder = /\[[^\]\n]{1,60}\]/g;

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* htmlFiles(path);
    else if (path.endsWith(".html")) yield path;
  }
}

function readableText(html) {
  const page = html
    .replace(/<(script|style|template)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
  const attributes = [
    ...page.matchAll(/\s(?:alt|title|content|aria-label|placeholder)="([^"]*)"/g),
  ].map((match) => match[1]);
  return [page.replace(/<[^>]*>/g, " "), ...attributes].join(" ");
}

const found = [];
for (const file of htmlFiles(root)) {
  for (const match of readableText(readFileSync(file, "utf8")).matchAll(placeholder)) {
    found.push(`${file} : ${match[0]}`);
  }
}

if (found.length > 0) {
  console.error(`Texte provisoire encore présent (${found.length}) :\n${found.join("\n")}`);
  process.exit(1);
}
console.log("Aucun texte provisoire entre crochets dans les pages.");
