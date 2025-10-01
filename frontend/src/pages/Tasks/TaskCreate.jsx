import TaskForm from "../../components/TaskForm";

export default function TaskCreate() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>
      <TaskForm />
    </div>
  );
}
