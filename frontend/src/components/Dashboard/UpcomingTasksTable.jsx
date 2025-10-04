import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UpcomingTasksTable({ tasks, getStatusBadgeClass }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          Upcoming Tasks
        </h2>
      </div>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-6 flex items-center justify-center">
          No upcoming tasks
        </p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3">Task</th>
                  <th className="px-4 py-3">Deadline</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tasks.map((task, idx) => (
                  <tr key={idx} className="text-sm hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      <button
                        onClick={() => navigate(`/tasks/${task._id}`)}
                        className="text-blue-600 hover:underline text-left"
                      >
                        {task.title}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={getStatusBadgeClass(task.status)}>
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-3">
            {tasks.map((task, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <button
                    onClick={() => navigate(`/tasks/${task._id}`)}
                    className="text-blue-600 hover:underline font-medium text-left flex-1"
                  >
                    {task.title}
                  </button>
                  <span className={getStatusBadgeClass(task.status) + " ml-2 shrink-0"}>
                    {task.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "No deadline"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
