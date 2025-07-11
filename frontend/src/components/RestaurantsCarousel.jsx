import restaurantsData from "../data/restaurants.json";
import { useNavigate } from "react-router-dom";

const RestaurantCarousel = ({ title, restaurants }) => {
  let displayedRestaurants = [];

  const navigate = useNavigate();

  if (restaurants) {
    displayedRestaurants = restaurants; // ✅ from props
  } else if (title === "Featured Restaurants") {
    displayedRestaurants = [...restaurantsData]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  } else if (title === "Top Rated Near You") {
    displayedRestaurants = [...restaurantsData]
      .sort((a, b) => b.avg_ratings - a.avg_ratings)
      .slice(0, 4);
  } else if (title === "All Restaurants") {
    displayedRestaurants = [...restaurantsData];
  }

  function handleClick(id) {
    navigate(`/menu/${id}`);
  }

  return (
    <div className="mt-8 text-center max-w-[1200px] mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">
        {title}
      </h2>
      <div
        className={
          title === "All Restaurants" || restaurants
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center"
            : "flex gap-6 overflow-x-auto"
        }
      >
        {displayedRestaurants.length === 0 ? (
          <p className="text-white">No restaurants found.</p>
        ) : (
          displayedRestaurants.map((restaurant, idx) => (
            <div
              key={idx}
              className="w-60 flex-shrink-0 rounded-xl overflow-hidden"
            >
              <img
                src={restaurant.pictures[0]}
                alt={restaurant.name}
                className="w-full h-36 object-cover rounded-xl"
              />
              <div className="mt-2 text-white">
                <h3
                  className="font-medium text-base hover:text-blue-500 hover:cursor-pointer"
                  onClick={() => handleClick(restaurant._id)}
                >
                  {restaurant.name}
                </h3>
                <p className="text-sm text-[#d8baba]">
                  {/*restaurant.avg_ratings.toFixed(1) */} •
                  25-30 min
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantCarousel;
