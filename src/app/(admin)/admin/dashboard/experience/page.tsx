import { prisma } from "@/lib/prisma";
import { deleteExperience } from "@/lib/actions/experience";
import { DeleteButton } from "@/components/admin/delete-button";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

export const revalidate = 0;
export const metadata = { title: "Experience" };

export default async function ExperiencePage() {
  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Experience</h1>
        <Link href="/admin/dashboard/experience/new" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} /> Add Entry
        </Link>
      </div>

      {experiences.length === 0 ? (
        <p className="text-gray-400">No entries yet.</p>
      ) : (
        <div className="space-y-3">
          {experiences.map((exp) => (
            <div key={exp.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-800">
              <div>
                <p className="font-medium">{exp.position}</p>
                <p className="text-sm text-gray-400">{exp.company} · {exp.startDate.getFullYear()} – {exp.endDate ? exp.endDate.getFullYear() : "Present"}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/dashboard/experience/${exp.id}`} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-gray-700 hover:bg-gray-600 transition-colors">
                  <Pencil size={14} /> Edit
                </Link>
                <DeleteButton action={deleteExperience.bind(null, exp.id)} label="experience" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
