import DashboardLayout from "../components/DashboardLayout";

export default function EmployeeDashboard() {
  return (
    <DashboardLayout role="EMPLOYEE">
      <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Assigned Complaints</h2>
          <p className="text-2xl font-bold">8</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">In Progress</h2>
          <p className="text-2xl font-bold text-yellow-600">3</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Completed</h2>
          <p className="text-2xl font-bold text-green-600">5</p>
        </div>
      </div>

      {/* Assigned Complaints Table */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-3">Assigned Complaints</h2>

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Complaint ID</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="p-2 border">CMP014</td>
              <td className="p-2 border">Ravi</td>
              <td className="p-2 border">Store</td>
              <td className="p-2 border text-yellow-600">Assigned</td>
              <td className="p-2 border text-blue-600 cursor-pointer">
                Update
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
