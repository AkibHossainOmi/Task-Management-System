import { ListTodo } from "lucide-react";

export default function DashboardStats({ stats }) {
  const STATS_CONFIG = [
    { key: "total", label: "Total Tasks", color: "bg-gray-100", icon: ListTodo },
    { key: "pending", label: "Pending", color: "bg-yellow-100", icon: ListTodo },
    { key: "inProgress", label: "In Progress", color: "bg-blue-100", icon: ListTodo },
    { key: "completed", label: "Completed", color: "bg-green-100", icon: ListTodo },
    { key: "overdue", label: "Overdue", color: "bg-red-100", icon: ListTodo },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {STATS_CONFIG.map(stat => {
        const Icon = stat.icon;
        return (
          <div key={stat.key} className={`p-4 rounded-xl shadow-sm ${stat.color}`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-700">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats[stat.key]}</p>
              </div>
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
