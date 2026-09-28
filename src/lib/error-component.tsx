import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { ParamedicMark } from "@/components/chrome";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main
      className={
        "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center " +
        "bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50"
      }
    >
      <span className="text-red-500" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="flex items-center gap-2 text-lg font-semibold">
        <ParamedicMark />
        Something went wrong
      </h1>
      <p className="max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400">
        {error.message || "An unexpected error occurred. Try reloading the page."}
      </p>
    </main>
  );
}
