import { createSkill } from "@/lib/actions/skills";
import { SkillForm } from "@/components/admin/forms/skill-form";
import Link from "next/link";

export const metadata = { title: "Add Skill" };

export default function NewSkillPage() {
  return (
    <div className="max-w-md">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/dashboard/skills" className="text-gray-400 hover:text-white text-sm">← Back</Link>
        <h1 className="text-2xl font-bold">Add Skill</h1>
      </div>
      <SkillForm action={createSkill} submitLabel="Add Skill" />
    </div>
  );
}
