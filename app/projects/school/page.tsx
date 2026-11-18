import { Suspense } from "react";
import SchoolProjectList from "@/components/SchoolProjectList";

export const instant = false;

function SchoolProjectsSkeleton() {
  return (
    <section className="grid gap-6 md:grid-cols-2 animate-pulse">
      {[1, 2].map((item) => (
        <div key={item} className="rounded-lg border p-6">
          <div className="mb-4 h-6 w-3/4 rounded bg-gray-300"></div>
          <div className="mb-3 h-4 w-full rounded bg-gray-300"></div>
          <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        </div>
      ))}
    </section>
  );
}

export default function SchoolProjectsPage() {
  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">School Projects</h1>

      <Suspense fallback={<SchoolProjectsSkeleton />}>
        <SchoolProjectList />
      </Suspense>
    </main>
  );
}
