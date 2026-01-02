import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ role }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menu = {
    CUSTOMER: [
      { name: "Dashboard", path: "/customer" },
    ],
    EMPLOYEE: [
      { name: "Dashboard", path: "/employee" },
    ],
    MANAGER: [
      { name: "Dashboard", path: "/manager" },
      { name: "Inventory", path: "/inventory" },
    ],
    ADMIN: [
      { name: "Dashboard", path: "/admin" },
      { name: "Inventory", path: "/inventory" },
    ],
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Service App
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {menu[role]?.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="m-3 bg-red-600 hover:bg-red-700 py-2 rounded transition"
      >
        Logout
      </button>
    </div>
  );
}
