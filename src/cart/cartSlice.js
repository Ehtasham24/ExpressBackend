import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  carts: [{ id: 1, text: "Initial text" }],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const cart = {
        id: nanoid(),
        text: action.payload,
      };
      state.carts.push(cart);
    },
    removeCart: (state, action) => {
      state.carts = state.carts.filter((cart) => cart.id !== action.payload);
    },
  },
});

export const { addCart, removeCart } = CartSlice.action;

export default CartSlice.reducer;
