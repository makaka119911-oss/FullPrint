"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none text-zinc-800 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-200",
        className,
      )}
      {...props}
    />
  );
}

export { Label };

