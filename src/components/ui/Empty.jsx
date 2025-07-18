import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  description = "Get started by creating your first item",
  actionLabel = "Get Started",
  onAction,
  icon = "Plus"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="w-16 h-16 bg-gradient-to-r from-primary-50 to-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <ApperIcon name={icon} className="h-8 w-8 text-primary-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 font-display mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {description}
      </p>
      {onAction && (
        <Button onClick={onAction} className="flex items-center gap-2">
          <ApperIcon name={icon} className="h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;