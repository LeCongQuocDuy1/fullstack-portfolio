import { createExperience } from "@/lib/actions/experience";
import { ExperienceForm } from "@/components/admin/forms/experience-form";
import Link from "next/link";

export const metadata = { title: "Add Experience" };

export default function NewExperiencePage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/dashboard/experience" className="text-gray-400 hover:text-white text-sm">← Back</Link>
        <h1 className="text-2xl font-bold">Add Experience</h1>
      </div>
      <ExperienceForm action={createExperience} submitLabel="Add Experience" />
    </div>
  );
}
