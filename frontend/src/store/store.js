import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cartSlice";
import authReducer from "../store/authSlice";
import { autoLogin } from "../store/authSlice";

// Loading Cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serialized = localStorage.getItem("cart");
    return serialized
      ? JSON.parse(serialized)
      : { items: [], restaurantId: null };
  } catch (e) {
    console.warn("Could not load state", e);
    return { items: [], restaurantId: null };
  }
};

// Save to localStorage
const saveCartToLocalStorage = (state) => {
  try {
    const serialized = JSON.stringify(state.cart);
    localStorage.setItem("cart", serialized);
  } catch (e) {
    console.warn("Could not save state", e);
  }
};

const preloadedState = {
  cart: loadCartFromLocalStorage(),
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
  preloadedState,
});

// Listen to store changes and save
store.subscribe(() => {
  const state = store.getState();
  saveCartToLocalStorage(state);
});

store.dispatch(autoLogin()); // Auto-login on store initialization

export default store;
