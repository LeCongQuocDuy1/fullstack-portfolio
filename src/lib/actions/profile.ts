"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ProfileSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  bio: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  website: z.string().optional(),
  avatarUrl: z.string().optional(),
  resumeUrl: z.string().optional(),
});

export async function updateProfile(_: unknown, formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const parsed = ProfileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid data" };

  await prisma.profile.upsert({
    where: { id: 1 },
    update: parsed.data,
    create: { id: 1, ...parsed.data },
  });

  revalidatePath("/");
  revalidatePath("/admin/dashboard/profile");
  return { success: true };
}
