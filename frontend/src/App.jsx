import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import TaskCreate from "./pages/Task/TaskCreate";
import TaskUpdate from "./pages/Task/TaskUpdate";
import TaskListPage from "./pages/Task/TaskList";
import ProtectedRoute from "./contexts/ProtectedRoute";
import PublicRoute from "./contexts/PublicRoute";
import { AuthProvider } from "./contexts/authContext";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <TaskListPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks/create"
                element={
                  <ProtectedRoute>
                    <TaskCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks/update/:id"
                element={
                  <ProtectedRoute>
                    <TaskUpdate />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
