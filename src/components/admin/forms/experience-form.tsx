"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/admin/submit-button";
import { FormToast } from "@/components/admin/form-toast";
import type { Experience } from "@prisma/client";

const inputCls = "w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500";
const labelCls = "block text-sm text-gray-400 mb-1";

function toDateInput(date: Date) {
  return date.toISOString().split("T")[0];
}

interface Props {
  action: (state: unknown, formData: FormData) => Promise<{ error: string } | undefined>;
  defaultValues?: Experience;
  submitLabel: string;
}

export function ExperienceForm({ action, defaultValues, submitLabel }: Props) {
  const [result, formAction] = useActionState(action, null);

  return (
    <>
      <FormToast result={result} />
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Company *</label>
            <input name="company" required defaultValue={defaultValues?.company} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Position *</label>
            <input name="position" required defaultValue={defaultValues?.position} className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Description *</label>
          <textarea name="description" required rows={4} defaultValue={defaultValues?.description} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Location</label>
          <input name="location" defaultValue={defaultValues?.location ?? ""} className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Start Date *</label>
            <input name="startDate" type="date" required defaultValue={defaultValues ? toDateInput(defaultValues.startDate) : ""} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>End Date (blank = Present)</label>
            <input name="endDate" type="date" defaultValue={defaultValues?.endDate ? toDateInput(defaultValues.endDate) : ""} className={inputCls} />
          </div>
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
