import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import TaskForm from "../Task/TaskForm";
import Pagination from "../UI/Pagination";

export default function TaskList({ filters, refreshTasks }) {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks", {
        params: { ...filters, page, limit: 10 },
      });
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    setLoading(true);
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-400 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {editingTask && (
        <TaskForm
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onTaskSaved={() => {
            setEditingTask(null);
            fetchTasks();
            if (refreshTasks) refreshTasks();
          }}
        />
      )}

      <div className="hidden md:block overflow-x-auto w-full relative">
        <table className="min-w-full border rounded-lg shadow text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-3 px-4 border">Title</th>
              <th className="py-3 px-4 border">Status</th>
              <th className="py-3 px-4 border">Due Date</th>
              <th className="py-3 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border">
                    <button
                      onClick={() => navigate(`/tasks/${task._id}`)}
                      className="text-blue-600 hover:underline font-medium text-left"
                    >
                      {task.title}
                    </button>
                  </td>
                  <td className="py-3 px-4 border">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === 'completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </td>
                  <td className="py-3 px-4 border">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingTask(task)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="bg-white border rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-start mb-2">
                <button
                  onClick={() => navigate(`/tasks/${task._id}`)}
                  className="text-blue-600 hover:underline font-medium text-left flex-1"
                >
                  {task.title}
                </button>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.status}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Due:</span>
                  <span>
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "No due date"}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2 border-t">
                <button
                  onClick={() => setEditingTask(task)}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="flex-1 bg-red-600 text-white py-2 px-3 rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 bg-white border rounded-lg">
            No tasks found
          </div>
        )}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
}
