import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [role, setRole] = useState("CUSTOMER");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const backendRole = res.data.role?.toUpperCase();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      let res;

      // CUSTOMER LOGIN
      if (role === "CUSTOMER") {
        res = await api.post("/auth/customer/login", {
          name,
          phone,
          address,
        });
      }
      // EMPLOYEE / MANAGER / ADMIN LOGIN
      else {
        res = await api.post("/auth/employee/login", {
          phone,
          password,
        });
      }

      // ✅ ALWAYS TAKE ROLE FROM BACKEND
      const backendRole = res.data.role?.toUpperCase();

      if (!backendRole) {
        alert("Role not received from server");
        return;
      }

      // ✅ SAVE TOKEN + ROLE
      login(res.data.token, backendRole);

      // ✅ REDIRECT
      if (backendRole === "CUSTOMER") navigate("/customer");
      else if (backendRole === "EMPLOYEE") navigate("/employee");
      else if (backendRole === "MANAGER") navigate("/manager");
      else if (backendRole === "ADMIN") navigate("/admin");

    } catch (err) {
      console.error(err);
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        {/* Role selector */}
        <select
          className="w-full border p-2 mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="CUSTOMER">Customer</option>
          <option value="EMPLOYEE">Employee</option>
          <option value="MANAGER">Manager</option>
          <option value="ADMIN">Admin</option>
        </select>

        {/* CUSTOMER FIELDS */}
        {role === "CUSTOMER" && (
          <>
            <input
              placeholder="Name"
              className="w-full border p-2 mb-3"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Address"
              className="w-full border p-2 mb-3"
              onChange={(e) => setAddress(e.target.value)}
            />
          </>
        )}

        <input
          placeholder="Phone Number"
          className="w-full border p-2 mb-3"
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* PASSWORD */}
        {role !== "CUSTOMER" && (
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-3"
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
