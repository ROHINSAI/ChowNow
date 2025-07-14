import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const ReviewModal = ({
  restaurantId,
  userId,
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [hover, setHover] = useState(0);
  const [existingReview, setExistingReview] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/review/${restaurantId}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data) {
          console.log(data);
          setRating(data.rating);
          setReview(data.review);
          if (data.review != "") {
            setExistingReview(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch review:", error);
      }
    };

    fetchReview();
  }, [restaurantId]);

  const handleSubmit = () => {
    onSubmit({
      restaurant: restaurantId,
      user: userId,
      rating: rating,
      review: review,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1c0f0f] p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">
          {existingReview
            ? "Update Your Review"
            : "Give a Review"}
        </h2>
        <div className="mb-4">
          <label className="block text-white mb-2">Rating</label>
          <div className="flex">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    className="hidden"
                  />
                  <FaStar
                    className="cursor-pointer"
                    color={
                      ratingValue <= (hover || rating)
                        ? "#ffc107"
                        : "#e4e5e9"
                    }
                    size={30}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                </label>
              );
            })}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-2 rounded bg-[#3b1f1f] text-white border border-[#5e2e2e] focus:outline-none focus:border-red-500"
            rows="4"
          ></textarea>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
          >
            {existingReview ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
