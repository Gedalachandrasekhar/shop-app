import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ role, children }) {
  const { token, role: userRole } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (Array.isArray(role)) {
    if (!role.includes(userRole)) {
      return <Navigate to="/login" replace />;
    }
  } else {
    if (userRole !== role) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}
