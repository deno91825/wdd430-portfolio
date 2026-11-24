"use client";

import { useActionState } from "react";
import { createProject, type State } from "@/lib/actions";

const initialState: State = {
  message: null,
  errors: {},
};

export default function CreateProjectForm() {
  const [state, formAction, isPending] = useActionState(
    createProject,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="title" className="mb-2 block font-medium">
          Project Title
        </label>
        <input
          id="title"
          name="title"
          required
          minLength={2}
          aria-describedby="title-error"
          className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div id="title-error" aria-live="polite" aria-atomic="true">
          {state.errors?.title?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
          ))}
        </div>
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
          aria-describedby="description-error"
          className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div id="description-error" aria-live="polite" aria-atomic="true">
          {state.errors?.description?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="type" className="mb-2 block font-medium">
          Project Type
        </label>
        <select
          id="type"
          name="type"
          required
          className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          aria-describedby="technologies-error"
          className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div id="technologies-error" aria-live="polite" aria-atomic="true">
          {state.errors?.technologies?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="yearCompleted" className="mb-2 block font-medium">
          Year Completed
        </label>
        <input
          id="yearCompleted"
          name="yearCompleted"
          type="number"
          min="2000"
                    required
          aria-describedby="yearCompleted-error"
          className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div id="yearCompleted-error" aria-live="polite" aria-atomic="true">
          {state.errors?.yearCompleted?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="link" className="mb-2 block font-medium">
          Project Link (optional)
        </label>
        <input
          id="link"
          name="link"
          type="url"
          className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {state.message && (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save Project"}
      </button>
    </form>
  );
}

