import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "@/components/organisms/TaskItem";
import QuickAddTask from "@/components/molecules/QuickAddTask";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { taskService } from "@/services/api/taskService";

const TaskList = ({ listId, searchTerm = "", showCompleted = true }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await taskService.getAll();
      const filteredTasks = listId 
        ? data.filter(task => task.listId === listId)
        : data;
      setTasks(filteredTasks);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [listId]);

  const handleTaskUpdate = (updatedTask) => {
    setTasks(prev => prev.map(task => 
      task.Id === updatedTask.Id ? updatedTask : task
    ));
  };

  const handleTaskDelete = (taskId) => {
    setTasks(prev => prev.filter(task => task.Id !== taskId));
  };

  const handleTaskAdded = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = searchTerm === "" || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompleted = showCompleted || !task.completed;
    return matchesSearch && matchesCompleted;
  });

  const pendingTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTasks} />;

  return (
    <div className="space-y-6">
      <QuickAddTask listId={listId} onTaskAdded={handleTaskAdded} />
      
      {filteredTasks.length === 0 ? (
        <Empty 
          title="No tasks found"
          description="Create your first task to get started"
          actionLabel="Add Task"
        />
      ) : (
        <div className="space-y-6">
          {/* Pending Tasks */}
          {pendingTasks.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <h3 className="text-lg font-semibold text-gray-900 font-display">
                Tasks ({pendingTasks.length})
              </h3>
              <AnimatePresence mode="popLayout">
                {pendingTasks.map(task => (
                  <TaskItem
                    key={task.Id}
                    task={task}
                    onUpdate={handleTaskUpdate}
                    onDelete={handleTaskDelete}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && showCompleted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <h3 className="text-lg font-semibold text-gray-500 font-display">
                Completed ({completedTasks.length})
              </h3>
              <AnimatePresence mode="popLayout">
                {completedTasks.map(task => (
                  <TaskItem
                    key={task.Id}
                    task={task}
                    onUpdate={handleTaskUpdate}
                    onDelete={handleTaskDelete}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;