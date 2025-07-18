import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm hover:shadow-md hover:from-primary-600 hover:to-primary-700 active:scale-95",
    secondary: "bg-white text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 hover:shadow-md active:scale-95",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-sm hover:shadow-md hover:from-accent-600 hover:to-accent-700 active:scale-95",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:scale-95",
    danger: "bg-gradient-to-r from-error-500 to-error-600 text-white shadow-sm hover:shadow-md hover:from-error-600 hover:to-error-700 active:scale-95",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;