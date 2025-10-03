import { useState } from "react";
import DateTimePicker from "../UI/DateTimePicker";

export default function TaskFilter({ onFilter }) {
  const [filters, setFilters] = useState({ status: "", dueDate: "", search: "" });

  const handleChange = (e) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);
    if (onFilter) onFilter(newFilters);
  };

  return (
    <div className="p-4 border rounded max-w-full mb-4">
      <h2 className="font-bold text-lg mb-2">Filter Tasks</h2>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          name="search"
          placeholder="Search by title"
          value={filters.search}
          onChange={handleChange}
          className="border p-2 flex-1 w-full"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="border p-2 flex-1 w-full"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <DateTimePicker
          name="dueDate"
          value={filters.dueDate}
          onChange={handleChange}
          className="flex-1 w-full"
        />
      </div>
    </div>
  );
}
