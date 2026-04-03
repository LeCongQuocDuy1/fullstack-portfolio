import { prisma } from "@/lib/prisma";
import { updateExperience } from "@/lib/actions/experience";
import { ExperienceForm } from "@/components/admin/forms/experience-form";
import { notFound } from "next/navigation";
import Link from "next/link";

export const metadata = { title: "Edit Experience" };

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exp = await prisma.experience.findUnique({ where: { id: Number(id) } });
  if (!exp) notFound();

  const action = updateExperience.bind(null, exp.id);
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/dashboard/experience" className="text-gray-400 hover:text-white text-sm">← Back</Link>
        <h1 className="text-2xl font-bold">Edit Experience</h1>
      </div>
      <ExperienceForm action={action} defaultValues={exp} submitLabel="Save Changes" />
    </div>
  );
}
