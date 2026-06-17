const items = [
  "Wear your light",
  "Modern heirlooms",
  "Luxury, made personal",
  "Free delivery over €150",
  "Grossiste · Wholesale",
  "Maroc 🇲🇦 · España 🇪🇸",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-noir/10 bg-champagne py-5">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-xl italic text-noir/80">{t}</span>
            <span className="text-gold">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
