import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity } from "./cartSlice";

function MenuComponent({ menu }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="bg-[#1C1C1C] text-white p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {Object.entries(menu).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 capitalize">{category}</h2>

            {items.map((item) => {
              const inCart = cartItems[item.id];

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between mb-6"
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center mb-1">
                      <p className="text-lg font-semibold">{item.name}</p>
                      <span className="ml-2 text-sm text-gray-400">
                        {item.avg_rating.toFixed(1)} ({item.no_of_ratings}{" "}
                        ratings)
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      {item.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <p className="text-lg font-bold">₹{item.price}</p>

                      {!inCart ? (
                        <button
                          onClick={() => dispatch(addToCart(item))}
                          className="bg-[#884040] text-white text-sm font-semibold px-4 py-2 rounded-xl"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2 bg-[#884040] rounded-xl px-3 py-1">
                          <button
                            onClick={() => dispatch(decrementQuantity(item.id))}
                            className="px-2 text-lg font-bold"
                          >
                            –
                          </button>
                          <span>{inCart.quantity}</span>
                          <button
                            onClick={() => dispatch(incrementQuantity(item.id))}
                            className="px-2 text-lg font-bold"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.photo}
                      alt={item.name || "menu item"}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuComponent;
