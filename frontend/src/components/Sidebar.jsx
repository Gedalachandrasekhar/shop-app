import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ role }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menus = {
    ADMIN: [
      { name: "Dashboard", path: "/admin" },
      { name: "Complaints", path: "/admin/complaints" },
      { name: "Inventory", path: "/admin/inventory" },
    ],
    MANAGER: [
      { name: "Dashboard", path: "/manager" },
      { name: "Complaints", path: "/manager/complaints" },
    ],
    EMPLOYEE: [
      { name: "Dashboard", path: "/employee" },
    ],
    CUSTOMER: [
      { name: "Dashboard", path: "/customer" },
    ],
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Service Panel</h2>

      <ul className="space-y-3 flex-1">
        {menus[role]?.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className="block px-3 py-2 rounded hover:bg-gray-700"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* ✅ LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
