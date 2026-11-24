import Link from "next/link";
import { deleteProject } from "@/lib/actions";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  type,
  technologies,
  link,
}: ProjectCardProps) {
  const deleteProjectWithId = deleteProject.bind(null, String(id));

  return (
    <article className="rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>

      <p className="mt-3 text-gray-600">{description}</p>

      <p className="mt-4 text-sm font-medium text-blue-700">
        Technologies: {technologies.join(", ")}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        Type: {type === "opensource" ? "Open Source" : "School"}
      </p>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-blue-600 underline hover:text-blue-800"
        >
          View Project
        </a>
      )}

      <div className="mt-6 flex gap-3">
        <Link
          href={`/projects/edit/${id}`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Edit
        </Link>

        <form action={deleteProjectWithId}>
          <button
            type="submit"
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}

