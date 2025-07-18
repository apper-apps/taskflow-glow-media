import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { taskService } from "@/services/api/taskService";

const TaskModal = () => {
  const { isModalOpen, modalType, modalData, closeModal } = useOutletContext();
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
        listId: modalData?.listId || "1",
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
      closeModal();
      toast.success("Task added successfully!");
      
      // Trigger page refresh or callback if needed
      window.location.reload();
    } catch (error) {
      toast.error("Failed to add task");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isModalOpen || modalType !== 'createTask') return null;

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
              onClick={closeModal}
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
                onClick={closeModal}
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

export default TaskModal;