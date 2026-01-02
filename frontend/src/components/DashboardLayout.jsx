import Sidebar from "./Sidebar";

export default function DashboardLayout({ role, children }) {
  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 bg-gray-100 min-h-screen p-6">
        {children}
      </div>
    </div>
  );
}
