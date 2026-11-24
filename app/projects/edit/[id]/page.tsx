import { updateProject } from "@/lib/actions";
import { getProjectById } from "@/lib/projects-db";
import { notFound } from "next/navigation";

export const instant = false;

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = Number(id);

  if (!Number.isSafeInteger(projectId) || projectId <= 0) {
    notFound();
  }

  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  const updateProjectWithId = updateProject.bind(null, id);

  return (
    <main className="container mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">Edit Project</h1>

      <form action={updateProjectWithId} className="space-y-6">
        <div>
          <label htmlFor="title" className="mb-2 block font-medium">
            Project Title
          </label>
          <input
            id="title"
            name="title"
            defaultValue={project.title}
            required
            minLength={2}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={project.description}
            required
            minLength={10}
            rows={4}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label htmlFor="type" className="mb-2 block font-medium">
            Project Type
          </label>
          <select
            id="type"
            name="type"
            defaultValue={project.type}
            required
            className="w-full rounded-lg border p-3"
          >
            <option value="opensource">Open Source</option>
            <option value="school">School</option>
          </select>
        </div>

        <div>
          <label htmlFor="technologies" className="mb-2 block font-medium">
            Technologies (comma-separated)
          </label>
          <input
            id="technologies"
            name="technologies"
            defaultValue={project.technologies.join(", ")}
            required
            minLength={2}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label htmlFor="link" className="mb-2 block font-medium">
            Project Link (optional)
          </label>
          <input
            id="link"
            name="link"
            type="url"
            defaultValue={project.link ?? ""}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Update Project
        </button>
      </form>
    </main>
  );
}
