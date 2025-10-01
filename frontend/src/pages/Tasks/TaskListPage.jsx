import TaskFilter from "../../components/TaskFilter";
import TaskList from "../../components/TaskList";
import { useState } from "react";

export default function TaskListPage() {
  const [filters, setFilters] = useState({});

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Tasks</h2>
      
      <TaskFilter onFilter={(f) => setFilters(f)} />
      
      <TaskList filters={filters} />
    </div>
  );
}
