import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ role, children }) {
  // ✅ FIX: map `role` from context to `userRole`
  const { token, role: userRole } = useAuth();

  // Wait until auth is ready
  if (!token || !userRole) {
    return <Navigate to="/login" replace />;
  }

  // Multiple roles allowed
  if (Array.isArray(role)) {
    if (!role.includes(userRole)) {
      return <Navigate to="/login" replace />;
    }
  }
  // Single role
  else {
    if (userRole !== role) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}
