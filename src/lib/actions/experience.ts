"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ExperienceSchema = z.object({
  company: z.string().min(1),
  position: z.string().min(1),
  description: z.string().min(1),
  location: z.string().optional(),
  logoUrl: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  order: z.coerce.number().default(0),
});

export async function createExperience(_: unknown, formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const parsed = ExperienceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid data" };

  const { startDate, endDate, ...rest } = parsed.data;
  await prisma.experience.create({
    data: { ...rest, startDate: new Date(startDate), endDate: endDate ? new Date(endDate) : null },
  });

  revalidatePath("/");
  revalidatePath("/admin/dashboard/experience");
  redirect("/admin/dashboard/experience");
}

export async function updateExperience(id: number, _: unknown, formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const parsed = ExperienceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid data" };

  const { startDate, endDate, ...rest } = parsed.data;
  await prisma.experience.update({
    where: { id },
    data: { ...rest, startDate: new Date(startDate), endDate: endDate ? new Date(endDate) : null },
  });

  revalidatePath("/");
  revalidatePath("/admin/dashboard/experience");
  redirect("/admin/dashboard/experience");
}

export async function deleteExperience(id: number) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/dashboard/experience");
}
