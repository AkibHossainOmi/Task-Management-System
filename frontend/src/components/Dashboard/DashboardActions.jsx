import { Link } from "react-router-dom";
import { PlusCircle, ListTodo } from "lucide-react";

export default function DashboardActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8">
      <Link
        to="/tasks/create"
        className="flex-1 bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition"
      >
        <div className="flex items-center gap-3 sm:gap-4 mb-1 sm:mb-2">
          <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          <h2 className="font-semibold text-gray-900 text-sm sm:text-lg">Create Task</h2>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm">Add a new task quickly.</p>
      </Link>

      <Link
        to="/tasks"
        className="flex-1 bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition"
      >
        <div className="flex items-center gap-3 sm:gap-4 mb-1 sm:mb-2">
          <ListTodo className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          <h2 className="font-semibold text-gray-900 text-sm sm:text-lg">Manage Tasks</h2>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm">Browse, update, delete, or filter tasks.</p>
      </Link>
    </div>
  );
}
