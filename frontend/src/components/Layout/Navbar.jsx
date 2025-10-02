import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-screen mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="font-bold text-xl">
            Task Management
          </Link>

          <div className="hidden md:flex space-x-6">
            {token ? (
              <>
                <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
                <Link to="/tasks" className="hover:text-gray-200">Tasks</Link>
                <button onClick={handleLogout} className="hover:text-gray-200">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-200">Login</Link>
                <Link to="/signup" className="hover:text-gray-200">Signup</Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden bg-blue-600 transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 py-2" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col space-y-2 px-4">
          {token ? (
            <>
              <Link to="/dashboard" className="block hover:text-gray-200">Dashboard</Link>
              <Link to="/tasks" className="block hover:text-gray-200">Tasks</Link>
              <button
                onClick={handleLogout}
                className="text-left hover:text-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:text-gray-200">Login</Link>
              <Link to="/signup" className="block hover:text-gray-200">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
