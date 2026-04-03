import { prisma } from "@/lib/prisma";
import { deleteProject } from "@/lib/actions/projects";
import { DeleteButton } from "@/components/admin/delete-button";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

export const revalidate = 0;
export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link href="/admin/dashboard/projects/new" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} /> Add Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-400">No projects yet.</p>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-800">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{project.title}</p>
                  {project.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400">Featured</span>}
                  {project.published
                    ? <span className="text-xs px-2 py-0.5 rounded-full bg-green-400/10 text-green-400">Published</span>
                    : <span className="text-xs px-2 py-0.5 rounded-full bg-gray-400/10 text-gray-400">Draft</span>
                  }
                </div>
                <p className="text-sm text-gray-400">{project.category} · {project.techStack.join(", ")}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/dashboard/projects/${project.id}`} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-gray-700 hover:bg-gray-600 transition-colors">
                  <Pencil size={14} /> Edit
                </Link>
                <DeleteButton action={deleteProject.bind(null, project.id)} label="project" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
