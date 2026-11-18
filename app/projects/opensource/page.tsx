import ProjectList from "@/components/ProjectList";

export const instant = false;

export default function OpenSourceProjectsPage() {
  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">
        Open Source Projects
      </h1>
      <ProjectList type="opensource" />
    </main>
  );
}
