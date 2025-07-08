import { createSlice } from "@reduxjs/toolkit";

const MenuSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items[newItem.id];

      if (!existingItem) {
        state.items[newItem.id] = { ...newItem, quantity: 1 };
      } else {
        existingItem.quantity++;
      }
      state.totalQuantity++;
      state.totalAmount += newItem.price;
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items[id];
      if (existingItem) {
        existingItem.quantity++;
        state.totalQuantity++;
        state.totalAmount += existingItem.price;
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items[id];

      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
        if (existingItem.quantity === 1) {
          // Remove item if quantity becomes 0
          delete state.items[id];
        } else {
          existingItem.quantity--;
        }
      }
    },
  },
});

export const { addItem, incrementQuantity, decrementQuantity } =
  MenuSlice.actions;
export default MenuSlice.reducer;
