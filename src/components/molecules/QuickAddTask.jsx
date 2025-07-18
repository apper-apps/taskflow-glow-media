import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import TaskModal from "@/components/organisms/TaskModal";
import FormField from "@/components/molecules/FormField";
import Select from "@/components/atoms/Select";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { taskService } from "@/services/api/taskService";

const InlineTaskModal = ({ isOpen, onClose, listId, onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    priority: "medium",
    status: "pending",
    dueDate: "",
    startDate: "",
    notes: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsLoading(true);
    try {
      const newTask = await taskService.create({
        title: formData.title.trim(),
        priority: formData.priority,
        status: formData.status,
        dueDate: formData.dueDate || null,
        startDate: formData.startDate || null,
        notes: formData.notes.trim() || null,
        listId: listId || "1",
        completed: formData.status === "completed",
        categoryId: null,
      });

      setFormData({
        title: "",
        priority: "medium",
        status: "pending",
        dueDate: "",
        startDate: "",
        notes: ""
      });
      onTaskAdded && onTaskAdded(newTask);
      onClose();
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Failed to add task");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 font-display">
              Add New Task
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <ApperIcon name="X" className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Task Title"
              required
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter task title..."
              disabled={isLoading}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Priority"
                type="select"
                value={formData.priority}
                onChange={(e) => handleInputChange("priority", e.target.value)}
                disabled={isLoading}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </FormField>

              <FormField
                label="Status"
                type="select"
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                disabled={isLoading}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                disabled={isLoading}
              />

              <FormField
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                disabled={isLoading}
              />
            </div>

            <FormField
              label="Notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Add any additional notes..."
              disabled={isLoading}
            />

            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!formData.title.trim() || isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />
                ) : (
                  <ApperIcon name="Plus" className="h-4 w-4" />
                )}
                Add Task
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const QuickAddTask = ({ listId, onTaskAdded, isModal = false, onClose }) => {
  const context = useOutletContext();
  const { openModal } = context || {};
  const [title, setTitle] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
const handleQuickAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newTask = await taskService.create({
        title: title.trim(),
        priority: "medium",
        listId: listId || "1",
        completed: false,
        dueDate: null,
        categoryId: null,
      });

      setTitle("");
      setIsExpanded(false);
      onTaskAdded && onTaskAdded(newTask);
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleQuickAdd(e);
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
      className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${
        isModal ? 'shadow-xl' : ''
      }`}
    >
      {isModal && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 font-display">
            Add New Task
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="X" className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      )}
      <form onSubmit={handleQuickAdd} className="p-4">
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
            <div className="flex items-center gap-2 pt-2">
              <Button
                type="submit"
                size="sm"
                disabled={!title.trim()}
                className="flex items-center gap-2"
              >
                <ApperIcon name="Plus" className="h-4 w-4" />
                Quick Add
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowTaskModal(true)}
                className="flex items-center gap-2"
              >
                <ApperIcon name="Settings" className="h-4 w-4" />
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
      
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        listId={listId}
        onTaskAdded={onTaskAdded}
      />
    </motion.div>
  );
};

export default QuickAddTask;