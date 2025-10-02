export default function RecentTasksTable({ recentTasks, getStatusBadgeClass }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
      <div className="p-3 sm:p-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900 text-sm sm:text-lg">Recent Tasks</h2>
      </div>
      {recentTasks.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-6">No recent tasks</p>
      ) : (
        <table className="w-full text-left text-gray-700 text-xs sm:text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase">
            <tr>
              <th className="py-2 px-3">Title</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Assigned User</th>
              <th className="py-2 px-3">Due Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentTasks.map(task => (
              <tr key={task._id} className="hover:bg-gray-50">
                <td className="py-2 px-3">{task.title}</td>
                <td className="py-2 px-3">
                  <span className={getStatusBadgeClass(task.status)}>{task.status}</span>
                </td>
                <td className="py-2 px-3">{task.assignedUser?.name || "Unassigned"}</td>
                <td className="py-2 px-3">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
