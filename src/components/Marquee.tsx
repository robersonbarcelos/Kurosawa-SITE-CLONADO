export function Marquee({ items }: { items: string[] }) {
  const words = items.flatMap((t) => [t, "//"]);
  // Two identical halves so translateX(-50%) loops seamlessly.
  const halves = [0, 1];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {halves.flatMap((h) =>
          words.map((w, i) => <span key={`${h}-${i}`}>{w}</span>),
        )}
      </div>
    </div>
  );
}
