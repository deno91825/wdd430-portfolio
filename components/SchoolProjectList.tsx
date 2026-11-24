import ProjectCard from "./ProjectCard";
import { getProjects } from "@/lib/projects-db";

export default async function SchoolProjectList() {
  const projects = await getProjects("school");

  return (
    <section className="grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          type={project.type}
          title={project.title}
          description={project.description}
          technologies={project.technologies}
          link={project.link ?? undefined}
        />
      ))}
    </section>
  );
}
