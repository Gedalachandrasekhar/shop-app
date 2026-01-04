import DashboardLayout from "../components/DashboardLayout";

export default function Reports() {
  return (
    <DashboardLayout role="ADMIN">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      <div className="bg-white p-4 rounded shadow space-y-4">
        <a
          href="http://localhost:5000/api/reports/complaints/csv?from=2024-01-01&to=2026-12-31"
          className="block bg-blue-600 text-white p-2 rounded text-center"
        >
          Download Complaints CSV
        </a>

        <a
          href="http://localhost:5000/api/reports/complaints/pdf"
          className="block bg-green-600 text-white p-2 rounded text-center"
        >
          Download Complaints PDF
        </a>

        <a
          href="http://localhost:5000/api/reports/inventory/csv"
          className="block bg-purple-600 text-white p-2 rounded text-center"
        >
          Download Inventory CSV
        </a>
      </div>
    </DashboardLayout>
  );
}
