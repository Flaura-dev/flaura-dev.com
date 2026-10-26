/** Point vert « disponible » qui clignote lentement (opacité et échelle seulement). */
export function AvailabilityDot() {
  return (
    <span
      aria-hidden="true"
      className="relative size-2 shrink-0 rounded-full bg-avail after:absolute after:inset-0 after:rounded-full after:bg-avail after:opacity-0 motion-safe:animate-dispo-pulse motion-safe:after:animate-dispo-ring"
    />
  );
}
