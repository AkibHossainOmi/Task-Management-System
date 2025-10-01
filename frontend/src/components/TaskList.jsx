import { useState, useEffect } from "react";
import api from "../api/api";

export default function TaskList({ filters }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", { params: filters });
      setTasks(res.data);
    } catch (err) {
      alert("Error fetching tasks");
    }
  };

    useEffect(() => {
    const fetchTasks = async () => {
        try {
        const res = await api.get("/tasks", { params: filters });
        setTasks(res.data);
        } catch (err) {
        alert("Error fetching tasks");
        }
    };
    fetchTasks();
    }, [filters]);

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Error deleting task");
    }
  };

  return (
    <div className="p-4 border rounded max-w-2xl space-y-2">
      <h2 className="font-bold text-lg">Task List</h2>
      {tasks.length === 0 && <div>No tasks found</div>}
      {tasks.map((t) => (
        <div key={t._id} className="border p-2 flex justify-between items-center rounded">
          <div>
            <div className="font-medium">{t.title}</div>
            <div className="text-sm">{t.description}</div>
            <div className="text-xs text-gray-500">
              Status: {t.status} | Due: {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "-"}
            </div>
          </div>
          <button onClick={() => deleteTask(t._id)} className="text-red-600 font-bold">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
