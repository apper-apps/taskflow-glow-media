import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-700 border border-gray-200",
    primary: "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border border-primary-200",
    secondary: "bg-gradient-to-r from-secondary-50 to-secondary-100 text-secondary-700 border border-secondary-200",
    accent: "bg-gradient-to-r from-accent-50 to-accent-100 text-accent-700 border border-accent-200",
    success: "bg-gradient-to-r from-success-50 to-success-100 text-success-700 border border-success-200",
    warning: "bg-gradient-to-r from-warning-50 to-warning-100 text-warning-700 border border-warning-200",
    error: "bg-gradient-to-r from-error-50 to-error-100 text-error-700 border border-error-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-all duration-200",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export default Badge;