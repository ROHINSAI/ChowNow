import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (username.length < 3)
      return setError("Username must be at least 3 characters.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (password !== confirm)
      return setError("Passwords do not match.");

    const newUser = { username, password };
    localStorage.setItem("user", JSON.stringify(newUser));

    setError("");
    alert("Signup successful!");
    navigate("/signin");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#1a0f0f] text-white">
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">
          Create Account
        </h2>

        <div>
          <label className="block text-sm">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            className="w-full px-4 py-2 mt-1 bg-[#3c1e1e] border border-[#5c2e2e] rounded-md focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

export default SignUp;
