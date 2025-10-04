import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UpcomingTasksTable({ tasks, getStatusBadgeClass }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          Upcoming Tasks
        </h2>
      </div>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-6 flex items-center justify-center">
          No upcoming tasks
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-3 py-2">Task</th>
                <th className="px-3 py-2">Deadline</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tasks.map((task, idx) => (
                <tr key={idx} className="text-sm hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium text-gray-900">
                    <button
                      onClick={() => navigate(`/tasks/${task._id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      {task.title}
                    </button>
                  </td>
                  <td className="px-3 py-2 text-gray-600">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "-"}
                  </td>
                  <td className="px-3 py-2">
                    <span className={getStatusBadgeClass(task.status)}>
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
