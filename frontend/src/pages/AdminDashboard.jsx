import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
  const load = async () => {
    try {
      const [cRes, uRes, iRes] = await Promise.all([
        api.get("/admin/complaints"),
        api.get("/admin/users"),
        api.get("/admin/inventory"),
      ]);
      setComplaints(cRes.data);
      setUsers(uRes.data);
      setInventory(iRes.data);
    } catch (err) {
      console.error("Admin dashboard load failed", err);
    }
  };
  load();
}, []);

  return (
    <DashboardLayout role="ADMIN">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm">Complaints</h2>
          <p className="text-xl font-bold">{complaints.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm">Users</h2>
          <p className="text-xl font-bold">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm">Inventory Items</h2>
          <p className="text-xl font-bold">{inventory.length}</p>
        </div>
      </div>

      {/* USERS */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="font-semibold mb-2">Users</h2>
        <table className="w-full text-sm border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.user_id}>
                <td>{u.name}</td>
                <td>{u.phone}</td>
                <td>{u.role_name}</td>
                <td>{u.is_active ? "Active" : "Inactive"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* COMPLAINTS */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="font-semibold mb-2">Complaints</h2>
        <table className="w-full text-sm border">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Status</th>
              <th>Customer</th>
              <th>Employee</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.complaint_id}>
                <td>{c.complaint_id.slice(0, 6)}</td>
                <td>{c.complaint_type}</td>
                <td>{c.status}</td>
                <td>{c.customer_name}</td>
                <td>{c.employee_name || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* INVENTORY */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Inventory</h2>
        <table className="w-full text-sm border">
          <thead>
            <tr>
              <th>Part</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((i, idx) => (
              <tr key={idx}>
                <td>{i.part_name}</td>
                <td>{i.category}</td>
                <td>{i.quantity}</td>
                <td>₹{i.unit_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
