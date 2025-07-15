import React, { useEffect, useState } from "react";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusOrder = {
    cooking: 1,
    "out for delivery": 2,
    delivered: 3,
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/orders/myorders", {
        credentials: "include",
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Request failed: ${res.status} - ${errorText}`);
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Expected array but got: " + JSON.stringify(data));
      }

      const sorted = [...data].sort(
        (a, b) => statusOrder[a.status] - statusOrder[b.status]
      );

      setOrders(sorted);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        fetchOrders();
      } else {
        console.error("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className="text-white p-4">Loading orders...</div>;

  return (
    <div className="p-6 bg-[#1c0f0f] text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-[#3b1f1f] p-4 rounded">
            <p>
              <span className="font-semibold">User:</span> {order.user.name} (
              {order.user.email})
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {order.user.phone || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {order.user.address || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(order.orderDate).toLocaleString()}
            </p>
            <p className="font-semibold">Items:</p>
            <ul className="list-disc ml-6">
              {order.items.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <img
                    src={item.picture}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span>
                    {item.name} × {item.quantity} – ₹
                    {item.price * item.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <label className="mr-2 font-semibold">Status:</label>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="bg-[#552727] text-white px-2 py-1 rounded"
              >
                <option value="cooking">Cooking</option>
                <option value="out for delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
