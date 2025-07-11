import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import toast from "react-hot-toast";

const SignUpOwner = () => {
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (
      !ownerName ||
      !email ||
      !password ||
      !address ||
      !phone
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(
        "http://localhost:3000/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: ownerName,
            email,
            password,
            address,
            phone,
            role: "owner",
          }),
        }
      );
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
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">
          Restaurant Owner Sign Up
        </h2>
        <div>
          <label className="block text-sm">Owner Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 mt-1 bg-[#3c1e1e] border border-[#5c2e2e] rounded-md focus:outline-none"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">Phone Number</label>
          <input
            type="text"
            placeholder="Enter phone number"
            className="w-full px-4 py-2 mt-1 bg-[#3c1e1e] border border-[#5c2e2e] rounded-md focus:outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <label className="block text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Re-enter password"
            className="w-full px-4 py-2 mt-1 bg-[#3c1e1e] border border-[#5c2e2e] rounded-md focus:outline-none"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
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
    </div>
  );
};

export default SignUpOwner;
