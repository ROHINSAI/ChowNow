import { useEffect, useState } from "react";
import ReviewModal from "../components/ReviewModal";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  const handleReviewSubmit = async (reviewData) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/users/review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(reviewData),
        }
      );
      if (!res.ok) throw new Error("Failed to submit review");
      toast.success("Review submitted successfully");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/orders/myorders",
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data.reverse()); // latest orders first
        console.log("Fetched orders:", data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#1c0f0f] text-white p-6 space-y-6">
      <h2 className="text-3xl font-bold mb-6">All Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-400">
          You have no previous orders.
        </p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-[#3b1f1f] p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={
                    order.items[0].picture || "/default-food.jpg"
                  }
                  alt="Dish"
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="text-xl font-semibold">
                    {typeof order.restaurant === "object"
                      ? order.restaurant?.name
                      : order.restaurant}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Order #{order._id.slice(-8)}
                  </p>
                </div>
              </div>

              <ul className="list-disc ml-6 text-sm">
                {order.items.map((item, i) => (
                  <li key={i} className="mb-1">
                    {item.name || "Item"} × {item.quantity || 1}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-500 mt-2">
                Ordered at:{" "}
                {new Date(order.orderDate).toLocaleString()}
              </p>
              <div className="text-right">
                <button
                  onClick={() => {
                    setSelectedRestaurant(order.restaurant._id);
                    setShowReviewModal(true);
                  }}
                  className="bg-[#5e2e2e] text-white px-4 py-1 rounded-full hover:bg-red-700 mt-2"
                >
                  Give Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showReviewModal && (
        <ReviewModal
          restaurantId={selectedRestaurant}
          userId={userInfo._id}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
}

export default OrderHistory;
