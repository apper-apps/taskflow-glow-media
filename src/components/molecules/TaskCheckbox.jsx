import { motion } from "framer-motion";
import Checkbox from "@/components/atoms/Checkbox";

const TaskCheckbox = ({ checked, onChange, className }) => {
  return (
    <motion.div
      animate={checked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Checkbox 
        checked={checked} 
        onChange={onChange}
      />
    </motion.div>
  );
};

export default TaskCheckbox;