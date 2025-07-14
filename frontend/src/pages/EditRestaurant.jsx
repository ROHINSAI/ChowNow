import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditRestaurant = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurant = async () => {
      const res = await fetch("http://localhost:3000/api/owner/myrestaurant", {
        credentials: "include",
      });
      const data = await res.json();
      setRestaurant(data);
      setUpdatedData(data);
    };
    fetchRestaurant();
  }, []);

  const handleChange = (field, value) => {
    setUpdatedData({ ...updatedData, [field]: value });
  };

  const handleLocationChange = (latOrLong, value) => {
    setUpdatedData({
      ...updatedData,
      location: {
        ...updatedData.location,
        [latOrLong]: value,
      },
    });
  };

  const handleContactChange = (field, value) => {
    setUpdatedData({
      ...updatedData,
      contact: {
        ...updatedData.contact,
        [field]: value,
      },
    });
  };

  const handleMenuChange = (cuisineIndex, field, value) => {
    const newMenu = [...updatedData.menu];
    newMenu[cuisineIndex][field] = value;
    setUpdatedData({ ...updatedData, menu: newMenu });
  };

  const handleItemChange = (cuisineIndex, itemIndex, field, value) => {
    const newMenu = [...updatedData.menu];
    newMenu[cuisineIndex].items[itemIndex][field] = value;
    setUpdatedData({ ...updatedData, menu: newMenu });
  };

  const addCuisine = () => {
    const newMenu = [
      ...updatedData.menu,
      {
        cuisine: "",
        items: [
          { name: "", price: 0, discount: 0, description: "", picture: "" },
        ],
      },
    ];
    setUpdatedData({ ...updatedData, menu: newMenu });
  };

  const removeCuisine = (cuisineIndex) => {
    const newMenu = [...updatedData.menu];
    newMenu.splice(cuisineIndex, 1);
    setUpdatedData({ ...updatedData, menu: newMenu });
  };

  const addItem = (cuisineIndex) => {
    const newMenu = [...updatedData.menu];
    newMenu[cuisineIndex].items.push({
      name: "",
      price: 0,
      discount: 0,
      description: "",
      picture: "",
    });
    setUpdatedData({ ...updatedData, menu: newMenu });
  };

  const removeItem = (cuisineIndex, itemIndex) => {
    const newMenu = [...updatedData.menu];
    newMenu[cuisineIndex].items.splice(itemIndex, 1);
    setUpdatedData({ ...updatedData, menu: newMenu });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/owner/myrestaurant", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Restaurant updated!");
        navigate("/restaurant-dashboard");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (!restaurant) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#1c0f0f] p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Edit Restaurant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="input"
          placeholder="Name"
          value={updatedData.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <textarea
          className="input"
          placeholder="Description"
          value={updatedData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <div className="flex gap-4">
          <input
            className="input"
            placeholder="Latitude"
            value={updatedData.location?.lat || ""}
            onChange={(e) => handleLocationChange("lat", e.target.value)}
          />
          <input
            className="input"
            placeholder="Longitude"
            value={updatedData.location?.long || ""}
            onChange={(e) => handleLocationChange("long", e.target.value)}
          />
        </div>
        <input
          className="input"
          placeholder="Photo URL"
          value={updatedData.pictures?.[0] || ""}
          onChange={(e) => handleChange("pictures", [e.target.value])}
        />
        <input
          className="input"
          placeholder="Contact Address"
          value={updatedData.contact?.address || ""}
          onChange={(e) => handleContactChange("address", e.target.value)}
        />
        <input
          className="input"
          placeholder="Contact Phone"
          value={updatedData.contact?.phone || ""}
          onChange={(e) => handleContactChange("phone", e.target.value)}
        />
        <input
          className="input"
          placeholder="Contact Email"
          value={updatedData.contact?.email || ""}
          onChange={(e) => handleContactChange("email", e.target.value)}
        />

        <h3 className="text-xl font-semibold mt-6">Menu</h3>
        {updatedData.menu?.map((cuisine, i) => (
          <div key={i} className="border border-gray-500 p-4 mb-4 rounded-lg">
            <div className="flex items-center justify-between">
              <input
                className="input"
                placeholder="Cuisine Name"
                value={cuisine.cuisine}
                onChange={(e) => handleMenuChange(i, "cuisine", e.target.value)}
              />
              <button
                type="button"
                className="text-red-400 text-sm"
                onClick={() => removeCuisine(i)}
              >
                Delete Cuisine
              </button>
            </div>
            {cuisine.items.map((item, j) => (
              <div key={j} className="mt-3 border-t border-gray-600 pt-3">
                <input
                  className="input"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(i, j, "name", e.target.value)
                  }
                />
                <input
                  className="input"
                  placeholder="Price"
                  value={item.price}
                  type="number"
                  onChange={(e) =>
                    handleItemChange(i, j, "price", e.target.value)
                  }
                />
                <input
                  className="input"
                  placeholder="Discount"
                  value={item.discount}
                  type="number"
                  onChange={(e) =>
                    handleItemChange(i, j, "discount", e.target.value)
                  }
                />
                <textarea
                  className="input"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(i, j, "description", e.target.value)
                  }
                />
                <input
                  className="input"
                  placeholder="Item Photo URL"
                  value={item.picture}
                  onChange={(e) =>
                    handleItemChange(i, j, "picture", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="text-sm text-red-400"
                  onClick={() => removeItem(i, j)}
                >
                  Delete Item
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-2 px-3 py-1 bg-green-700 rounded"
              onClick={() => addItem(i)}
            >
              Add Item
            </button>
          </div>
        ))}

        <button
          type="button"
          className="px-4 py-2 bg-blue-600 rounded"
          onClick={addCuisine}
        >
          Add Cuisine
        </button>

        <button
          type="submit"
          className="block mt-6 px-6 py-2 bg-green-600 rounded"
        >
          Update Restaurant
        </button>
      </form>

      <style jsx>{`
        .input {
          display: block;
          width: 100%;
          background: #3b1f1f;
          border: 1px solid #5e2e2e;
          color: white;
          padding: 0.5rem 1rem;
          margin-bottom: 0.75rem;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default EditRestaurant;
