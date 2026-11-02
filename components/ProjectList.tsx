
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Sleep Outside",
    description:
      "A web application project focused on an online outdoor camping and product shopping experience.",
    technologies: ["JavaScript", "HTML", "CSS"],
    link: "https://github.com/vikersjunior/wdd330-sleepoutside",
  },
  {
    title: "CS341 Team Project",
    description:
      "A collaborative software development project completed as part of a university team.",
    technologies: ["Software Development", "Team Collaboration"],
    link: "https://github.com/AlexM2111V/cs341-team-project-group03",
  },
];

export default function ProjectList() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </section>
  );
}
