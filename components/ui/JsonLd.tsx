/** Données structurées schema.org, sérialisées dans une balise <script type="application/ld+json">. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Échappement de "<" pour empêcher toute injection via la balise script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
