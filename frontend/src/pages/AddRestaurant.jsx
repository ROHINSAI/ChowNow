import React, { useState, useEffect } from "react";

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState({ lat: "", long: "" });
  const [pictures, setPictures] = useState([""]);
  const [contact, setContact] = useState({ address: "", phone: "", email: "" });
  const [menu, setMenu] = useState([
    {
      cuisine: "",
      items: [
        {
          name: "",
          price: "",
          discount: 0,
          description: "",
          picture: "",
        },
      ],
    },
  ]);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, long: lon });

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );
            const data = await res.json();
            if (data?.display_name) {
              setContact((prev) => ({ ...prev, address: data.display_name }));
            }
          } catch (err) {
            console.error("Reverse geocoding failed", err);
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  const handleAddCuisine = () => {
    setMenu([
      ...menu,
      {
        cuisine: "",
        items: [
          { name: "", price: "", discount: 0, description: "", picture: "" },
        ],
      },
    ]);
  };

  const handleDeleteCuisine = (index) => {
    const updated = menu.filter((_, i) => i !== index);
    setMenu(updated);
  };

  const handleAddItem = (cuisineIndex) => {
    const updatedMenu = [...menu];
    updatedMenu[cuisineIndex].items.push({
      name: "",
      price: "",
      discount: 0,
      description: "",
      picture: "",
    });
    setMenu(updatedMenu);
  };

  const handleDeleteItem = (cuisineIndex, itemIndex) => {
    const updatedMenu = [...menu];
    updatedMenu[cuisineIndex].items = updatedMenu[cuisineIndex].items.filter(
      (_, idx) => idx !== itemIndex
    );
    setMenu(updatedMenu);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      description,
      location: {
        lat: parseFloat(location.lat),
        long: parseFloat(location.long),
      },
      pictures: pictures.filter((pic) => pic.trim() !== ""),
      contact,
      menu,
    };

    try {
      const res = await fetch("http://localhost:3000/api/restaurants/owner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create restaurant");
      const data = await res.json();
      alert("Restaurant added successfully!");
      console.log(data);
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-[#1c0f0f] text-white">
      <h2 className="text-3xl font-bold mb-4">Add Restaurant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Restaurant Name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Latitude"
            className="input"
            value={location.lat}
            onChange={(e) => setLocation({ ...location, lat: e.target.value })}
          />
          <input
            type="number"
            placeholder="Longitude"
            className="input"
            value={location.long}
            onChange={(e) => setLocation({ ...location, long: e.target.value })}
          />
        </div>

        <input
          type="text"
          placeholder="Restaurant Image URL"
          className="input"
          value={pictures[0]}
          onChange={(e) => setPictures([e.target.value])}
        />

        <input
          type="text"
          placeholder="Contact Address"
          className="input"
          value={contact.address}
          onChange={(e) => setContact({ ...contact, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact Phone"
          className="input"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Contact Email"
          className="input"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
        />

        <div>
          <h3 className="text-xl font-semibold mb-2">Menu</h3>
          {menu.map((cuisine, cuisineIndex) => (
            <div
              key={cuisineIndex}
              className="mb-6 p-4 border border-gray-600 rounded-lg"
            >
              <input
                type="text"
                placeholder="Cuisine Name"
                className="input mb-2"
                value={cuisine.cuisine}
                onChange={(e) => {
                  const updatedMenu = [...menu];
                  updatedMenu[cuisineIndex].cuisine = e.target.value;
                  setMenu(updatedMenu);
                }}
              />
              {cuisine.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="mb-3 border-t border-gray-500 pt-3 relative"
                >
                  <input
                    type="text"
                    placeholder="Item Name"
                    className="input"
                    value={item.name}
                    onChange={(e) => {
                      const updatedMenu = [...menu];
                      updatedMenu[cuisineIndex].items[itemIndex].name =
                        e.target.value;
                      setMenu(updatedMenu);
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    className="input"
                    value={item.price}
                    onChange={(e) => {
                      const updatedMenu = [...menu];
                      updatedMenu[cuisineIndex].items[itemIndex].price =
                        e.target.value;
                      setMenu(updatedMenu);
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Discount"
                    className="input"
                    value={item.discount}
                    onChange={(e) => {
                      const updatedMenu = [...menu];
                      updatedMenu[cuisineIndex].items[itemIndex].discount =
                        e.target.value;
                      setMenu(updatedMenu);
                    }}
                  />
                  <textarea
                    placeholder="Description"
                    className="input"
                    value={item.description}
                    onChange={(e) => {
                      const updatedMenu = [...menu];
                      updatedMenu[cuisineIndex].items[itemIndex].description =
                        e.target.value;
                      setMenu(updatedMenu);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Item Image URL"
                    className="input"
                    value={item.picture}
                    onChange={(e) => {
                      const updatedMenu = [...menu];
                      updatedMenu[cuisineIndex].items[itemIndex].picture =
                        e.target.value;
                      setMenu(updatedMenu);
                    }}
                  />
                  <button
                    type="button"
                    className="text-sm text-red-400 underline mt-1"
                    onClick={() => handleDeleteItem(cuisineIndex, itemIndex)}
                  >
                    Delete Item
                  </button>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  className="px-3 py-1 bg-green-700 rounded"
                  onClick={() => handleAddItem(cuisineIndex)}
                >
                  Add Item
                </button>
                <button
                  type="button"
                  className="px-3 py-1 bg-red-700 rounded"
                  onClick={() => handleDeleteCuisine(cuisineIndex)}
                >
                  Delete Cuisine
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 rounded"
            onClick={handleAddCuisine}
          >
            Add Cuisine
          </button>
        </div>

        <button type="submit" className="px-6 py-2 bg-green-600 rounded">
          Submit
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

export default AddRestaurant;
