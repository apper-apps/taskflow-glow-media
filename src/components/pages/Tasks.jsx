import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import TaskList from "@/components/organisms/TaskList";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Tasks = () => {
  const { searchTerm } = useOutletContext();
  const [showCompleted, setShowCompleted] = useState(true);
  const [filter, setFilter] = useState("all");

  const filterButtons = [
    { id: "all", label: "All Tasks", icon: "List" },
    { id: "pending", label: "Pending", icon: "Clock" },
    { id: "completed", label: "Completed", icon: "CheckCircle" },
  ];

return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-display">
          All Tasks
        </h1>
        <p className="text-gray-600 mt-1">
          Manage and organize your tasks
        </p>
      </div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filterButtons.map((btn) => (
          <Button
            key={btn.id}
            variant={filter === btn.id ? "primary" : "secondary"}
            size="sm"
            onClick={() => {
              setFilter(btn.id);
              setShowCompleted(btn.id !== "pending");
            }}
            className="flex items-center gap-2"
          >
            <ApperIcon name={btn.icon} className="h-4 w-4" />
            {btn.label}
          </Button>
        ))}
      </div>

      {/* Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <TaskList 
          searchTerm={searchTerm} 
          showCompleted={showCompleted}
        />
      </motion.div>
    </div>
  );
};

export default Tasks;