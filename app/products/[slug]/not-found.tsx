import Link from "next/link";
import { categories } from "@/lib/products";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ivory px-6 pt-20 text-center">
      <p className="eyebrow">Produit introuvable</p>
      <h1 className="font-display text-4xl text-noir">Ce bijou n&apos;existe plus</h1>
      <p className="max-w-sm text-noir/60">
        Ce produit a été retiré du catalogue. Découvrez nos collections.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        {categories.map((c) => (
          <Link
            key={c.key}
            href={`/collections/${c.key}`}
            className="rounded-full border border-noir/20 px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] text-noir transition hover:bg-noir hover:text-ivory"
          >
            {c.label}
          </Link>
        ))}
      </div>
      <Link
        href="/"
        className="mt-2 text-sm text-noir/50 underline underline-offset-4 hover:text-noir"
      >
        ← Retour à l&apos;accueil
      </Link>
    </main>
  );
}
