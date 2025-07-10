import { useEffect, useState } from "react";

function UserDashboard() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/orders/analytics", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch analytics");
        const data = await res.json();
        setAnalytics(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAnalytics();
  }, []);

  if (!analytics) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#1c0f0f] text-white p-6 space-y-6">
      <h2 className="text-3xl font-bold mb-4">Dashboard Analytics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#3b1f1f] p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl font-bold mt-2">{analytics.numberOfOrders}</p>
        </div>

        <div className="bg-[#3b1f1f] p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Money Spent</h3>
          <p className="text-2xl font-bold mt-2">₹{analytics.moneySpent}</p>
        </div>

        <div className="bg-[#3b1f1f] p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Restaurants Ordered From</h3>
          <p className="text-2xl font-bold mt-2">
            {analytics.uniqueRestaurants}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
