"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const EducationSchema = z.object({
  school: z.string().min(1),
  degree: z.string().min(1),
  field: z.string().min(1),
  description: z.string().optional(),
  logoUrl: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  order: z.coerce.number().default(0),
});

export async function createEducation(_: unknown, formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const parsed = EducationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid data" };

  const { startDate, endDate, ...rest } = parsed.data;
  await prisma.education.create({
    data: {
      ...rest,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/dashboard/education");
  redirect("/admin/dashboard/education");
}

export async function updateEducation(id: number, _: unknown, formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const parsed = EducationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid data" };

  const { startDate, endDate, ...rest } = parsed.data;
  await prisma.education.update({
    where: { id },
    data: {
      ...rest,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/dashboard/education");
  redirect("/admin/dashboard/education");
}

export async function deleteEducation(id: number) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  await prisma.education.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/dashboard/education");
}
