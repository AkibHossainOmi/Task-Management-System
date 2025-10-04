import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import api from "../../api/api";

export default function TaskForm({ onTaskSaved, onClose, task }) {
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
      if (onClose) onClose();
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Error saving task" });
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-sm w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg font-semibold"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {task ? "Update Task" : "Create Task"}
        </h2>

        {message && (
          <div
            className={`p-2 mb-4 text-sm rounded ${
              message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <input
            type="datetime-local"
            name="dueDate"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="border rounded p-2 w-full focus:ring focus:ring-blue-200"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 w-full rounded transition"
          >
            {task ? "Update Task" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
