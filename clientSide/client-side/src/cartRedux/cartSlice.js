import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      console.log("Adding to cart:", action.payload);
      const existingProduct = state.carts.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.sellingQuantity += 1;
      } else {
        state.carts.push({ ...action.payload, sellingQuantity: 1 });
      }
    },
    clearCart(state) {
      state.carts = [];
    },
    removeCart(state, action) {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action) {
      console.log(action.payload);
      const { id } = action.payload;
      const item = state.carts.find((item) => item.id === id);

      if (item) {
        if (item.sellingQuantity < item.quantity) {
          item.sellingQuantity += 1;
        }
      }
    },
    decreaseQuantity(state, action) {
      const { id } = action.payload;
      const itemIndex = state.carts.findIndex((item) => item.id === id);
      if (itemIndex !== -1 && state.carts[itemIndex].sellingQuantity > 0) {
        state.carts[itemIndex].sellingQuantity -= 1;
        if (state.carts[itemIndex].sellingQuantity === 0) {
          state.carts.splice(itemIndex, 1);
        }
      }
    },
  },
});

export const {
  addCart,
  removeCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;
