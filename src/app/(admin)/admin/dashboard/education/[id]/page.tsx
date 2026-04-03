import { prisma } from "@/lib/prisma";
import { updateEducation } from "@/lib/actions/education";
import { EducationForm } from "@/components/admin/forms/education-form";
import { notFound } from "next/navigation";
import Link from "next/link";

export const metadata = { title: "Edit Education" };

export default async function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const edu = await prisma.education.findUnique({ where: { id: Number(id) } });
  if (!edu) notFound();

  const action = updateEducation.bind(null, edu.id);
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/dashboard/education" className="text-gray-400 hover:text-white text-sm">← Back</Link>
        <h1 className="text-2xl font-bold">Edit Education</h1>
      </div>
      <EducationForm action={action} defaultValues={edu} submitLabel="Save Changes" />
    </div>
  );
}
