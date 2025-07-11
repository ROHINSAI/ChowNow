import { createSlice } from "@reduxjs/toolkit";

const initialStateCart = {
  items: [],
  restaurantId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateCart,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload.item;
      if (!state.restaurantId) {
        state.restaurantId = action.payload.restaurantId;
      }
      // Check if the cart already has items from a different restaurant
      if (
        state.restaurantId &&
        state.restaurantId !== action.payload.restaurantId
      ) {
        throw new Error(
          "Cannot add items from a different restaurant to the cart"
        );
      }

      // Find if item already exists in cart
      const existingItem = state.items.find(
        (i) => i._id === item._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i._id === id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const itemIndex = state.items.findIndex(
        (i) => i._id === id
      );
      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
          if (state.items.length === 0) {
            state.restaurantId = null; // Clear restaurantId if cart is empty
          }
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
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
