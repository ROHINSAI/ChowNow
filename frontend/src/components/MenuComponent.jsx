import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../store/cartSlice";
import toast from "react-hot-toast";

function MenuComponent({ menu, restaurantId }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const handleAddtoCart = (item) => {
    if (!userInfo) {
      toast.error("Please login to add items to cart");
      return;
    }
    try {
      dispatch(
        addToCart({ item: item, restaurantId: restaurantId })
      );
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };

  return (
    <div className="bg-[#1C1C1C] text-white p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {menu.map((categories) => (
          <div key={categories.cuisine} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 capitalize">
              {categories.cuisine}
            </h2>

            {categories.items.map((item) => {
              const inCart = cartItems.find(
                (cartItem) => cartItem._id === item._id
              );

              return (
                <div
                  key={item._id}
                  className="flex items-center justify-between mb-6"
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center mb-1">
                      <p className="text-lg font-semibold">
                        {item.name}
                      </p>
                      <span className="ml-2 text-sm text-gray-400">
                        {/* {item.avg_rating.toFixed(1)} ({item.no_of_ratings} ratings) */}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      {item.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <p className="text-lg font-bold">
                        ₹{item.price}
                      </p>

                      {!inCart ? (
                        <button
                          onClick={() => handleAddtoCart(item)}
                          className="bg-[#884040] text-white text-sm font-semibold px-4 py-2 rounded-xl"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2 bg-[#884040] rounded-xl px-3 py-1">
                          <button
                            onClick={() =>
                              dispatch(
                                decrementQuantity(item._id)
                              )
                            }
                            className="px-2 text-lg font-bold"
                          >
                            -
                          </button>
                          <span>{inCart.quantity}</span>
                          <button
                            onClick={() =>
                              dispatch(
                                incrementQuantity(item._id)
                              )
                            }
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
                      src={item.picture}
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
