import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, ListTodo, User } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import api from "../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [user] = useState({ name: "User" });
  const [loading, setLoading] = useState(true);

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
        const overdue = tasks.filter(t => t.dueDate && new Date(t.dueDate) < now && t.status !== "Completed").length;

        setStats({ total: tasks.length, pending, inProgress, completed, overdue });
        setRecentTasks(tasks.slice(-5).reverse());

        const userMap = {};
        tasks.forEach(t => {
          const name = t.assignedUser?.name || "Unassigned";
          if (!userMap[name]) userMap[name] = 0;
          userMap[name]++;
        });
        setUserStats(Object.entries(userMap).map(([name, value]) => ({ name, value })));

      } catch (err) {
        console.error("Error fetching tasks", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const STATS_CONFIG = [
    { key: "total", label: "Total Tasks", color: "bg-gray-100", icon: ListTodo },
    { key: "pending", label: "Pending", color: "bg-yellow-100", icon: ListTodo },
    { key: "inProgress", label: "In Progress", color: "bg-blue-100", icon: ListTodo },
    { key: "completed", label: "Completed", color: "bg-green-100", icon: ListTodo },
    { key: "overdue", label: "Overdue", color: "bg-red-100", icon: ListTodo },
  ];

  const COLORS = ["#fbbf24", "#3b82f6", "#10b981", "#ef4444"];
  const pieData = [
    { name: "Pending", value: stats.pending },
    { name: "In Progress", value: stats.inProgress },
    { name: "Completed", value: stats.completed },
    { name: "Overdue", value: stats.overdue },
  ];

  const getStatusBadgeClass = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Completed": return `${base} bg-green-100 text-green-800`;
      case "In Progress": return `${base} bg-blue-100 text-blue-800`;
      case "Pending": return `${base} bg-yellow-100 text-yellow-800`;
      default: return `${base} bg-gray-100 text-gray-800`;
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
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-600">Overview of your tasks</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm mt-4 sm:mt-0">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Welcome back</p>
            <p className="font-semibold text-gray-900">{user.name}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {STATS_CONFIG.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.key} className={`p-4 rounded-xl shadow-sm ${stat.color}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-700">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stats[stat.key]}</p>
                </div>
                <Icon className="w-6 h-6 text-gray-500" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <Link to="/tasks/create" className="flex-1 bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-4 mb-2">
            <PlusCircle className="w-6 h-6 text-gray-700" />
            <h2 className="font-semibold text-gray-900 text-lg">Create Task</h2>
          </div>
          <p className="text-gray-600 text-sm">Add a new task quickly.</p>
        </Link>
        <Link to="/tasks" className="flex-1 bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-4 mb-2">
            <ListTodo className="w-6 h-6 text-gray-700" />
            <h2 className="font-semibold text-gray-900 text-lg">Manage Tasks</h2>
          </div>
          <p className="text-gray-600 text-sm">Browse, update, delete, or filter tasks.</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Task Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                labelLine={false}
                label={({ name, percent, value }) =>
                    value > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : null
                }
                >
                {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tasks Per User</h2>
          <ResponsiveContainer width="100%" height={250} barCategoryGap="20%">
            <BarChart data={userStats} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[4,4,0,0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-lg">Recent Tasks</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-700">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned User</th>
                <th className="py-3 px-4">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentTasks.map(task => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{task.title}</td>
                  <td className="py-3 px-4"><span className={getStatusBadgeClass(task.status)}>{task.status}</span></td>
                  <td className="py-3 px-4">{task.assignedUser?.name || "Unassigned"}</td>
                  <td className="py-3 px-4">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
