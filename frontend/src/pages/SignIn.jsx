import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(setCredentials(data));
        navigate(
          data.role === "admin"
            ? "/admin"
            : data.role === "owner"
            ? "/restaurant-dashboard"
            : "/"
        );
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#1a0f0f] text-white">
      <form onSubmit={handleSignIn} className="w-full max-w-sm space-y-6">
        <h2 className="text-2xl font-bold text-center">Welcome back</h2>

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
          <label className="block text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 mt-1 bg-[#3c1e1e] border border-[#5c2e2e] rounded-md focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#F93838] hover:bg-[#e22e2e] text-white py-3 rounded-full font-semibold"
        >
          Continue
        </button>
      </form>
      <p className="mt-6 text-center text-gray-400">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-blue-500 hover:text-blue-400"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
