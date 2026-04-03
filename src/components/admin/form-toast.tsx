"use client";

import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
  result: { success?: boolean; error?: string } | null | undefined;
  successMessage?: string;
}

export function FormToast({ result, successMessage = "Saved successfully!" }: Props) {
  useEffect(() => {
    if (!result) return;
    if (result.success) toast.success(successMessage);
    if (result.error) toast.error(result.error);
  }, [result, successMessage]);

  return null;
}
