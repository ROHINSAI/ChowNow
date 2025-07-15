import React, { useEffect, useState } from "react";

const AnalyticsPanel = () => {
  const [range, setRange] = useState("7");
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await fetch(`/api/admin/analytics?range=${range}`, {
        credentials: "include",
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch: ${res.status} - ${errorText}`);
      }
      const data = await res.json();
      console.log(data);
      setAnalytics(data);
    };

    fetchAnalytics();
  }, [range]);

  return (
    <div>
      <select
        value={range}
        onChange={(e) => setRange(e.target.value)}
        className="border p-2 mb-4"
      >
        <option value="1">1 Day</option>
        <option value="3">3 Days</option>
        <option value="7">7 Days</option>
        <option value="30">30 Days</option>
        <option value="31">1 Month</option>
        <option value="365">1 Year</option>
      </select>

      {analytics && (
        <div className="space-y-4">
          <div>Total Revenue: ₹{analytics.totalRevenue}</div>
          <div>Total Orders: {analytics.totalOrders}</div>
          <div>Top Restaurant: {analytics.highestOrderedRestaurant?.[0]}</div>
          <div>Top Item: {analytics.highestOrderedItem?.[0]}</div>
          <div>Most Active User: {analytics.mostActiveUser?.[0]}</div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPanel;
