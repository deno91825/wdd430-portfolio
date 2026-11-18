export default function Loading() {
  return (
    <main className="container mx-auto px-6 py-12 animate-pulse">
      <div className="mb-8 h-9 w-64 rounded bg-gray-300"></div>

      <section className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((item) => (
          <div key={item} className="rounded-lg border p-6">
            <div className="mb-4 h-6 w-3/4 rounded bg-gray-300"></div>
            <div className="mb-3 h-4 w-full rounded bg-gray-300"></div>
            <div className="mb-3 h-4 w-5/6 rounded bg-gray-300"></div>
            <div className="h-4 w-1/2 rounded bg-gray-300"></div>
          </div>
        ))}
      </section>
    </main>
  );
}
