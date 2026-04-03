import { createEducation } from "@/lib/actions/education";
import { EducationForm } from "@/components/admin/forms/education-form";
import Link from "next/link";

export const metadata = { title: "Add Education" };

export default function NewEducationPage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/dashboard/education" className="text-gray-400 hover:text-white text-sm">← Back</Link>
        <h1 className="text-2xl font-bold">Add Education</h1>
      </div>
      <EducationForm action={createEducation} submitLabel="Add Education" />
    </div>
  );
}
