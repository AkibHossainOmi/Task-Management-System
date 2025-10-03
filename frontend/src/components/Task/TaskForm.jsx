import { useState, useEffect } from "react";
import api from "../../api/api";
import DateTimePicker from "../UI/DateTimePicker";

export default function TaskForm({ onTaskSaved, task }) {
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "Pending",
    dueDate: task?.dueDate
      ? new Date(new Date(task.dueDate).getTime() - new Date(task.dueDate).getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16)
      : "",
  });

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (task) {
        await api.put(`/tasks/${task._id}`, form);
        setMessage({ type: "success", text: "Task updated successfully!" });
      } else {
        await api.post("/tasks", form);
        setMessage({ type: "success", text: "Task created successfully!" });
        setForm({ title: "", description: "", status: "Pending", dueDate: "" });
      }
      if (onTaskSaved) onTaskSaved();
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Error saving task" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="p-6 border rounded-lg shadow-md w-full max-w-md space-y-4 bg-white">
        <h2 className="text-xl font-semibold text-gray-800">
          {task ? "Update Task" : "Create Task"}
        </h2>

        {message && (
          <div
            className={`p-2 text-sm rounded ${
              message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="border rounded p-2 w-full focus:ring focus:ring-blue-200"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border rounded p-2 w-full focus:ring focus:ring-blue-200"
        />

        <select
          name="status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border rounded p-2 w-full focus:ring focus:ring-blue-200"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <DateTimePicker
          name="dueDate"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          className="border rounded p-2 w-full focus:ring focus:ring-blue-200"
        />

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 w-full rounded transition">
          {task ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
}
