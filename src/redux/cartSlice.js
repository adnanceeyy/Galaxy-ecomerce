import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exist = state.cart.find((item) => item.id === action.payload.id);

      if (exist) {
        exist.qty += 1;
      } else {
        state.cart.push({ ...action.payload, qty: 1 });
      }
    },

    increaseQty: (state, action) => {
      const item = state.cart.find((p) => p.id === action.payload);
      if (item) item.qty += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.cart.find((p) => p.id === action.payload);
      if (item && item.qty > 1) item.qty -= 1;
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeItem } =
  cartSlice.actions;

export default cartSlice.reducer;
