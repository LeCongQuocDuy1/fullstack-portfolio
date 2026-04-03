"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/admin/submit-button";
import { FormToast } from "@/components/admin/form-toast";
import type { Project } from "@prisma/client";

const inputCls = "w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500";
const labelCls = "block text-sm text-gray-400 mb-1";

interface Props {
  action: (state: unknown, formData: FormData) => Promise<{ error: string } | undefined>;
  defaultValues?: Project;
  submitLabel: string;
}

export function ProjectForm({ action, defaultValues, submitLabel }: Props) {
  const [result, formAction] = useActionState(action, null);

  return (
    <>
      <FormToast result={result} />
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Title *</label>
            <input name="title" required defaultValue={defaultValues?.title} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Slug * (used in URL)</label>
            <input name="slug" required defaultValue={defaultValues?.slug} className={inputCls} placeholder="my-project" />
          </div>
        </div>
        <div>
          <label className={labelCls}>Summary (2–3 sentences)</label>
          <input name="summary" defaultValue={defaultValues?.summary} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Content * (Markdown supported)</label>
          <textarea name="content" required rows={6} defaultValue={defaultValues?.content} className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Category</label>
            <input name="category" defaultValue={defaultValues?.category ?? "Web App"} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Tech Stack * (comma-separated)</label>
            <input name="techStack" required defaultValue={defaultValues?.techStack.join(", ")} className={inputCls} placeholder="Next.js, TypeScript, Prisma" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Demo URL</label>
            <input name="demoUrl" type="url" defaultValue={defaultValues?.demoUrl ?? ""} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>GitHub URL</label>
            <input name="githubUrl" type="url" defaultValue={defaultValues?.githubUrl ?? ""} className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Image URL</label>
          <input name="imageUrl" type="url" defaultValue={defaultValues?.imageUrl ?? ""} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Display Order</label>
          <input name="order" type="number" defaultValue={defaultValues?.order ?? 0} className={inputCls} />
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input name="featured" type="checkbox" defaultChecked={defaultValues?.featured} className="w-4 h-4 accent-indigo-500" />
            <span className="text-sm">Featured on homepage</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input name="published" type="checkbox" defaultChecked={defaultValues?.published} className="w-4 h-4 accent-indigo-500" />
            <span className="text-sm">Published</span>
          </label>
        </div>
        <SubmitButton label={submitLabel} />
      </form>
    </>
  );
}
