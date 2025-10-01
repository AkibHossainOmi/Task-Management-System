import { Link } from "react-router-dom";
import { PlusCircle, ListTodo, Filter } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/tasks/create"
          className="block bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <div className="flex items-center gap-3">
            <PlusCircle className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Create Task</h2>
          </div>
          <p className="mt-2 text-sm text-gray-100">
            Add a new task with details like title, description, due date, and assigned user.
          </p>
        </Link>

        <Link
          to="/tasks"
          className="block bg-emerald-600 text-white p-6 rounded-lg shadow hover:bg-emerald-700 transition"
        >
          <div className="flex items-center gap-3">
            <ListTodo className="w-6 h-6" />
            <h2 className="text-xl font-semibold">View Tasks</h2>
          </div>
          <p className="mt-2 text-sm text-gray-100">
            Browse, update, or delete tasks in the system.
          </p>
        </Link>

        <Link
          to="/tasks?filter=all"
          className="block bg-indigo-600 text-white p-6 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          <div className="flex items-center gap-3">
            <Filter className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Filter & Manage</h2>
          </div>
          <p className="mt-2 text-sm text-gray-100">
            Search and filter tasks by status or due date.
          </p>
        </Link>
      </div>
    </div>
  );
}
