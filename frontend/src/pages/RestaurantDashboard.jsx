import React, { useEffect, useState } from "react";

const RestaurantDashboard = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/owner/dashboard",
          {
            credentials: "include",
          }
        );
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      }
    };

    fetchDashboard();
  }, []);

  if (!data) return <div className="text-white">Loading...</div>;

  return (
    <div className="p-6 bg-[#1c0f0f] text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-4">
        Owner Dashboard
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#3b1f1f] p-4 rounded-lg">
          <p>Total Orders: {data.totalOrders}</p>
          <p>Total Revenue: ₹{data.totalRevenue}</p>
          <p>Total Items Sold: {data.totalItemsSold}</p>
          <p>
            Most Sold Item: {data.mostSoldItem?.name} (
            {data.mostSoldItem?.quantity})
          </p>
        </div>
        <div className="bg-[#3b1f1f] p-4 rounded-lg overflow-auto max-h-[400px]">
          <h3 className="text-lg font-semibold mb-2">
            All Orders
          </h3>
          {data.orders?.map((order) => (
            <div key={order._id} className="mb-3 border-b pb-2">
              <p>
                User: {order.user.name} ({order.user.email})
              </p>
              <p>
                Date:{" "}
                {new Date(order.orderDate).toLocaleString()}
              </p>
              <ul className="ml-4 list-disc">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.quantity} – ₹
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
