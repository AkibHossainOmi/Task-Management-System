import { useParams } from "react-router-dom";
import TaskForm from "../../components/TaskForm";

export default function TaskUpdate() {
  const { id } = useParams();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Update Task</h2>
      <TaskForm taskId={id} />
    </div>
  );
}
