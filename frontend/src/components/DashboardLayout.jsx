import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ role, children }) {

  const { token, role: userRole } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Role check
  if (role && userRole !== role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Access denied for role: {userRole}
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={userRole} />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
