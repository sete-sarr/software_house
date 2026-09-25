"use client";

import type { ReactNode } from "react";

interface DeleteFormProps {
  action: () => Promise<void>;
  confirmMessage: string;
  children: ReactNode;
}

export function DeleteForm({ action, confirmMessage, children }: DeleteFormProps) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      {children}
    </form>
  );
}
