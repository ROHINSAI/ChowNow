import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import RoundedButton from "../components/Button";
import ReviewModal from "../components/ReviewModal";
import toast from "react-hot-toast";

const User = () => {
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/orders/myorders",
          {
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data.reverse()); // latest first
        console.log("Fetched orders:", data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);

  const [phone, setPhone] = useState("");
  const [isPhoneSubmitted, setIsPhoneSubmitted] =
    useState(false);

  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] =
    useState(false);

  const [originalUser, setOriginalUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState(null);

  const handleReviewSubmit = async (reviewData) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/users/review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(reviewData),
        }
      );
      if (!res.ok) throw new Error("Failed to submit review");
      toast.success("Review submitted successfully");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userInfo) {
      setOriginalUser(userInfo);

      if (userInfo.name) {
        setName(userInfo.name);
        setIsNameSubmitted(true);
      }

      if (userInfo.phone) {
        setPhone(userInfo.phone);
        setIsPhoneSubmitted(true);
      }

      if (userInfo.email) {
        setEmail(userInfo.email);
        setIsEmailSubmitted(true);
      }
    }
  }, [userInfo]);

  // Update profile on server
  const updateProfile = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/users/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name, phone, email }),
        }
      );

      if (!response.ok)
        throw new Error("Failed to update profile");

      const updatedData = await response.json();
      dispatch(setCredentials(updatedData));
      setOriginalUser(updatedData); // reset to new saved data
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  // Handlers (Enter key to save)
  const handleNameSubmit = (e) => {
    if (e.key === "Enter" && name.trim())
      setIsNameSubmitted(true);
  };
  const handlePhoneSubmit = (e) => {
    if (e.key === "Enter" && phone.trim())
      setIsPhoneSubmitted(true);
  };
  const handleEmailSubmit = (e) => {
    if (e.key === "Enter" && email.trim())
      setIsEmailSubmitted(true);
  };

  // Edit mode
  const handleEditName = () => setIsNameSubmitted(false);
  const handleEditPhone = () => setIsPhoneSubmitted(false);
  const handleEditEmail = () => setIsEmailSubmitted(false);

  // Restore values if user navigates away without entering anything
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (originalUser) {
        if (!isNameSubmitted) setName(originalUser.name || "");
        if (!isPhoneSubmitted)
          setPhone(originalUser.phone || "");
        if (!isEmailSubmitted)
          setEmail(originalUser.email || "");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () =>
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
  }, [
    isNameSubmitted,
    isPhoneSubmitted,
    isEmailSubmitted,
    originalUser,
  ]);

  return (
    <div className="min-h-screen bg-[#1c0f0f] text-white p-6 space-y-8 w-full mx-auto rounded-lg">
      <div className="flex">
        <div>
          <h2 className="text-3xl font-bold ">Account</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage your account settings and preferences
          </p>
        </div>
        <RoundedButton
          text={"Dashboard"}
          to={"/userDashboard"}
        />
      </div>

      <div className="space-y-4 p-4  rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">
          Personal Information
        </h3>

        {/* Name */}
        <div>
          <label className="block text-sm">Name</label>
          {isNameSubmitted ? (
            <div className="mt-1 flex items-center justify-between bg-[#3b1f1f] border border-[#5e2e2e] rounded-full px-4 py-2 w-1/2">
              <span className="text-lg font-medium">{name}</span>
              <button
                onClick={handleEditName}
                className="ml-4 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition duration-300 ease-in-out mr-4"
              >
                Edit
              </button>
            </div>
          ) : (
            <input
              type="text"
              value={name}
              placeholder="Name"
              className=" bg-[#3b1f1f] border rounded-full w-1/2 border-[#5e2e2e]  px-4 py-2 mt-1 focus:outline-none"
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleNameSubmit}
            />
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm">Phone</label>
          {isPhoneSubmitted ? (
            <div className=" w-1/2 mt-1 flex items-center justify-between bg-[#3b1f1f] border border-[#5e2e2e] rounded-full px-4 py-2">
              <span className="text-lg font-medium">
                {phone}
              </span>
              <button
                onClick={handleEditPhone}
                className="ml-4 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition duration-300 ease-in-out mr-4"
              >
                Edit
              </button>
            </div>
          ) : (
            <input
              type="tel"
              value={phone}
              placeholder="Phone"
              className="w-1/2 bg-[#3b1f1f] border border-[#5e2e2e] rounded-full px-4 py-2 mt-1 focus:outline-none"
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={handlePhoneSubmit}
            />
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm">Email</label>
          {isEmailSubmitted ? (
            <div className="w-1/2 mt-1 flex items-center justify-between bg-[#3b1f1f] border border-[#5e2e2e] rounded-full px-4 py-2">
              <span className="text-lg font-medium">
                {email}
              </span>
              <button
                onClick={handleEditEmail}
                className="ml-4 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition duration-300 ease-in-out mr-4"
              >
                Edit
              </button>
            </div>
          ) : (
            <input
              type="email"
              value={email}
              placeholder="Email"
              className="w-1/2 bg-[#3b1f1f] border border-[#5e2e2e] rounded-full px-4 py-2 mt-1 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleEmailSubmit}
            />
          )}
        </div>
      </div>
      {/* Order History */}
      <div className="space-y-3 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Order History
        </h3>
        {orders.length === 0 ? (
          <p className="text-gray-400">No recent orders.</p>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 2).map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      order.items[0]?.picture ||
                      "/default-food.jpg"
                    }
                    alt="Food"
                    className="w-14 h-14 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-semibold">
                      {typeof order.restaurant === "object"
                        ? order.restaurant?.name
                        : order.restaurant}
                    </p>
                    <p className="text-sm text-gray-400">
                      Order #{order._id.slice(-8)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedRestaurant(order.restaurant._id);
                    setShowReviewModal(true);
                  }}
                  className="bg-[#5e2e2e] text-white px-4 py-1 rounded-full hover:bg-red-700"
                >
                  Give Review
                </button>
              </div>
            ))}
            <div
              className="text-right text-sm text-red-400 mt-2 hover:underline cursor-pointer"
              onClick={() => navigate("/orderhistory")}
            >
              See All →
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Favorites</h3>
        <div
          className="flex w-1/2 rounded-full items-center justify-between p-3  bg-[#3b1f1f] hover:bg-[#5e2e2e] cursor-pointer"
          onClick={() => navigate("/fav")}
        >
          <div className="flex items-center gap-3">
            <span>❤️</span>
            <span>Favorite Restaurants</span>
          </div>
        </div>
        <div
          className="flex w-1/2 items-center justify-between p-3 rounded-full bg-[#3b1f1f] hover:bg-[#5e2e2e] cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <div className="flex items-center gap-3">
            <span>📍</span>
            <span>Saved Addresses</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-4  rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">
          Payment Methods
        </h3>
        <div className="p-3 bg-[#3b1f1f] rounded-full w-1/2">
          💳 Visa ending in 1234
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} />
      )}

      {showReviewModal && (
        <ReviewModal
          restaurantId={selectedRestaurant}
          userId={userInfo._id}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleReviewSubmit}
        />
      )}

      <div className="w-1/2 mt-6">
        <button
          onClick={updateProfile}
          className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-full"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default User;
