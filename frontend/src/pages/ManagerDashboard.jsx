import DashboardLayout from "../components/DashboardLayout";

export default function ManagerDashboard() {
  return (
    <DashboardLayout role="MANAGER">
      <h1 className="text-2xl font-bold mb-6">Manager Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">New Complaints</h2>
          <p className="text-2xl font-bold">12</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Assigned</h2>
          <p className="text-2xl font-bold text-blue-600">7</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">In Progress</h2>
          <p className="text-2xl font-bold text-yellow-600">4</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Completed</h2>
          <p className="text-2xl font-bold text-green-600">20</p>
        </div>
      </div>

      {/* Complaint Assignment Table */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-3">Registered Complaints</h2>

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Complaint ID</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Assign</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="p-2 border">CMP020</td>
              <td className="p-2 border">Suresh</td>
              <td className="p-2 border">Outdoor</td>
              <td className="p-2 border text-red-600">Unassigned</td>
              <td className="p-2 border text-blue-600 cursor-pointer">
                Assign Employee
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
