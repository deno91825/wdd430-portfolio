import { createProject } from "@/lib/actions";

export default function CreateProjectPage() {
  return (
    <main className="container mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">Create New Project</h1>

      <form action={createProject} className="space-y-6">
        <div>
          <label htmlFor="title" className="mb-2 block font-medium">
            Project Title
          </label>
          <input
            id="title"
            name="title"
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
            required
            minLength={2}
            placeholder="Next.js, TypeScript, PostgreSQL"
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
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Save Project
        </button>
      </form>
    </main>
  );
}
