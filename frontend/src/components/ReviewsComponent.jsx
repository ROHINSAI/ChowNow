import React from "react";

function ReviewsComponent({ reviewsRatings }) {
  return (
    <div className="bg-[#1C1C1C] text-white p-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          Customer Reviews
        </h2>
        {reviewsRatings.map((item, idx) => (
          <div
            key={idx}
            className="border border-[#3a3a3a] rounded-lg p-4 mb-6 bg-[#2a2a2a]"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-white">
                {item.user.name}
              </p>
              <span className="text-yellow-400 font-bold text-sm">
                {item.rating} {"★".repeat(item.rating)}
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {item.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsComponent;
