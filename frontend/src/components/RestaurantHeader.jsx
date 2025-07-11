import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuComponent from "./MenuComponent";
import InfoComponent from "./InfoComponent";
import ReviewsComponent from "./ReviewsComponent";

const RestaurantHeader = () => {
  const [activeTab, setActiveTab] = useState("Menu");
  const [loading, setLoading] = useState(true);
  const tabs = ["Menu", "Info", "Reviews"];
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviewsRatings, setReviewsRatings] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/restaurants/${id}/reviewsRatings`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const { ratings = [], reviews = [] } = data;

        const reviewsMap = new Map();

        reviews.forEach((review) => {
          reviewsMap.set(review.user._id, review);
        });

        const combined = ratings.map((rating) => {
          const review = reviewsMap.get(rating.user._id);
          return {
            user: rating.user,
            rating: rating.rating,
            review: review ? review.review : null,
            reviewId: review ? review._id : null,
            ratingId: rating._id,
          };
        });
        console.log("Combined Reviews and Ratings:", combined);
        setReviewsRatings(combined);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [id]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/restaurants/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Restaurant data:", data);
        setRestaurant(data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <div className="py-6 px-4 text-white">
        <h1 className="text-2xl font-bold">
          Restaurant not found
        </h1>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="py-6 px-4 text-white">
        <h1 className="text-2xl font-bold">
          Restaurant not found
        </h1>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 border-b border-white/20">
      <h1 className="text-3xl font-bold text-white mb-4">
        {restaurant.name}
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
        {activeTab === "Menu" && (
          <MenuComponent
            menu={restaurant.menu}
            restaurantId={restaurant._id}
          />
        )}
        {activeTab === "Info" && (
          <InfoComponent info={restaurant.description} />
        )}
        {activeTab === "Reviews" && (
          <ReviewsComponent reviewsRatings={reviewsRatings} />
        )}
      </div>
    </div>
  );
};

export default RestaurantHeader;
