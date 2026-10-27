import { QuoteMarkIcon } from "@/components/ui/icons";
import { testimonial } from "@/content/projects";

export function Testimonial() {
  return (
    <figure className="mt-4 flex flex-wrap items-start gap-9 border-y border-line py-12">
      {/* mt-2 : haut du guillemet au niveau des majuscules de la première ligne. */}
      <QuoteMarkIcon className="mt-2 shrink-0 text-pink" />
      <div className="flex flex-[1_1_420px] flex-col gap-4">
        <blockquote className="flex flex-col gap-[0.6em] text-[clamp(1.25rem,1rem+1vw,1.875rem)] leading-[1.3] font-medium tracking-[-0.017em]">
          {testimonial.quote.map((paragraph) => (
            <p key={paragraph}>
              {paragraph.split("*").map((part, i) =>
                i % 2 ? (
                  <strong key={i} className="font-medium text-pink">
                    {part}
                  </strong>
                ) : (
                  part
                ),
              )}
            </p>
          ))}
        </blockquote>
        <figcaption className="font-mono text-[0.8125rem] text-muted">
          {testimonial.author}
        </figcaption>
      </div>
    </figure>
  );
}
