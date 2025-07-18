import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const PriorityBadge = ({ priority, className }) => {
  const getVariantAndText = (priority) => {
    switch (priority) {
      case "high":
        return { variant: "error", text: "High" };
      case "medium":
        return { variant: "warning", text: "Medium" };
      case "low":
        return { variant: "default", text: "Low" };
      default:
        return { variant: "default", text: "Low" };
    }
  };

  const { variant, text } = getVariantAndText(priority);

  return (
    <Badge 
      variant={variant} 
      className={cn("priority-badge", `priority-${priority}`, className)}
    >
      {text}
    </Badge>
  );
};

export default PriorityBadge;