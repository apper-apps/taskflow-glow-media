import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import Checkbox from "@/components/atoms/Checkbox";

const TaskCheckbox = forwardRef(({ checked, onChange, className }, ref) => {
  return (
    <motion.div
      animate={checked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Checkbox 
        checked={checked} 
        onChange={onChange}
        ref={ref}
      />
    </motion.div>
  );
});

TaskCheckbox.displayName = 'TaskCheckbox';

export default TaskCheckbox;