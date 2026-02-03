import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api";

export default function ManagerDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [employees, setEmployees] = useState([]);

  const loadData = async () => {
    const [cRes, eRes] = await Promise.all([
      api.get("/manager/complaints/unassigned"),
      api.get("/manager/employees"),
    ]);
    setComplaints(cRes.data);
    setEmployees(eRes.data);
  };

  const assignComplaint = async (complaintId, employeeId) => {
    await api.put(`/manager/complaints/${complaintId}/assign`, {
      employeeId,
    });
    loadData();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);

  return (
    <DashboardLayout role="MANAGER">
      <h1 className="text-2xl font-bold mb-6">Manager Dashboard</h1>

      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-3">Unassigned Complaints</h2>

        {complaints.length === 0 ? (
          <p className="text-gray-500">No unassigned complaints</p>
        ) : (
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Assign To</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.complaint_id} className="text-center">
                  <td className="p-2 border">
                    {c.complaint_id.slice(0, 6)}
                  </td>
                  <td className="p-2 border">{c.complaint_type}</td>
                  <td className="p-2 border">{c.description}</td>
                  <td className="p-2 border">
                    <select
                      onChange={(e) =>
                        assignComplaint(c.complaint_id, e.target.value)
                      }
                      className="border p-1"
                    >
                      <option value="">Select</option>
                      {employees.map((e) => (
                        <option key={e.user_id} value={e.user_id}>
                          {e.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
