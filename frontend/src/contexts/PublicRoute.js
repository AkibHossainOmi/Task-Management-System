import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

export default function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) return <Navigate to="/dashboard" replace />;
  return children;
}