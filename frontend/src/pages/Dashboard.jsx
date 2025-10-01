import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [filters, setFilters] = useState({});

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Task Dashboard</h1>
        <p className="text-gray-600">Create, manage, and filter your tasks</p>
      </header>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TaskForm onTaskCreated={() => setFilters({ ...filters })} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <TaskFilter onFilter={(f) => setFilters(f)} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <TaskList filters={filters} />
        </div>
      </div>
    </div>
  );
}
