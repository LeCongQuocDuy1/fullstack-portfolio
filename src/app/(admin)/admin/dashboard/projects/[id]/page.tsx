import { prisma } from "@/lib/prisma";
import { updateProject } from "@/lib/actions/projects";
import { ProjectForm } from "@/components/admin/forms/project-form";
import { notFound } from "next/navigation";
import Link from "next/link";

export const metadata = { title: "Edit Project" };

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id: Number(id) } });
  if (!project) notFound();

  const action = updateProject.bind(null, project.id);
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/dashboard/projects" className="text-gray-400 hover:text-white text-sm">← Back</Link>
        <h1 className="text-2xl font-bold">Edit Project</h1>
      </div>
      <ProjectForm action={action} defaultValues={project} submitLabel="Save Changes" />
    </div>
  );
}
