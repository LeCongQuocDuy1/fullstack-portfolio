import { prisma } from "@/lib/prisma";
import { updateSkill } from "@/lib/actions/skills";
import { SkillForm } from "@/components/admin/forms/skill-form";
import { notFound } from "next/navigation";
import Link from "next/link";

export const metadata = { title: "Edit Skill" };

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skill = await prisma.skill.findUnique({ where: { id: Number(id) } });
  if (!skill) notFound();

  const action = updateSkill.bind(null, skill.id);
  return (
    <div className="max-w-md">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/dashboard/skills" className="text-gray-400 hover:text-white text-sm">← Back</Link>
        <h1 className="text-2xl font-bold">Edit Skill</h1>
      </div>
      <SkillForm action={action} defaultValues={skill} submitLabel="Save Changes" />
    </div>
  );
}
