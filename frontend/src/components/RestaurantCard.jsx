import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { favoriteRestaurant } from "../store/authSlice";

const RestaurantCard = ({ restaurant }) => {
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
  };

  function handleClick(id) {
    navigate(`/menu/${id}`);
  }

  return (
    <div className="w-60 flex-shrink-0 rounded-xl overflow-hidden">
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
          onClick={() => handleFavoriteClick(restaurant._id)}
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
          {/*restaurant.avg_ratings.toFixed(1) */} • 25-30 min
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
