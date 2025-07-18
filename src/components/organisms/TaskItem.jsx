import React, { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { format, isPast, isToday } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import TaskCheckbox from "@/components/molecules/TaskCheckbox";
import Button from "@/components/atoms/Button";
import { taskService } from "@/services/api/taskService";
import { cn } from "@/utils/cn";

const TaskItem = forwardRef(({ task, onUpdate, onDelete }, ref) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      const updatedTask = await taskService.update(task.Id, {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null,
      });
      onUpdate(updatedTask);
      toast.success(
        !task.completed ? "Task completed!" : "Task marked as pending"
      );
    } catch (error) {
      toast.error("Failed to update task");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await taskService.delete(task.Id);
      onDelete(task.Id);
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && !task.completed;
  const isDueToday = task.dueDate && isToday(new Date(task.dueDate));

  return (
<motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "bg-white rounded-xl shadow-sm border border-gray-200 p-4 transition-all duration-200 hover:shadow-md",
        task.completed && "opacity-60",
        isOverdue && "border-l-4 border-l-error-500"
      )}
    >
      <div className="flex items-center gap-4">
        <TaskCheckbox
          checked={task.completed}
          onChange={handleToggleComplete}
          className="flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={cn(
              "font-medium text-gray-900 truncate",
              task.completed && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
            <PriorityBadge priority={task.priority} />
          </div>
          
          {task.dueDate && (
            <div className="flex items-center gap-1 text-sm">
              <ApperIcon name="Calendar" className="h-3 w-3" />
              <span className={cn(
                "text-gray-500",
                isOverdue && "text-error-600 font-medium",
                isDueToday && "text-warning-600 font-medium"
              )}>
                {format(new Date(task.dueDate), "MMM d, yyyy")}
                {isOverdue && " (Overdue)"}
                {isDueToday && " (Today)"}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-gray-400 hover:text-error-500 p-1 h-auto"
          >
            <ApperIcon name="Trash2" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
);
});

TaskItem.displayName = 'TaskItem';

export default TaskItem;