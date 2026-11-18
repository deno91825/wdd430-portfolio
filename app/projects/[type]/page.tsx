import ProjectList from "@/components/ProjectList";

export const instant = false;

export default async function ProjectTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">
        {type === "school" ? "School Projects" : "Open Source Projects"}
      </h1>
      <ProjectList type={type} />
    </main>
  );
}
