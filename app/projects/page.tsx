import ProjectList from "@/components/ProjectList";

export const instant = false;

export default function ProjectsPage() {
  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">All Projects</h1>
      <ProjectList />
    </main>
  );
}
