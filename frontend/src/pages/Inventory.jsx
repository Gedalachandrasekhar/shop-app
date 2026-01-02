import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardLayout from "../components/DashboardLayout";

export default function Inventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/inventory").then((res) => setItems(res.data));
  }, []);

  return (
    <DashboardLayout role={["MANAGER", "ADMIN"]}>
      <h1 className="text-2xl font-bold mb-6">Inventory</h1>

      <table className="w-full border text-sm">
        <thead>
          <tr>
            <th>Part</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Unit Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.part_id}>
              <td>{i.part_name}</td>
              <td>{i.category}</td>
              <td>{i.quantity}</td>
              <td>₹{i.unit_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
