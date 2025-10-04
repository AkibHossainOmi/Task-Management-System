import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, isToday } from "date-fns";

export default function DashboardCalendar({ tasks }) {
  const now = new Date();
  const days = eachDayOfInterval({
    start: startOfMonth(now),
    end: endOfMonth(now),
  });

  const getCompletionRatio = (dayTasks) => {
    if (!dayTasks.length) return 0;
    const completedCount = dayTasks.filter(t => t.status === "Completed").length;
    return completedCount / dayTasks.length;
  };

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Daily Task Status</h2>
        <span className="text-sm sm:text-base font-medium text-gray-500 mt-1 sm:mt-0">
          {format(now, "MMMM yyyy")}
        </span>
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
          const completionRatio = getCompletionRatio(dayTasks);
          const hasDueTasks = dayTasks.some(t => t.status !== "Completed");
          const hasFutureTasks = dayTasks.some(t => new Date(t.dueDate) > now && t.status !== "Completed");

          // Day background
          let bgClass = "bg-white border border-gray-100";
          if (dayTasks.length) {
            if (completionRatio === 1) bgClass = "bg-green-100 border border-green-200";
            else if (hasDueTasks && day < now) bgClass = "bg-red-50 border border-red-200";
            else if (hasFutureTasks) bgClass = "bg-yellow-100 border border-yellow-200";
            else bgClass = "bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 border border-gray-200";
          }

          return (
            <div
              key={idx}
              className={`relative p-2 sm:p-3 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105 ${bgClass} ${isCurrentDay ? "ring-2 ring-blue-500 ring-opacity-50" : ""} ${dayTasks.length ? "cursor-pointer" : ""}`}
              title={dayTasks.length ? `${dayTasks.filter(t => t.status === "Completed").length} of ${dayTasks.length} tasks completed` : "No tasks"}
            >
              <div
                className={`text-center font-medium text-sm ${isCurrentDay ? "text-blue-600 font-semibold" : "text-gray-700"} ${dayTasks.length === 0 ? "text-gray-400" : ""}`}
              >
                {format(day, "d")}
              </div>

              {dayTasks.length > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-1 mt-1 overflow-hidden">
                  <div
                    className="h-full bg-green-800 transition-all duration-300"
                    style={{ width: `${completionRatio * 100}%` }}
                  />
                </div>
              )}

              {isCurrentDay && <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-6 pt-2 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-800 rounded"></div>
          <span className="text-xs sm:text-sm text-gray-600">Task completion</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-200 rounded"></div>
          <span className="text-xs sm:text-sm text-gray-600">Due Task</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-200 rounded"></div>
          <span className="text-xs sm:text-sm text-gray-600">Future Task</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-xs sm:text-sm text-gray-600">Today</span>
        </div>
      </div>
    </div>
  );
}
