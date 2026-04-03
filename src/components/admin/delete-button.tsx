"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";

interface Props {
  action: () => Promise<unknown>;
  label?: string;
}

export function DeleteButton({ action, label = "Delete" }: Props) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm(`Delete this ${label}? This cannot be undone.`)) return;
    startTransition(() => action());
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:opacity-50 transition-colors"
    >
      <Trash2 size={14} />
      {pending ? "Deleting…" : label}
    </button>
  );
}
