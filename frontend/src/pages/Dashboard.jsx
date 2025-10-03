import { useEffect, useState } from "react";
import { User } from "lucide-react";
import api from "../api/api";
import DashboardStats from "../components/Dashboard/DashboardStats";
import DashboardActions from "../components/Dashboard/DashboardActions";
import DashboardPieChart from "../components/Dashboard/DashboardPieChart";
import RecentTasksTable from "../components/Dashboard/RecentTasksTable";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useState({ name: "User" });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await api.get("/tasks");
        const tasks = res.data;

        const now = new Date();
        const pending = tasks.filter(t => t.status === "Pending").length;
        const inProgress = tasks.filter(t => t.status === "In Progress").length;
        const completed = tasks.filter(t => t.status === "Completed").length;
        const overdue = tasks.filter(
          t => t.dueDate && new Date(t.dueDate) < now && t.status !== "Completed"
        ).length;

        setStats({ total: tasks.length, pending, inProgress, completed, overdue });
        setRecentTasks(tasks.slice(-5).reverse());
      } catch (err) {
        console.error("Error fetching tasks", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
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

      <DashboardStats stats={stats} />

      <DashboardActions />

      <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <DashboardPieChart stats={stats} />
      </div>

      <RecentTasksTable recentTasks={recentTasks} getStatusBadgeClass={getStatusBadgeClass} />
    </div>
  );
}
