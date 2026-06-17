export default function Loading() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero skeleton */}
      <div className="relative flex h-[92vh] items-center justify-center bg-noir/5">
        <div className="h-12 w-64 animate-pulse rounded-lg bg-noir/10" />
      </div>

      {/* Section skeletons */}
      <div className="mx-auto max-w-7xl space-y-20 px-6 py-20">
        {[1, 2].map((s) => (
          <div key={s}>
            <div className="mb-10 flex flex-col items-center gap-3">
              <div className="h-3 w-24 animate-pulse rounded bg-noir/10" />
              <div className="h-8 w-48 animate-pulse rounded-lg bg-noir/10" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-soft">
                  <div className="h-60 animate-pulse bg-noir/8" />
                  <div className="space-y-3 p-5">
                    <div className="h-3 w-1/2 animate-pulse rounded bg-noir/10" />
                    <div className="h-5 w-3/4 animate-pulse rounded bg-noir/10" />
                    <div className="h-10 animate-pulse rounded-full bg-noir/8" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
