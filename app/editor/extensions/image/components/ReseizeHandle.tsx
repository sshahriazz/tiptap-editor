import * as React from "react";
import { cn } from "@nextui-org/react";
import { Scaling } from "lucide-react";

interface ResizeProps extends React.HTMLAttributes<HTMLDivElement> {
  isResizing?: boolean;
  activeRes?: "left" | "right" | null;
}

export const ResizeHandle = React.forwardRef<HTMLDivElement, ResizeProps>(
  ({ className, isResizing = false, activeRes, ...props }, ref) => {
    return (
      <div
        className={cn(
          "absolute bottom-1 h-6 transform cursor-move rounded border border-solid border-[var(--mt-transparent-foreground) p-px transition-all",
          "bg-white opacity-0",
          {
            "opacity-80 ": isResizing,
            "translate transform rotate-[-90deg]":
              activeRes !== null && activeRes === "right",
            "group-hover/node-image:opacity-80": !isResizing,
          },
          "before:absolute before:inset-y-0 before:-left-1 before:-right-1",
          className
        )}
        ref={ref}
        {...props}
      >
        <Scaling size={20} className="text-default-800 " />
      </div>
    );
  }
);

ResizeHandle.displayName = "ResizeHandle";
