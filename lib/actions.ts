"use server";

import { sql } from "@vercel/postgres";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ProjectFormSchema = z.object({
  title: z.string().trim().min(2),
  description: z.string().trim().min(10),
  type: z.enum(["opensource", "school"]),
  technologies: z.string().trim().min(2),
  link: z.string().trim().optional(),
});

function parseProject(formData: FormData) {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    type: formData.get("type"),
    technologies: formData.get("technologies"),
    link: formData.get("link") ?? "",
  };

  const parsed = ProjectFormSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error("Invalid project information.");
  }

  return parsed.data;
}

function toPostgresArray(values: string[]): string {
  return `{${values.map((value) => `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`).join(",")}}`;
}

export async function createProject(formData: FormData) {
  const project = parseProject(formData);

  const technologies = project.technologies
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  await sql`
    INSERT INTO projects (title, description, type, technologies, link)
    VALUES (
      ${project.title},
      ${project.description},
      ${project.type},
      ${toPostgresArray(technologies)}::text[],
      ${project.link || null}
    )
  `;

  revalidatePath("/projects");
  redirect("/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const project = parseProject(formData);
  const projectId = Number(id);

  if (!Number.isSafeInteger(projectId) || projectId <= 0) {
    throw new Error("Invalid project ID.");
  }

  const technologies = project.technologies
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  await sql`
    UPDATE projects
    SET
      title = ${project.title},
      description = ${project.description},
      type = ${project.type},
      technologies = ${toPostgresArray(technologies)}::text[],
      link = ${project.link || null}
    WHERE id = ${projectId}
  `;

  revalidatePath("/projects");
  redirect("/projects");
}

export async function deleteProject(id: string) {
  const projectId = Number(id);

  if (!Number.isSafeInteger(projectId) || projectId <= 0) {
    throw new Error("Invalid project ID.");
  }

  await sql`
    DELETE FROM projects WHERE id = ${projectId}
  `;

  revalidatePath("/projects");
}



