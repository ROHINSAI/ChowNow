// components/RestaurantCarousel.jsx
import React from "react";
import restaurants from "../data/restaurants.json";
import { useNavigate } from "react-router-dom";

const RestaurantCarousel = ({ title }) => {
  let displayedRestaurants = [];
  const navigate = useNavigate();
  if (title === "Featured Restaurants") {
    // pick any random 4
    displayedRestaurants = [...restaurants]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  } else if (title === "Top Rated Near You") {
    // sort by avg_ratings descending
    displayedRestaurants = [...restaurants]
      .sort((a, b) => b.avg_ratings - a.avg_ratings)
      .slice(0, 4);
  } else if (title === "All Restaurants") {
    displayedRestaurants = [...restaurants];
  }
  function handleClick() {
    navigate("/menu");
  }
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div
        className={
          title === "All Restaurants"
            ? "grid grid-cols-4 gap-6"
            : "flex gap-6 overflow-x-auto"
        }
      >
        {displayedRestaurants.map((restaurant, idx) => (
          <div
            key={idx}
            className="w-60 flex-shrink-0 rounded-xl overflow-hidden"
          >
            <img
              src={restaurant.restaurant_photo}
              alt={restaurant.restaurant_name}
              className="w-full h-36 object-cover rounded-xl"
            />
            <div className="mt-2 text-white">
              <h3 className="font-medium text-base" onClick={handleClick}>
                {restaurant.restaurant_name}
              </h3>
              <p className="text-sm text-[#d8baba]">
                {restaurant.avg_ratings.toFixed(1)} • 25–30 min
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantCarousel;
