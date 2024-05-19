/* import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      console.log(action.payload);
      // state.carts = [...state.carts, action.payload];
      state.carts.push({ ...action.payload, quantity: 1 });
    },
    removeCart(state, action) {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addCart, removeCart } = CartSlice.actions;

export default CartSlice.reducer;
 */ import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      state.carts.push({ ...action.payload, quantity: 1 });
    },
    removeCart(state, action) {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action) {
      const { id } = action.payload;
      const item = state.carts.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
        //item.price *= 2; // Double the price
      }
    },
    decreaseQuantity(state, action) {
      const { id } = action.payload;
      const itemIndex = state.carts.findIndex((item) => item.id === id);
      if (itemIndex !== -1 && state.carts[itemIndex].quantity > 0) {
        state.carts[itemIndex].quantity -= 1;
        // state.carts[itemIndex].price /= 2; // Halve the price
        if (state.carts[itemIndex].quantity === 0) {
          // If quantity becomes 0, remove the item from the cart
          state.carts.splice(itemIndex, 1);
        }
      }
    },
  },
});

export const { addCart, removeCart, increaseQuantity, decreaseQuantity } =
  CartSlice.actions;

export default CartSlice.reducer;
