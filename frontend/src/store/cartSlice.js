import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {}, // key: item.id, value: { ...item, quantity }
  restaurantId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      console.log("Reducer received:", item);

      // if (
      //   state.restaurantId &&
      //   state.restaurantId !== item.restaurantId
      // ) {
      //   // Prevent adding items from a different restaurant
      //   console.log(
      //     "Cannot add item from a different restaurant"
      //   );
      //   return;
      // }

      if (!state.restaurantId) {
        state.restaurantId = item.restaurantId;
      }

      if (state.items[item.id]) {
        state.items[item.id].quantity += 1;
      } else {
        state.items[item.id] = { ...item, quantity: 1 };
      }
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        if (state.items[id].quantity > 1) {
          state.items[id].quantity -= 1;
        } else {
          delete state.items[id];
        }
      }
    },
    clearCart: (state) => {
      state.items = {};
      state.restaurantId = null;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
