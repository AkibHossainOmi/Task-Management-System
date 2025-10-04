import { useState } from "react";
import DateTimePicker from "../UI/DateTimePicker";

export default function TaskFilter({ onFilter }) {
  const [filters, setFilters] = useState({
    status: "",
    search: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
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
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          placeholder="Start Date"
          className="flex-1 w-full"
        />

        <DateTimePicker
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          placeholder="End Date"
          className="flex-1 w-full"
        />
      </div>
    </div>
  );
}
