import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  incrementQuantity,
  decrementQuantity,
} from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const restaurantId = cart.restaurantId; // get it from first item

      const response = await fetch(
        "http://localhost:3000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            restaurant: restaurantId,
            items: cart.items.map((item) => ({
              _id: item._id,
              name: item.name,
              picture: item.picture,
              quantity: item.quantity,
              price: item.price,
            })),
          }),
        }
      );

      if (!response.ok) throw new Error("Order creation failed");

      const data = await response.json();
      console.log("Order success:", data);
      dispatch(clearCart());
      navigate("/Order");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const { userInfo } = useSelector((state) => state.auth);

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center bg-[#1a0f0f]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 64 64"
          className="w-32 h-32 mb-6 text-[#F93838]"
        >
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="#F93838"
            opacity="0.1"
          />
          <path
            d="M16 20h2l6 24h20l6-16H22"
            stroke="#F93838"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="28" cy="50" r="3" fill="#F93838" />
          <circle cx="44" cy="50" r="3" fill="#F93838" />
        </svg>
        <h2 className="text-3xl font-bold text-white mb-2">
          Your Cart is empty
        </h2>
        <p className="text-lg text-gray-300">
          Looks like you haven&apos;t added anything yet.
        </p>
      </div>
    );
  }

  // Calculate subtotal
  const subtotal = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFee = 30;
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-[#1a0f0f] text-white p-6 min-h-screen w-1/2 mx-auto">
      <h2 className="text-3xl font-bold mb-8">Your Cart</h2>

      {/* Restaurant Name */}
      <div className="mb-4">
        <p className="text-base font-medium text-[#F5F5F5]">
          From The Burger Joint
        </p>
      </div>

      {/* Cart Items */}
      <div className="space-y-6 mb-8">
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between"
          >
            {/* Item Image and Details */}
            <div className="flex items-center space-x-4">
              <img
                src={item.picture}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div>
                <p className="text-sm text-white font-medium">
                  {item.quantity} x {item.name}
                </p>
                <p className="text-xs text-gray-400">Starter</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 bg-[#3c1e1e] rounded-full px-3 py-1.5">
              <button
                onClick={() =>
                  dispatch(decrementQuantity(item._id))
                }
                className="w-6 h-6 flex items-center justify-center text-white font-bold rounded-full bg-[#5c2e2e]"
              >
                −
              </button>
              <span className="min-w-[20px] text-center text-sm">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  dispatch(incrementQuantity(item._id))
                }
                className="w-6 h-6 flex items-center justify-center text-white font-bold rounded-full bg-[#5c2e2e]"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Promocode Input (Optional) */}
      <input
        type="text"
        placeholder="Enter promocode"
        className="w-full bg-[#3c1e1e] text-white placeholder:text-[#aaa] border border-[#5c2e2e] rounded-md px-4 py-3 mb-6"
      />

      {/* Delivery Details */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">
          Delivery Details
        </h3>

        {/* Address */}
        <div className="flex items-center justify-between py-3 border-b border-[#444]">
          <div>
            <p className="text-sm font-medium">
              Delivery Address
            </p>
            <p className="text-xs text-gray-400">
              {userInfo.address}
            </p>
          </div>
          <span className="text-gray-400">›</span>
        </div>

        {/* Time */}
        <div className="flex items-center justify-between py-3 border-b border-[#444]">
          <div>
            <p className="text-sm font-medium">Delivery Time</p>
            <p className="text-xs text-gray-400">ASAP</p>
          </div>
          <span className="text-gray-400">›</span>
        </div>

        {/* Delivery Fee */}
        <div className="flex items-center justify-between py-3">
          <p className="text-sm font-medium">Delivery Fee</p>
          <p className="text-sm font-medium">
            ₹{deliveryFee.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Price Summary */}
      <div className="space-y-3 mb-8">
        <div className="flex justify-between items-center">
          <p className="text-base">Subtotal</p>
          <p className="text-base">₹{subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center text-lg font-bold">
          <p>Total</p>
          <p>₹{total.toFixed(2)}</p>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        className="w-full bg-[#F93838] hover:bg-[#e22e2e] transition-colors text-white py-4 rounded-xl font-semibold text-lg"
        onClick={handleClick}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
