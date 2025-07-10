import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../components/authSlice";
import { fetchUserProfile } from "../components/authSlice";

const User = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadProfile = async () => {
      try {
        await dispatch(fetchUserProfile());
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    loadProfile();
  }, [dispatch]);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);

  const [phone, setPhone] = useState("");
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);

  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  const [originalUser, setOriginalUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      const response = await fetch("http://localhost:3000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, phone, email }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

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
    if (e.key === "Enter" && name.trim()) setIsNameSubmitted(true);
  };
  const handlePhoneSubmit = (e) => {
    if (e.key === "Enter" && phone.trim()) setIsPhoneSubmitted(true);
  };
  const handleEmailSubmit = (e) => {
    if (e.key === "Enter" && email.trim()) setIsEmailSubmitted(true);
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
        if (!isPhoneSubmitted) setPhone(originalUser.phone || "");
        if (!isEmailSubmitted) setEmail(originalUser.email || "");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isNameSubmitted, isPhoneSubmitted, isEmailSubmitted, originalUser]);

  return (
    <div className="min-h-screen bg-[#1c0f0f] text-white p-6 space-y-8 w-full mx-auto rounded-lg">
      <div>
        <h2 className="text-3xl font-bold">Account</h2>
        <p className="text-sm text-gray-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-4 p-4  rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Personal Information</h3>

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
              <span className="text-lg font-medium">{phone}</span>
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
              <span className="text-lg font-medium">{email}</span>
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
        <h3 className="text-xl font-semibold">Payment Methods</h3>
        <div className="p-3 bg-[#3b1f1f] rounded-full w-1/2">
          💳 Visa ending in 1234
        </div>
      </div>

      {showModal && <Modal onClose={() => setShowModal(false)} />}

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
