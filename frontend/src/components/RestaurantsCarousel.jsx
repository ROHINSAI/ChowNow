import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { favoriteRestaurant } from "../store/authSlice";

const RestaurantCarousel = ({ title, restaurants, stats }) => {
  let displayedRestaurants = [];
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleFavoriteClick = async (restaurantId) => {
    if (!userInfo) {
      toast.error("Please log in to add favorites");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/restaurants/favorite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ restaurantId }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      toast.success(
        data.message || "Restaurant favorite status updated"
      );
      dispatch(favoriteRestaurant(restaurantId));
    } catch (error) {
      console.error("Error adding favorite restaurant:", error);
      toast.error(
        error.message || "Failed to add favorite restaurant"
      );
    }
    // Implement favorite functionality here
  };

  if (title === "Featured Restaurants") {
    displayedRestaurants = [...restaurants]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  } else if (title === "Top Rated Near You") {
    displayedRestaurants = [...restaurants]
      .sort((a, b) => b.avg_ratings - a.avg_ratings)
      .slice(0, 4);
  } else if (title === "All Restaurants") {
    displayedRestaurants = [...restaurants];
  }

  const mergedRestaurants = displayedRestaurants.map((rest) => {
    const stat = stats.find((s) => s.restaurant === rest._id);
    return {
      ...rest,
      averageRating: stat?.averageRating || 0,
      totalRatings: stat?.totalRatings || 0,
      totalReviews: stat?.totalReviews || 0,
    };
  });

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
        {mergedRestaurants.length === 0 ? (
          <p className="text-white">No restaurants found.</p>
        ) : (
          mergedRestaurants.map((restaurant, idx) => (
            <div
              key={idx}
              className="w-60 flex-shrink-0 rounded-xl overflow-hidden"
            >
              <div className="relative">
                <img
                  src={restaurant.pictures[0]}
                  alt={restaurant.name}
                  className="w-full h-36 object-cover rounded-xl"
                />
                <FaHeart
                  className="hover:cursor-pointer absolute right-[10px] bottom-[-30px] "
                  size={20}
                  color={
                    userInfo?.favoriteRestaurants?.includes(
                      restaurant._id
                    )
                      ? "#ea1212"
                      : "#f9dede"
                  }
                  onClick={() =>
                    handleFavoriteClick(restaurant._id)
                  }
                />
              </div>
              <div className="mt-2 text-white">
                <h3
                  className="font-medium text-base hover:text-blue-500 hover:cursor-pointer"
                  onClick={() => handleClick(restaurant._id)}
                >
                  {restaurant.name}
                </h3>
                <p className="text-sm text-[#d8baba]">
                  {restaurant.averageRating.toFixed(1)} ⭐ •
                  25-30 min •{" "}
                  {`(${restaurant.totalReviews}) Reviews`}
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
