import { useState } from "react";
import { Calendar, Clock, Flag, User, Folder, Edit3 } from "lucide-react";
import TaskForm from "../../components/Task/TaskForm";

export default function TaskCard({ task, onTaskUpdated }) {
  const [isEditing, setIsEditing] = useState(false);

  if (!task) return null;

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-700 bg-green-50 border border-green-200";
      case "In Progress":
        return "text-blue-700 bg-blue-50 border border-blue-200";
      case "Pending":
        return "text-amber-700 bg-amber-50 border border-amber-200";
      default:
        return "text-gray-700 bg-gray-50 border border-gray-200";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-400";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return `Today, ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
    }
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "Completed";

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow border border-gray-100 flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{task.title}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(task.status)}`}>
                {task.status}
              </span>
              {task.priority && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-50 border border-gray-200">
                  <Flag className={`w-4 h-4 ${getPriorityClass(task.priority)}`} />
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
          <button
            onClick={() => setIsEditing(true)}
            className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center transition-colors"
          >
            <Edit3 className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="text-gray-700 text-base sm:text-lg leading-relaxed">
          {task.description || <span className="text-gray-400 italic">No description provided</span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
            <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
              isOverdue ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
            }`}>
              <Calendar className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-500">Due Date</p>
              <p className={`text-base font-semibold truncate ${isOverdue ? "text-red-600" : "text-gray-900"}`}>
                {formatDate(task.dueDate)}{isOverdue}
              </p>
            </div>
          </div>

          {task.assignee && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">Assignee</p>
                <p className="text-base font-semibold text-gray-900 truncate">{task.assignee}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-500">Created</p>
              <p className="text-base font-semibold text-gray-900">{formatDate(task.createdAt)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
              <Edit3 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-500">Last Updated</p>
              <p className="text-base font-semibold text-gray-900">{formatDate(task.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>

    {isEditing && (
    <TaskForm
        task={task}
        onClose={() => setIsEditing(false)}
        onTaskSaved={() => {
        setIsEditing(false);
        if (onTaskUpdated) onTaskUpdated(); // triggers refetch in parent
        }}
    />
    )}
    </>
  );
}
