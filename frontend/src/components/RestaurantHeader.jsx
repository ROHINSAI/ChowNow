import React, { useState } from "react";
import { useParams } from "react-router-dom";
import restaurants from "../data/restaurants.json";
import MenuComponent from "./MenuComponent";
import InfoComponent from "./InfoComponent";
import ReviewsComponent from "./ReviewsComponent";
const RestaurantHeader = () => {
  const [activeTab, setActiveTab] = useState("Menu");
  const tabs = ["Menu", "Info", "Reviews"];
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="py-6 px-4 text-white">
        <h1 className="text-2xl font-bold">Restaurant not found</h1>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 border-b border-white/20">
      <h1 className="text-3xl font-bold text-white mb-4">
        {restaurant.restaurant_name}
      </h1>

      <div className="flex space-x-8 border-b border-[#884040]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-medium text-sm ${
              activeTab === tab
                ? "text-white border-b-[3px] border-white"
                : "text-[#b98787]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6 text-white">
        {activeTab === "Menu" && <MenuComponent menu={restaurant.menu} />}
        {activeTab === "Info" && <InfoComponent info={restaurant.info} />}
        {activeTab === "Reviews" && (
          <ReviewsComponent reviews={restaurant.reviews} />
        )}
      </div>
    </div>
  );
};

export default RestaurantHeader;
