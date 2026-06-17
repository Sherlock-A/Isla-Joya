"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ivory px-6 pt-20 text-center">
      <p className="eyebrow">Erreur</p>
      <h1 className="font-display text-4xl text-noir">Quelque chose s&apos;est mal passé</h1>
      <p className="max-w-sm text-noir/60">Veuillez réessayer ou revenir à l&apos;accueil.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-noir px-8 py-3 text-[11px] uppercase tracking-[0.18em] text-ivory transition hover:opacity-80"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="rounded-full border border-noir/20 px-8 py-3 text-[11px] uppercase tracking-[0.18em] text-noir transition hover:bg-noir/5"
        >
          Accueil
        </Link>
      </div>
    </main>
  );
}
