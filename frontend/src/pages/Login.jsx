import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [role, setRole] = useState("CUSTOMER");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  const { login, role: authRole } = useAuth(); // 👈 read role from context

  const handleLogin = async () => {
    try {
      let res;

      if (role === "CUSTOMER") {
        res = await api.post("/auth/customer/login", {
          name,
          phone,
          address,
        });
      } else {
        res = await api.post("/auth/employee/login", {
          phone,
          password,
        });
      } 

     console.log("res->", res.data);

      const backendRole = res.data.role?.toUpperCase(); 
      console.log("backendRole->",backendRole);
      if (!backendRole) {
        alert("Role not received from server");
        return;
      }

      // ✅ ONLY save auth here
      login(res.data.token, backendRole); 
      navigate(`/${backendRole.toLowerCase()}`, { replace: true });

    } catch (err) {
      console.error(err);
      alert("Login failed. Check credentials.");
    }
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>

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
