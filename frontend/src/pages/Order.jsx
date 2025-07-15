import { useEffect, useState } from "react";

const statusSteps = ["Cooking", "Out for delivery", "Delivered"];

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

  const cancelOrder = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/orders/${latestOrder._id}/cancel`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to cancel order");
      const updated = await res.json();
      setLatestOrder(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const renderStatusIcon = (step) => {
    const currentStatus = latestOrder?.status;
    const stepIndex = statusSteps.indexOf(step);
    const currentIndex = statusSteps.indexOf(currentStatus);

    if (stepIndex < currentIndex) return <span>✓</span>;
    if (stepIndex === currentIndex)
      return <span className="text-white">●</span>;
    return <span className="text-gray-500">○</span>;
  };

  return (
    <div className="min-h-screen text-white p-6 bg-[#1c0f0f]">
      <h2 className="text-3xl font-bold mb-6">Latest Order</h2>
      {!latestOrder ? (
        <p>No recent order found.</p>
      ) : (
        <div className="bg-[#3b1f1f] p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Order in progress</h3>
            <ul className="space-y-2 mb-6">
              {statusSteps.map((step, index) => (
                <li key={index} className="flex items-center space-x-2">
                  {renderStatusIcon(step)}
                  <span>{step}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mb-2">Delivery Details</h3>
            <p>
              Estimated delivery: <strong>25–35 minutes</strong>
            </p>
            <p>
              <strong>Restaurant:</strong>{" "}
              {typeof latestOrder.restaurant === "object"
                ? latestOrder.restaurant?.name
                : latestOrder.restaurant}
            </p>
            <p>
              <strong>Agent:</strong> Alex
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <ul className="list-disc ml-6 space-y-1">
              {latestOrder.items.map((item, i) => (
                <li key={i}>
                  {item.quantity}× {item.name}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-400 mt-4">
              Ordered at:{" "}
              {new Date(latestOrder.orderDate).toLocaleString("en-GB")}
            </p>

            {latestOrder.status !== "Delivered" && (
              <button
                onClick={cancelOrder}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
