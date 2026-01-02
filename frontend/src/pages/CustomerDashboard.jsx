import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import RegisterComplaint from "./customer/RegisterComplaint";
import TrackComplaint from "./customer/TrackComplaint";
import api from "../services/api";

export default function CustomerDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);

  const loadComplaints = async () => {
    try {
      const res = await api.get("/complaints/my");
      setComplaints(res.data);
    } catch (err) {
      console.error("Failed to load complaints", err);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  return (
    <DashboardLayout role="CUSTOMER">
      <h1 className="text-2xl font-bold mb-6">Customer Dashboard</h1>

      {/* REGISTER COMPLAINT */}
      <RegisterComplaint onSuccess={loadComplaints} />

      {/* COMPLAINT LIST */}
      <div className="bg-white rounded shadow p-4 mt-6">
        <h2 className="font-semibold mb-3">My Complaints</h2>

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.complaint_id} className="text-center">
                <td className="p-2 border">
                  {c.complaint_id.slice(0, 6)}
                </td>
                <td className="p-2 border">{c.complaint_type}</td>
                <td className="p-2 border">{c.status}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => setSelectedComplaintId(c.complaint_id)}
                    className="text-blue-600 underline"
                  >
                    Track
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* STATUS TRACKER */}
      {selectedComplaintId && (
        <TrackComplaint complaintId={selectedComplaintId} />
      )}
    </DashboardLayout>
  );
}