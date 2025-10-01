import { useState } from "react";
import api from "../api/api";

export default function TaskForm({ onTaskCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks", form);
      alert("Task created!");
      setForm({ title: "", description: "", status: "Pending", dueDate: "" });
      if (onTaskCreated) onTaskCreated();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-3 max-w-md">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <select name="status" value={form.status} onChange={handleChange} className="border p-2 w-full">
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 w-full">
        Submit
      </button>
    </form>
  );
}
