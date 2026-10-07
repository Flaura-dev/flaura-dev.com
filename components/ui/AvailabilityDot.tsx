/** Point vert « disponible » qui clignote lentement (fixe si les animations sont réduites). */
export function AvailabilityDot() {
  return (
    <span
      aria-hidden="true"
      className="size-2 shrink-0 rounded-full bg-avail motion-safe:animate-dispo-pulse"
    />
  );
}
