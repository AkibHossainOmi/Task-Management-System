import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import TaskCard from "../../components/Task/TaskCard";

export default function Task() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const fetchTask = useCallback(async () => {
    try {
      const res = await api.get(`/tasks/${id}`);
      setTask(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  if (!task) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <TaskCard task={task} onTaskUpdated={fetchTask} />
    </div>
  );
}
