import TaskFilter from "../../components/Task/TaskFilter";
import TaskList from "../../components/Task/TaskList";
import { useState } from "react";

export default function TaskListPage() {
  const [filters, setFilters] = useState({});

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Manage Tasks</h2>
        
        <TaskFilter onFilter={(f) => setFilters(f)} />
        
        <TaskList filters={filters} />
      </div>
    </div>
  );
}
