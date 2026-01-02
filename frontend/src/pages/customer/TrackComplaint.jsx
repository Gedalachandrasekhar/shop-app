import { useEffect, useState } from "react";
import api from "../../services/api";

const STATUS_ORDER = [
  "REGISTERED",
  "ASSIGNED",
  "IN_PROGRESS",
  "ESTIMATE_SHARED",
  "CUSTOMER_APPROVED",
  "READY_FOR_DELIVERY",
  "COMPLETED",
];

export default function TrackComplaint({ complaintId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api
      .get(`/complaints/${complaintId}/status-history`)
      .then((res) => setHistory(res.data));
  }, [complaintId]);

  const currentIndex =
    history.length > 0
      ? STATUS_ORDER.indexOf(history[history.length - 1].status)
      : 0;

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Complaint Status</h2>

      <div className="flex justify-between">
        {STATUS_ORDER.map((status, index) => (
          <div key={status} className="flex-1 text-center">
            <div
              className={`h-3 rounded mx-1 ${
                index <= currentIndex
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            />
            <span className="text-xs">{status.replaceAll("_", " ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
