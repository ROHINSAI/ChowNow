import { useEffect, useState } from "react";

const Order = () => {
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/orders/myorders", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();

        // Sort by orderDate descending and take the latest one
        const sorted = [...data].sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );

        setLatestOrder(sorted[0] || null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen text-white p-6 bg-[#1c0f0f]">
      <h2 className="text-3xl font-bold mb-6">Latest Order</h2>
      {!latestOrder ? (
        <p>No recent order found.</p>
      ) : (
        <div className="bg-[#3b1f1f] p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">
            {typeof latestOrder.restaurant === "object"
              ? latestOrder.restaurant?.name
              : latestOrder.restaurant}
          </h3>
          <ul className="list-disc ml-6">
            {latestOrder.items.map((item, i) => (
              <li key={i}>
                {item.name || "Item"} × {item.quantity || 1}
                {item.photo && (
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-10 h-10 inline ml-2 rounded"
                  />
                )}
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-400 mt-2">
            Ordered at: {new Date(latestOrder.orderDate).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Order;
