import React, { useState } from "react";

const AddRestaurant = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cuisine: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-[#1c0f0f] text-white p-6">
      <h2 className="text-3xl font-bold mb-4">
        Add a New Restaurant
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg mb-2">
            Restaurant Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#3b1f1f] border border-gray-600"
            required
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-lg mb-2"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#3b1f1f] border border-gray-600"
            required
          />
        </div>
        <div>
          <label
            htmlFor="cuisine"
            className="block text-lg mb-2"
          >
            Cuisine
          </label>
          <input
            type="text"
            id="cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#3b1f1f] border border-gray-600"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
