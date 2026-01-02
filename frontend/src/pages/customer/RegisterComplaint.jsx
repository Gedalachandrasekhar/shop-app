import { useState } from "react";
import api from "../../services/api";

export default function RegisterComplaint({ onSuccess }) {
  const [complaintType, setComplaintType] = useState("STORE");
  const [description, setDescription] = useState("");

  const submitComplaint = async () => {
    try {
      await api.post("/complaints", {
        complaintType,
        description,
      });
      alert("Complaint registered successfully");
      setDescription("");
      onSuccess(); // refresh list
    } catch {
      alert("Failed to register complaint");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register Complaint</h2>

      <select
        className="w-full border p-2 mb-3"
        value={complaintType}
        onChange={(e) => setComplaintType(e.target.value)}
      >
        <option value="STORE">Store</option>
        <option value="OUTDOOR">Outdoor</option>
      </select>

      <textarea
        placeholder="Describe the issue"
        className="w-full border p-2 mb-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={submitComplaint}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}
