import cartReducer from "../cart/cartSlice";
import isOpenReducer from "../cart/isOpenSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    //account: accountReducer,
    cart: cartReducer,
    isOpen: isOpenReducer,
  },
});

export default store;
