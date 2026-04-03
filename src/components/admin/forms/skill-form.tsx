"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/admin/submit-button";
import { FormToast } from "@/components/admin/form-toast";
import type { Skill } from "@prisma/client";

const inputCls = "w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500";
const labelCls = "block text-sm text-gray-400 mb-1";

interface Props {
  action: (state: unknown, formData: FormData) => Promise<{ error: string } | undefined>;
  defaultValues?: Skill;
  submitLabel: string;
}

export function SkillForm({ action, defaultValues, submitLabel }: Props) {
  const [result, formAction] = useActionState(action, null);

  return (
    <>
      <FormToast result={result} />
      <form action={formAction} className="space-y-4">
        <div>
          <label className={labelCls}>Name *</label>
          <input name="name" required defaultValue={defaultValues?.name} className={inputCls} placeholder="TypeScript" />
        </div>
        <div>
          <label className={labelCls}>Category</label>
          <select name="category" defaultValue={defaultValues?.category ?? "OTHER"} className={inputCls}>
            <option value="FRONTEND">Frontend</option>
            <option value="BACKEND">Backend</option>
            <option value="DATABASE">Database</option>
            <option value="DEVOPS">DevOps</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Proficiency Level (0–100)</label>
          <input name="level" type="number" min={0} max={100} defaultValue={defaultValues?.level ?? 80} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Icon key (optional)</label>
          <input name="icon" defaultValue={defaultValues?.icon ?? ""} className={inputCls} placeholder="typescript" />
        </div>
        <div>
          <label className={labelCls}>Display Order</label>
          <input name="order" type="number" defaultValue={defaultValues?.order ?? 0} className={inputCls} />
        </div>
        <SubmitButton label={submitLabel} />
      </form>
    </>
  );
}
