import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cartSlice";
import authReducer from "../store/authSlice";

// Load from localStorage
const loadState = () => {
  try {
    const serialized = localStorage.getItem("cart");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (e) {
    console.warn("Could not load state", e);
    return undefined;
  }
};

// Save to localStorage
const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state.cart);
    localStorage.setItem("cart", serialized);
  } catch (e) {
    console.warn("Could not save state", e);
  }
};

const preloadedState = {
  cart: loadState(),
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
  saveState(store.getState());
});

export default store;
