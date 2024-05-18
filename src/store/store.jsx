import cartReducer from "../cart/cartSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    //account: accountReducer,
    cart: cartReducer,
  },
});

export default store;
