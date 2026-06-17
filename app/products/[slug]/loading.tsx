export default function ProductLoading() {
  return (
    <main className="min-h-screen bg-ivory pt-20">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image skeleton */}
          <div className="h-[480px] animate-pulse rounded-3xl bg-noir/8" />

          {/* Info skeleton */}
          <div className="flex flex-col gap-5 py-4">
            <div className="h-3 w-20 animate-pulse rounded bg-noir/10" />
            <div className="h-10 w-3/4 animate-pulse rounded-lg bg-noir/10" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-noir/10" />
            <div className="h-8 w-24 animate-pulse rounded-lg bg-noir/10" />
            <div className="mt-4 space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-3 animate-pulse rounded bg-noir/8" />
              ))}
            </div>
            <div className="mt-6 h-14 animate-pulse rounded-full bg-noir/10" />
          </div>
        </div>
      </div>
    </main>
  );
}
