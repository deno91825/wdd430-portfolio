"use server";

import { sql } from "@vercel/postgres";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const currentYear = new Date().getFullYear();

const ProjectFormSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters."),
  description: z.string().trim().min(10, "Description must be at least 10 characters."),
  type: z.enum(["opensource", "school"]),
  technologies: z.string().trim().min(2, "Add at least one technology."),
  link: z.string().trim().optional(),
});

const CreateProjectSchema = ProjectFormSchema.extend({
  yearCompleted: z.coerce
    .number()
    .int("Year must be a whole number.")
    .gte(2000, "Year must be 2000 or later.")
    .lte(currentYear, `Year cannot be greater than ${currentYear}.`),
});

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    type?: string[];
    technologies?: string[];
    link?: string[];
    yearCompleted?: string[];
  };
  message?: string | null;
};

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

export async function createProject(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = CreateProjectSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    type: formData.get("type"),
    technologies: formData.get("technologies"),
    link: formData.get("link") ?? "",
    yearCompleted: formData.get("yearCompleted"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  const project = validatedFields.data;

  const technologies = project.technologies
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  try {
    await sql`
      INSERT INTO projects (
        title, description, type, technologies, link, year_completed
      )
      VALUES (
        ${project.title},
        ${project.description},
        ${project.type},
        ${toPostgresArray(technologies)}::text[],
        ${project.link || null},
        ${project.yearCompleted}
      )
    `;
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      message: "Database Error: Failed to create project.",
    };
  }

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

  try {
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
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error("Failed to update project. Please try again later.");
  }

  revalidatePath("/projects");
  redirect("/projects");
}

export async function deleteProject(id: string) {
  const projectId = Number(id);

  if (!Number.isSafeInteger(projectId) || projectId <= 0) {
    throw new Error("Invalid project ID.");
  }

  try {
    await sql`
      DELETE FROM projects WHERE id = ${projectId}
    `;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete project. Please try again later.");
  }

  revalidatePath("/projects");
}

