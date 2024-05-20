import cartReducer from "../cartRedux/cartSlice";
import isOpenReducer from "../cartRedux/isOpenSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    //account: accountReducer,
    cart: cartReducer,
    isOpen: isOpenReducer,
  },
});

export default store;
