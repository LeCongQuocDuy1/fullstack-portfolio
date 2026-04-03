"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const SkillSchema = z.object({
  name: z.string().min(1),
  icon: z.string().optional(),
  level: z.coerce.number().min(0).max(100).default(80),
  category: z.enum(["FRONTEND", "BACKEND", "DATABASE", "DEVOPS", "OTHER"]).default("OTHER"),
  order: z.coerce.number().default(0),
});

export async function createSkill(_: unknown, formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const parsed = SkillSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid data" };

  await prisma.skill.create({ data: parsed.data });
  revalidatePath("/");
  revalidatePath("/admin/dashboard/skills");
  redirect("/admin/dashboard/skills");
}

export async function updateSkill(id: number, _: unknown, formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const parsed = SkillSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid data" };

  await prisma.skill.update({ where: { id }, data: parsed.data });
  revalidatePath("/");
  revalidatePath("/admin/dashboard/skills");
  redirect("/admin/dashboard/skills");
}

export async function deleteSkill(id: number) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/dashboard/skills");
}
