
interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  link,
}: ProjectCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>

      <p className="mt-3 text-gray-600">{description}</p>

      <p className="mt-4 text-sm font-medium text-blue-700">
        Technologies: {technologies.join(", ")}
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
    </article>
  );
}
