import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      !storedUser ||
      storedUser.username !== username ||
      storedUser.password !== password
    ) {
      setError("Invalid username or password");
      return;
    }

    setError("");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a0f0f] text-white">
      <form onSubmit={handleSignIn} className="w-full max-w-sm space-y-6">
        <h2 className="text-2xl font-bold text-center">Welcome back</h2>

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

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#F93838] hover:bg-[#e22e2e] text-white py-3 rounded-full font-semibold"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default SignIn;
