import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  type = "text", 
  required = false, 
  error, 
  className,
  children,
  ...props 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={props.id}>
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </Label>
      )}
      {type === "select" ? (
        <Select {...props}>
          {children}
        </Select>
      ) : (
        <Input type={type} {...props} />
      )}
      {error && (
        <p className="text-sm text-error-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;