import DashboardLayout from "../components/DashboardLayout";

export default function AdminDashboard() {
  return (
    <DashboardLayout role="ADMIN">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Total Complaints</h2>
          <p className="text-2xl">120</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Pending</h2>
          <p className="text-2xl text-yellow-600">32</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Completed</h2>
          <p className="text-2xl text-green-600">88</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
