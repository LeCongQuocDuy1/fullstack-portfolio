import { createProject } from "@/lib/actions/projects";
import { ProjectForm } from "@/components/admin/forms/project-form";
import Link from "next/link";

export const metadata = { title: "Add Project" };

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/dashboard/projects" className="text-gray-400 hover:text-white text-sm">← Back</Link>
        <h1 className="text-2xl font-bold">Add Project</h1>
      </div>
      <ProjectForm action={createProject} submitLabel="Add Project" />
    </div>
  );
}
