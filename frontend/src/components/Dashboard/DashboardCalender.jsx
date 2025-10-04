import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, isToday } from "date-fns";

export default function DashboardCalendar({ tasks }) {
  const now = new Date();
  const days = eachDayOfInterval({
    start: startOfMonth(now),
    end: endOfMonth(now),
  });

  const getGradientClass = (dayTasks) => {
    if (!dayTasks.length) return "bg-white border border-gray-100";
    const completedCount = dayTasks.filter(t => t.status === "Completed").length;
    const totalTasks = dayTasks.length;
    const ratio = completedCount / totalTasks;
    if (ratio === 0) return "bg-gradient-to-br from-red-50 to-red-100 border border-red-200";
    if (ratio === 1) return "bg-gradient-to-br from-green-50 to-green-100 border border-green-200";
    return "bg-gradient-to-br from-green-50 via-green-50 to-red-50 border border-gray-200";
  };

  const getProgressBar = (dayTasks) => {
    if (!dayTasks.length) return null;
    const completedCount = dayTasks.filter(t => t.status === "Completed").length;
    const totalTasks = dayTasks.length;
    const progress = (completedCount / totalTasks) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-1 mt-1 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-red-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  const getTaskIndicator = (dayTasks) => {
    if (!dayTasks.length) return null;
    const completedCount = dayTasks.filter(t => t.status === "Completed").length;
    const totalTasks = dayTasks.length;
    return (
      <div className="flex items-center justify-center mt-1">
        <span className="text-[10px] sm:text-xs font-medium text-gray-600">{completedCount}/{totalTasks}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Daily Task Status</h2>
        <span className="text-sm sm:text-base font-medium text-gray-500 mt-1 sm:mt-0">{format(now, "MMMM yyyy")}</span>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2 sm:mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="text-center">
            <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide">{day}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.map((day, idx) => {
          const dayTasks = tasks.filter(t => t.dueDate && isSameDay(new Date(t.dueDate), day));
          const isCurrentDay = isToday(day);
          return (
            <div
              key={idx}
              className={`relative p-2 sm:p-3 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105 ${getGradientClass(dayTasks)} ${isCurrentDay ? "ring-2 ring-blue-500 ring-opacity-50" : ""} ${dayTasks.length ? "cursor-pointer" : ""}`}
              title={dayTasks.length ? `${dayTasks.filter(t => t.status === "Completed").length} of ${dayTasks.length} tasks completed` : "No tasks"}
            >
              <div className={`text-center font-medium text-sm ${isCurrentDay ? "text-blue-600 font-semibold" : "text-gray-700"} ${dayTasks.length === 0 ? "text-gray-400" : ""}`}>
                {format(day, "d")}
              </div>
              {getTaskIndicator(dayTasks)}
              {getProgressBar(dayTasks)}
              {isCurrentDay && <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-6 pt-2 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-red-500 rounded"></div>
          <span className="text-xs sm:text-sm text-gray-600">Task completion</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-xs sm:text-sm text-gray-600">Today</span>
        </div>
      </div>
    </div>
  );
}
