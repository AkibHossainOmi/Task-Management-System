import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

export default function TaskList({ filters }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await api.get("/tasks", { params: filters });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }, [filters]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-lg shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Due Date</th>
            <th className="py-2 px-4 border">Assigned User</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{task.title}</td>
                <td className="py-2 px-4 border">{task.status}</td>
                <td className="py-2 px-4 border">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
                </td>
                <td className="py-2 px-4 border">
                  {task.assignedUser ? `${task.assignedUser.name}` : "-"}
                </td>
                <td className="py-2 px-4 border flex gap-2">
                  <Link
                    to={`/tasks/update/${task._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
