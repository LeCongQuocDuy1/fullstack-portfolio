import { prisma } from "@/lib/prisma";
import { deleteSkill } from "@/lib/actions/skills";
import { DeleteButton } from "@/components/admin/delete-button";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

export const revalidate = 0;
export const metadata = { title: "Skills" };

const categoryColors: Record<string, string> = {
  FRONTEND: "text-blue-400 bg-blue-400/10",
  BACKEND: "text-green-400 bg-green-400/10",
  DATABASE: "text-yellow-400 bg-yellow-400/10",
  DEVOPS: "text-orange-400 bg-orange-400/10",
  OTHER: "text-gray-400 bg-gray-400/10",
};

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Skills</h1>
        <Link href="/admin/dashboard/skills/new" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} /> Add Skill
        </Link>
      </div>

      {skills.length === 0 ? (
        <p className="text-gray-400">No skills yet.</p>
      ) : (
        <div className="space-y-2">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-800">
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[skill.category]}`}>
                  {skill.category}
                </span>
                <p className="font-medium">{skill.name}</p>
                <span className="text-sm text-gray-400">{skill.level}%</span>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/dashboard/skills/${skill.id}`} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-gray-700 hover:bg-gray-600 transition-colors">
                  <Pencil size={14} /> Edit
                </Link>
                <DeleteButton action={deleteSkill.bind(null, skill.id)} label="skill" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
