import { useState } from "react";
import { Calendar, Clock, Flag, Folder, Edit3, User } from "lucide-react";
import TaskForm from "../../components/Task/TaskForm";

export default function TaskCard({ task, onTaskUpdated }) {
  const [isEditing, setIsEditing] = useState(false);

  if (!task) return null;

  const statusMap = {
    Completed: "text-green-700 bg-green-50 border-green-200",
    "In Progress": "text-blue-700 bg-blue-50 border-blue-200",
    Pending: "text-amber-700 bg-amber-50 border-amber-200",
  };
  const priorityMap = { high: "text-red-500", medium: "text-amber-500", low: "text-green-500" };
  const colorMap = { blue: "bg-blue-100 text-blue-600", green: "bg-green-100 text-green-600", amber: "bg-amber-100 text-amber-600", red: "bg-red-100 text-red-600" };

  const formatDate = (d) => !d
    ? "Not set"
    : new Date(d).toDateString() === new Date().toDateString()
      ? `Today, ${new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
      : new Date(d).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const infoFields = [
    { icon: <Calendar className="w-5 h-5" />, title: "Due Date", value: formatDate(task.dueDate), overdue: task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "Completed" },
    { icon: <Clock className="w-5 h-5" />, title: "Created", value: formatDate(task.createdAt), color: "green" },
    { icon: <Edit3 className="w-5 h-5" />, title: "Last Updated", value: formatDate(task.updatedAt), color: "amber" },
    { icon: <User className="w-5 h-5" />, title: "Assigned To", value: task.assignedUser?.name || "Unassigned", color: "blue" },
  ];

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow border border-gray-100 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{task.title}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${statusMap[task.status] || "text-gray-700 bg-gray-50 border-gray-200"}`}>{task.status}</span>
              {task.priority && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-50 border border-gray-200">
                  <Flag className={`w-4 h-4 ${priorityMap[task.priority?.toLowerCase()] || "text-gray-400"}`} />
                  <span className="text-sm font-medium text-gray-700 capitalize">{task.priority}</span>
                </div>
              )}
              {task.category && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-50 border border-gray-200">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{task.category}</span>
                </div>
              )}
            </div>
          </div>
          <button onClick={() => setIsEditing(true)} className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center transition-colors">
            <Edit3 className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
          {task.description || <span className="text-gray-400 italic">No description provided</span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          {infoFields.map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${f.overdue ? colorMap.red : colorMap[f.color || "blue"]}`}>
                {f.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">{f.title}</p>
                <p className={`text-base font-semibold truncate ${f.overdue ? "text-red-600" : "text-gray-900"}`}>{f.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isEditing && <TaskForm task={task} onClose={() => setIsEditing(false)} onTaskSaved={() => { setIsEditing(false); onTaskUpdated?.(); }} />}
    </>
  );
}
