import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lon);

          // Fetch address using OpenStreetMap reverse geocoding
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );
            const data = await res.json();
            if (data?.display_name) {
              setAddress(data.display_name); // autofill form address
            }
          } catch (err) {
            console.error("Error fetching address:", err);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
          address,
          photo,
          location: {
            latitude,
            longitude,
          },
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(setCredentials(data));
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#1a0f0f] text-white">
      <form onSubmit={handleSignUp} className="w-full max-w-sm space-y-6">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        <div>
          <label className="block text-sm">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            className="w-full px-4 py-2 mt-1 bg-[#3c1e1e] border border-[#5c2e2e] rounded-md focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full px-4 py-2 mt-1 bg-[#3c1e1e] border border-[#5c2e2e] rounded-md focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">Address</label>
          <input
            type="text"
            placeholder="Enter address"
            className="w-full px-4 py-2 mt-1 bg-[#3c1e1e] border border-[#5c2e2e] rounded-md focus:outline-none"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 mt-1 bg-[#3c1e1e] border border-[#5c2e2e] rounded-md focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm">Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter password"
            className="w-full px-4 py-2 mt-1 bg-[#3c1e1e] border border-[#5c2e2e] rounded-md focus:outline-none"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">Photo (Optional)</label>
          <input
            type="Photo"
            placeholder="Enter Image URL"
            className="w-full px-4 py-2 mt-1 bg-[#3c1e1e] border border-[#5c2e2e] rounded-md focus:outline-none"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#F93838] hover:bg-[#e22e2e] text-white py-3 rounded-full font-semibold"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-6 text-center text-gray-400">
        Already have an account?{" "}
        <Link
          to="/signIn"
          className="font-medium text-blue-500 hover:text-blue-400"
        >
          Sign In
        </Link>
      </p>
      <p className="mt-6 text-center text-gray-400">
        Sign Up as Restaurant Owner?{" "}
        <Link
          to="/signupowner"
          className="font-medium text-blue-500 hover:text-blue-400"
        >
          Owner Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
