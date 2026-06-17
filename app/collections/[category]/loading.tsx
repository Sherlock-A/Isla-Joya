export default function CollectionLoading() {
  return (
    <main className="min-h-screen bg-ivory pt-20">
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="mb-10 flex flex-col items-center gap-3">
          <div className="h-3 w-20 animate-pulse rounded bg-noir/10" />
          <div className="h-9 w-40 animate-pulse rounded-lg bg-noir/10" />
          <div className="h-3 w-56 animate-pulse rounded bg-noir/10" />
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
      </section>
    </main>
  );
}
