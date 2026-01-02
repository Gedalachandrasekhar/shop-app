import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api";

export default function EmployeeDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadComplaints = async () => {
    try {
      const res = await api.get("/employee/complaints");
      setComplaints(res.data);
    } catch (err) {
      console.error("Failed to load complaints", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (complaintId, status) => {
    try {
      await api.put(`/complaints/${complaintId}/status`, { status });
      loadComplaints();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  return (
    <DashboardLayout role="EMPLOYEE">
      <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>

      {loading ? (
        <p>Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p className="text-gray-500">No complaints assigned</p>
      ) : (
        <div className="bg-white rounded shadow p-4">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
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
                  <td className="p-2 border">{c.status}</td>
                  <td className="p-2 border space-x-2">
                    {c.status === "ASSIGNED" && (
                      <button
                        onClick={() =>
                          updateStatus(c.complaint_id, "IN_PROGRESS")
                        }
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Start
                      </button>
                    )}

                    {c.status === "IN_PROGRESS" && (
                      <button
                        onClick={() =>
                          updateStatus(c.complaint_id, "COMPLETED")
                        }
                        className="bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
