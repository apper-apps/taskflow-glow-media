import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Checkbox = forwardRef(({ className, checked, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        ref={ref}
        checked={checked}
        {...props}
      />
      <div
        className={cn(
          "task-checkbox",
          checked && "checked",
          className
        )}
      />
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;