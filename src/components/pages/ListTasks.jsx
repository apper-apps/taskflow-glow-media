import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import TaskList from "@/components/organisms/TaskList";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { listService } from "@/services/api/listService";

const ListTasks = () => {
  const { listId } = useParams();
  const { searchTerm } = useOutletContext();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadList = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await listService.getById(parseInt(listId));
      setList(data);
    } catch (err) {
      setError("Failed to load list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadList();
  }, [listId]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadList} />;
  if (!list) return <Error message="List not found" onRetry={loadList} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
          style={{ backgroundColor: list.color }}
        >
          <ApperIcon name="List" className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            {list.name}
          </h1>
          <p className="text-gray-600 mt-1">
            {list.taskCount} task{list.taskCount !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <TaskList 
          listId={listId}
          searchTerm={searchTerm} 
          showCompleted={true}
        />
      </motion.div>
    </div>
  );
};

export default ListTasks;