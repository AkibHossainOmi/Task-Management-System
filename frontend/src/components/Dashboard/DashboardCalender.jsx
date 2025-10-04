import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay } from "date-fns";

export default function DashboardCalendar({ tasks }) {
  const now = new Date();
  const days = eachDayOfInterval({
    start: startOfMonth(now),
    end: endOfMonth(now),
  });

  const getDayColor = (dayTasks) => {
    if (!dayTasks.length) return "bg-gray-100";

    const completedCount = dayTasks.filter(t => t.status === "Completed").length;
    const pendingTasks = dayTasks.filter(t => t.status !== "Completed");

    if (completedCount > 0) return "bg-green-400";

    if (pendingTasks.length > 0) {
      const hoursLeft = Math.min(
        ...pendingTasks.map(t => (new Date(t.dueDate) - now) / 36e5)
      );

      if (hoursLeft < 0) return "bg-red-700";
      if (hoursLeft <= 24) return "bg-red-500";
      if (hoursLeft <= 72) return "bg-red-300";
      return "bg-red-200";
    }

    return "bg-gray-100";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Task Status</h2>
      <div className="grid grid-cols-7 text-center text-xs sm:text-sm gap-1">
        {days.map((day, idx) => {
          const dayTasks = tasks.filter(t => t.dueDate && isSameDay(new Date(t.dueDate), day));
          const dayColor = getDayColor(dayTasks);

          return (
            <div
              key={idx}
              className={`p-2 rounded-md text-gray-900 font-medium ${dayColor} h-10 flex items-center justify-center`}
              title={`${dayTasks.length} task${dayTasks.length > 1 ? "s" : ""}`}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
}
