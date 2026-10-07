import { QuoteMarkIcon } from "@/components/ui/icons";
import { testimonial } from "@/content/projects";

export function Testimonial() {
  return (
    <figure className="mt-4 flex flex-wrap items-center gap-9 border-y border-line py-12">
      <QuoteMarkIcon className="shrink-0 text-pink" />
      <div className="flex flex-[1_1_420px] flex-col gap-4">
        <blockquote className="text-[30px] leading-[1.3] font-medium tracking-[-0.5px]">
          {testimonial.quote}
        </blockquote>
        <figcaption className="font-mono text-[13px] text-muted">{testimonial.author}</figcaption>
      </div>
    </figure>
  );
}
