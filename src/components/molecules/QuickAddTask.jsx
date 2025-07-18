import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { taskService } from "@/services/api/taskService";

const QuickAddTask = ({ listId, onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      const newTask = await taskService.create({
        title: title.trim(),
        priority,
        listId: listId || "1",
        completed: false,
        dueDate: null,
        categoryId: null,
      });

      setTitle("");
      setPriority("medium");
      setIsExpanded(false);
      onTaskAdded && onTaskAdded(newTask);
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Failed to add task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    if (e.key === "Escape") {
      setIsExpanded(false);
      setTitle("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center gap-3">
          <ApperIcon name="Plus" className="h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onKeyDown={handleKeyDown}
            className="flex-1 border-none bg-transparent focus:ring-0 focus:outline-none"
            disabled={isLoading}
          />
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isExpanded ? "auto" : 0, 
            opacity: isExpanded ? 1 : 0 
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-3">
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-32"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <Button
                type="submit"
                size="sm"
                disabled={!title.trim() || isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />
                ) : (
                  <ApperIcon name="Plus" className="h-4 w-4" />
                )}
                Add Task
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsExpanded(false);
                  setTitle("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default QuickAddTask;