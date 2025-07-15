import React, { useEffect, useState } from "react";
import RoundedButton from "../components/Button";
import { useNavigate } from "react-router-dom";

const RestaurantDashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/owner/dashboard", {
          credentials: "include",
        });
        const json = await res.json();

        if (!json.restaurant) {
          alert("You don't have a restaurant yet. Please add one first.");
          window.location.href = "/";
          return;
        }

        setData(json);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      }
    };

    fetchDashboard();
  }, []);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your restaurant?")) {
      try {
        const res = await fetch(
          "http://localhost:3000/api/owner/myrestaurant",
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to delete restaurant");

        alert("Restaurant deleted successfully");
        navigate("/");
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Error deleting restaurant");
      }
    }
  };

  if (!data) return <div className="text-white">Loading...</div>;

  return (
    <div className="p-6 bg-[#1c0f0f] text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Owner Dashboard</h2>
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
          <h3 className="text-lg font-semibold mb-2">Latest Orders</h3>
          {data.orders?.slice(0, 2).map((order) => (
            <div key={order.id} className="mb-3 border-b pb-2">
              <p>
                User: {order.user.name} ({order.user.email})
              </p>
              <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
              <ul className="ml-4 list-disc">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.quantity} – ₹
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p>
                Status:{" "}
                <span className="text-yellow-500 font-medium">
                  {order.status}
                </span>
              </p>
            </div>
          ))}
          <button
            onClick={() => navigate("/all-orders")}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            View All Orders
          </button>
        </div>
      </div>
      <RoundedButton text="edit" to="/edit-restaurant" />
      <button
        className="bg-red-600 text-white px-4 py-2 rounded mt-4"
        onClick={handleDelete}
      >
        Delete Restaurant
      </button>
    </div>
  );
};

export default RestaurantDashboard;
