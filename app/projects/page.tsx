import Link from "next/link";
import { Suspense } from "react";
import ProjectCard from "@/components/ProjectCard";
import ProjectSearch from "@/components/ProjectSearch";
import Pagination from "@/components/Pagination";
import {
  fetchFilteredProjects,
  fetchProjectsPages,
} from "@/lib/projects-db";

export const instant = false;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const params = await searchParams;

  const query = (params.query ?? "")
    .trim()
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .slice(0, 100);

  const requestedPage = Number(params.page);
  const currentPage =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const totalPages = await fetchProjectsPages(query);
  const page = Math.min(currentPage, Math.max(totalPages, 1));

  const projects = await fetchFilteredProjects(query, page);

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">All Projects</h1>
        <Link
          href="/projects/create"
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Create Project
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="mb-8 h-12 animate-pulse rounded bg-gray-200" />
        }
      >
        <ProjectSearch />
      </Suspense>

      <section className="grid gap-6 md:grid-cols-2">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              type={project.type}
              technologies={project.technologies}
              link={project.link ?? undefined}
            />
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </section>

      <Pagination totalPages={totalPages} />
    </main>
  );
}
