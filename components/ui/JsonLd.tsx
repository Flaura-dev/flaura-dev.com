export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // "<" échappé : pas d'injection possible
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
