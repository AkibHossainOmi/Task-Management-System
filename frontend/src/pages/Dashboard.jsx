import { useEffect, useState } from "react";
import { User } from "lucide-react";
import api from "../api/api";
import DashboardStats from "../components/Dashboard/DashboardStats";
import DashboardActions from "../components/Dashboard/DashboardActions";
import DashboardCalendar from "../components/Dashboard/DashboardCalender";
import ProductivityTrend from "../components/Dashboard/ProductivityTrend";
import UpcomingTasksTable from "../components/Dashboard/UpcomingTasksTable";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
  });
  const [tasks, setTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [taskHistory, setTaskHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useState({ name: "User" });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      const allTasks = res.data;
      setTasks(allTasks);

      const now = new Date();
      const pending = allTasks.filter(t => t.status === "Pending").length;
      const inProgress = allTasks.filter(t => t.status === "In Progress").length;
      const completed = allTasks.filter(t => t.status === "Completed").length;
      const overdue = allTasks.filter(
        t => t.dueDate && new Date(t.dueDate) < now && t.status !== "Completed"
      ).length;

      const upcoming = [...allTasks]
        .filter(t => t.dueDate && t.status !== "Completed")
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 5);

      const history = {};
      allTasks.forEach(t => {
        if (t.status === "Completed" && t.updatedAt) {
          const date = new Date(t.updatedAt).toISOString().split("T")[0];
          history[date] = (history[date] || 0) + 1;
        }
      });

      const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        const key = d.toISOString().split("T")[0];
        return { date: key, completed: history[key] || 0 };
      });

      setStats({ total: allTasks.length, pending, inProgress, completed, overdue });
      setUpcomingTasks(upcoming);
      setTaskHistory(last7Days);
    } catch (err) {
      console.error("Error fetching tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusBadgeClass = status => {
    const base = "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap";
    switch (status) {
      case "Completed":
        return `${base} bg-green-100 text-green-800`;
      case "In Progress":
        return `${base} bg-blue-100 text-blue-800`;
      case "Pending":
        return `${base} bg-yellow-100 text-yellow-800`;
      default:
        return `${base} bg-gray-100 text-gray-800`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-600 text-sm sm:text-base">Overview of your tasks</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-3 sm:px-4 py-2 rounded-xl shadow-sm mt-4 sm:mt-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-500">Welcome back</p>
            <p className="font-semibold text-gray-900 text-sm sm:text-base">{user.name}</p>
          </div>
        </div>
      </div>

      <DashboardActions refreshTasks={fetchDashboardData} />

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <UpcomingTasksTable tasks={upcomingTasks} getStatusBadgeClass={getStatusBadgeClass} />
        <ProductivityTrend taskHistory={taskHistory} />
      </div>

      <div className="mt-6">
        <DashboardCalendar tasks={tasks} />
      </div>
    </div>
  );
}
