"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ProjectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().optional(),
  content: z.string().min(1),
  imageUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  techStack: z.string().min(1), // comma-separated, split below
  category: z.string().default("Web App"),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(false),
  order: z.coerce.number().default(0),
});

export async function createProject(_: unknown, formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const raw = Object.fromEntries(formData);
  raw.featured = formData.get("featured") === "on" ? "true" : "false";
  raw.published = formData.get("published") === "on" ? "true" : "false";

  const parsed = ProjectSchema.safeParse(raw);
  if (!parsed.success) return { error: "Invalid data" };

  const { techStack, ...rest } = parsed.data;
  await prisma.project.create({
    data: { ...rest, techStack: techStack.split(",").map((t) => t.trim()).filter(Boolean) },
  });

  revalidatePath("/");
  revalidatePath("/admin/dashboard/projects");
  redirect("/admin/dashboard/projects");
}

export async function updateProject(id: number, _: unknown, formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const raw = Object.fromEntries(formData);
  raw.featured = formData.get("featured") === "on" ? "true" : "false";
  raw.published = formData.get("published") === "on" ? "true" : "false";

  const parsed = ProjectSchema.safeParse(raw);
  if (!parsed.success) return { error: "Invalid data" };

  const { techStack, ...rest } = parsed.data;
  await prisma.project.update({
    where: { id },
    data: { ...rest, techStack: techStack.split(",").map((t) => t.trim()).filter(Boolean) },
  });

  revalidatePath("/");
  revalidatePath("/admin/dashboard/projects");
  redirect("/admin/dashboard/projects");
}

export async function deleteProject(id: number) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/dashboard/projects");
}
