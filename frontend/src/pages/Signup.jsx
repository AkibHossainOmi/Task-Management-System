import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-6"
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center">Sign Up</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="your name"
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-medium w-full py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
