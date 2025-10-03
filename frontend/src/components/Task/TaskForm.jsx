import { useState, useEffect } from "react";
import api from "../../api/api";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import DateTimePicker from "../UI/DateTimePicker";

export default function TaskForm({ onTaskSaved, task }) {
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "Pending",
    dueDate: task?.dueDate ? task.dueDate.slice(0, 16) : "",
    assignedUser: null,
  });

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
        if (task?.assignedUser) {
          const assignedId = typeof task.assignedUser === "string" ? task.assignedUser : task.assignedUser._id;
          const matchedUser = res.data.find(u => u._id === assignedId);
          if (matchedUser) setForm(prev => ({ ...prev, assignedUser: matchedUser }));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [task]);

  const filteredUsers =
    query === ""
      ? users
      : users.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
        );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.assignedUser) {
      setMessage({ type: "error", text: "Please select a user" });
      return;
    }

    try {
      if (task) {
        await api.put(`/tasks/${task._id}`, { ...form, assignedUser: form.assignedUser._id });
        setMessage({ type: "success", text: "Task updated successfully!" });
      } else {
        await api.post("/tasks", { ...form, assignedUser: form.assignedUser._id });
        setMessage({ type: "success", text: "Task created successfully!" });
        setForm({ title: "", description: "", status: "Pending", dueDate: "", assignedUser: null });
      }
      if (onTaskSaved) onTaskSaved();
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Error saving task" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="p-6 border rounded-lg shadow-md w-full max-w-md space-y-4 bg-white">
        <h2 className="text-xl font-semibold text-gray-800">
          {task ? "Update Task" : "Create Task"}
        </h2>

        {message && (
          <div
            className={`p-2 text-sm rounded ${
              message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="border rounded p-2 w-full focus:ring focus:ring-blue-200"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border rounded p-2 w-full focus:ring focus:ring-blue-200"
        />

        <select
          name="status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border rounded p-2 w-full focus:ring focus:ring-blue-200"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <Combobox value={form.assignedUser} onChange={(user) => setForm({ ...form, assignedUser: user })}>
          <div className="relative">
            <div className="relative w-full cursor-default overflow-hidden rounded border bg-white text-left focus:outline-none focus:ring focus:ring-blue-200">
              <Combobox.Input
                className="w-full border-none p-2 focus:ring-0"
                displayValue={(user) => (user?.name && user?.email ? `${user.name} (${user.email})` : "")}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Select User"
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
              </Combobox.Button>
            </div>

            <Transition
              as="div"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10"
            >
              {filteredUsers.length === 0 && (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              )}
              {filteredUsers.map((user) => (
                <Combobox.Option
                  key={user._id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${active ? "bg-blue-600 text-white" : "text-gray-900"}`
                  }
                  value={user}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}>
                        {user.name} ({user.email})
                      </span>
                      {selected && <CheckIcon className="absolute right-2 top-2 h-5 w-5" />}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Transition>
          </div>
        </Combobox>

        <DateTimePicker
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          className="border rounded p-2 w-full focus:ring focus:ring-blue-200"
        />

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 w-full rounded transition">
          {task ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
}
