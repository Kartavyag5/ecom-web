import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart.slice";
import { itemReducer } from "./item.slice";

const reducer = {
  cart: cartReducer,
  items: itemReducer,
};

const store = configureStore({
  reducer,
});

export default store;
