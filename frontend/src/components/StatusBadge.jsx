export default function StatusBadge({ status }) {
  const colors = {
    REGISTERED: "bg-gray-400",
    ASSIGNED: "bg-blue-500",
    IN_PROGRESS: "bg-yellow-500",
    COMPLETED: "bg-green-600",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-white text-xs ${
        colors[status] || "bg-gray-500"
      }`}
    >
      {status}
    </span>
  );
}
