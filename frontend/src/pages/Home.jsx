import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between">
        <h1 className="font-bold text-xl">Your Company</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-blue-600">Login</Link>
        </div>
      </nav>

      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold mb-4">Service & Complaint Management</h2>
        <p className="text-gray-600">
          Fast service • Trusted technicians • Genuine spare parts
        </p>
      </div>
    </div>
  );
}
