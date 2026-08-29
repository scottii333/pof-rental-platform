"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type DisclosureProps = {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

const Disclosure = ({ label, children, defaultOpen = false }: DisclosureProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={contentId}
        className="flex items-center gap-1 text-sm underline underline-offset-2"
      >
        {label}
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        id={contentId}
        className={cn(
          "grid transition-all duration-200 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="pt-2 text-sm text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Disclosure;
