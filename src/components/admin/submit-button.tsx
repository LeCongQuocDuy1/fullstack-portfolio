"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ label = "Save" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg font-medium transition-colors"
    >
      {pending ? "Saving…" : label}
    </button>
  );
}
