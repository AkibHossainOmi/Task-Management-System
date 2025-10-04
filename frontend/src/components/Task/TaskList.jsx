import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import TaskForm from "../Task/TaskForm";

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

      <div className="overflow-x-auto w-full relative">
        <table className="min-w-full border rounded-lg shadow text-sm sm:text-base">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-2 px-3 sm:px-4 border">Title</th>
              <th className="py-2 px-3 sm:px-4 border">Status</th>
              <th className="py-2 px-3 sm:px-4 border">Due Date</th>
              <th className="py-2 px-3 sm:px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 sm:px-4 border">
                    <button
                      onClick={() => navigate(`/tasks/${task._id}`)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {task.title}
                    </button>
                  </td>
                  <td className="py-2 px-3 sm:px-4 border">{task.status}</td>
                  <td className="py-2 px-3 sm:px-4 border">
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
                  <td className="py-2 px-3 sm:px-4 border flex flex-col sm:flex-row gap-1 sm:gap-2">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-center"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-center"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-end gap-2 mt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage(1)}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            First
          </button>
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1 rounded bg-gray-100">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(totalPages)}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Last
          </button>
        </div>
      </div>
    </>
  );
}
