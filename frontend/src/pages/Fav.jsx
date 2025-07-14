import RestaurantCard from "../components/RestaurantCard";
import { useEffect, useState } from "react";

function Fav() {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState(
    []
  );

  useEffect(() => {
    const getFavoriteRestaurants = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/restaurants/favorite",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setFavoriteRestaurants(data);
      } catch (error) {
        console.log(error);
      }
    };
    getFavoriteRestaurants();
  }, []);

  return (
    <div className="mt-8 flex-1 text-center max-w-[1200px] mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">
        Your Favorite Restaurants
      </h2>
      {favoriteRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {favoriteRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
            />
          ))}
        </div>
      ) : (
        <p className="text-white">
          You have no favorite restaurants yet.
        </p>
      )}
    </div>
  );
}

export default Fav;
