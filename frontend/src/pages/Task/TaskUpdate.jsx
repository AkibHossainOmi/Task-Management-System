import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "../../components/Task/TaskForm";
import api from "../../api/api";

export default function TaskUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        console.error("Error fetching task", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!task) return <p className="text-center mt-10 text-red-500">Task not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <TaskForm task={task} onTaskSaved={() => navigate("/tasks")} />
    </div>
  );
}
