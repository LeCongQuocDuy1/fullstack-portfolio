import { prisma } from "@/lib/prisma";
import { deleteEducation } from "@/lib/actions/education";
import { DeleteButton } from "@/components/admin/delete-button";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

export const revalidate = 0;
export const metadata = { title: "Education" };

export default async function EducationPage() {
  const education = await prisma.education.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Education</h1>
        <Link href="/admin/dashboard/education/new" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} /> Add Entry
        </Link>
      </div>

      {education.length === 0 ? (
        <p className="text-gray-400">No entries yet.</p>
      ) : (
        <div className="space-y-3">
          {education.map((edu) => (
            <div key={edu.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-800">
              <div>
                <p className="font-medium">{edu.degree} in {edu.field}</p>
                <p className="text-sm text-gray-400">{edu.school} · {edu.startDate.getFullYear()} – {edu.endDate ? edu.endDate.getFullYear() : "Present"}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/dashboard/education/${edu.id}`} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-gray-700 hover:bg-gray-600 transition-colors">
                  <Pencil size={14} /> Edit
                </Link>
                <DeleteButton action={deleteEducation.bind(null, edu.id)} label="education" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
