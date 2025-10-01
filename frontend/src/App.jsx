import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TaskCreate from "./pages/Tasks/TaskCreate";
import TaskUpdate from "./pages/Tasks/TaskUpdate";
import TaskListPage from "./pages/Tasks/TaskListPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/tasks" element={<TaskListPage />} />
            <Route path="/tasks/create" element={<TaskCreate />} />
            <Route path="/tasks/update/:id" element={<TaskUpdate />} />

            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
