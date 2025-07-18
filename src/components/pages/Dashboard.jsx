import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import TaskList from "@/components/organisms/TaskList";
import QuickAddTask, { InlineTaskModal } from "@/components/molecules/QuickAddTask";
import ApperIcon from "@/components/ApperIcon";
import { taskService } from "@/services/api/taskService";
import { listService } from "@/services/api/listService";
import { format, isToday, isTomorrow } from "date-fns";

const Dashboard = () => {
  const { searchTerm } = useOutletContext();
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
    today: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const loadStats = async () => {
    try {
      setLoading(true);
      const tasks = await taskService.getAll();
      const lists = await listService.getAll();
      
      const now = new Date();
      const todayTasks = tasks.filter(task => 
        task.dueDate && isToday(new Date(task.dueDate))
      );
      const overdueTasks = tasks.filter(task => 
        task.dueDate && new Date(task.dueDate) < now && !task.completed
      );

      setStats({
        total: tasks.length,
        completed: tasks.filter(task => task.completed).length,
        pending: tasks.filter(task => !task.completed).length,
        overdue: overdueTasks.length,
        today: todayTasks.length,
      });
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setLoading(false);
    }
};

  const handleTaskAdded = () => {
    loadStats(); // Refresh stats when a new task is added
  };

  useEffect(() => {
    loadStats();
  }, []);

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: "CheckSquare",
      color: "from-primary-500 to-primary-600",
      bgColor: "from-primary-50 to-primary-100",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: "CheckCircle",
      color: "from-success-500 to-success-600",
      bgColor: "from-success-50 to-success-100",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: "Clock",
      color: "from-warning-500 to-warning-600",
      bgColor: "from-warning-50 to-warning-100",
    },
    {
      title: "Due Today",
      value: stats.today,
      icon: "Calendar",
      color: "from-info-500 to-info-600",
      bgColor: "from-info-50 to-info-100",
    },
  ];

  return (
    <div className="space-y-8">
<div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            Good morning! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddTask(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ApperIcon name="Plus" className="h-4 w-4" />
            Add Task
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
<div>
                <p className="text-sm text-gray-600 font-medium">{card.title}</p>
                <div className="text-3xl font-bold text-gray-900 mt-1">
                  {loading ? (
                    <div className="h-8 w-12 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    card.value
                  )}
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.bgColor} flex items-center justify-center`}>
                <ApperIcon 
                  name={card.icon} 
                  className={`h-6 w-6 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`} 
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Today's Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <ApperIcon name="Star" className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 font-display">
            Today's Focus
          </h2>
        </div>
        
<TaskList searchTerm={searchTerm} showCompleted={false} showQuickAdd={false} />
      </motion.div>

{/* Add Task Modal */}
      <InlineTaskModal 
        isOpen={showAddTask}
        onClose={() => setShowAddTask(false)}
        listId="1"
        onTaskAdded={handleTaskAdded}
      />
    </div>
  );
};

export default Dashboard;