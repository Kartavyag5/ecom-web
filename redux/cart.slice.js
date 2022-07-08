import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
  name: "cart",
  initialState: { carts: [], userCart: {} },
  reducers: {
    setAllCarts: (state, action) => {
      state.carts = [...action.payload];
    },
    setUserCart: (state, action) => {
      state.userCart = {...action.payload};
    },
    addToCart: (state, action) => {      
      const itemExists = state.userCart?.products.find(
        (item) => item.id === action.payload.product.id
      );
      if (itemExists) {
        // itemExists.quantity++;
        state.userCart.products.map((item) =>
          item.id === itemExists.id
            ? { ...item, quantity: ++item.quantity }
            : item
        );
        state.carts.map((item)=>(item.user_id === state.userCart.user_id) && item.products.push({product_id:action.payload.product.id, quantity:1}) )
        localStorage.setItem("userCart", JSON.stringify(state.userCart));
        axios.post("http://localhost:3000/userCart", state.userCart).then((response) => {
        });
        alert("item quantity increase!!");
      } else {
        state.userCart.products.push({
          ...action.payload.product,
          quantity: 1,
        });
        state.carts.map((item)=>(item.user_id === state.userCart.user_id) && item.products.map((item)=>item.product_id===action.payload.product.id &&{...item, quantity:1}) )
        localStorage.setItem("userCart", JSON.stringify(state.userCart));
        alert("item Added to Cart!!");
      }
    },

    incrementQuantity: (state, action) => {
      const item = state.userCart.products.find(
        (item) => item.id === action.payload
      );
      item.quantity++;
      localStorage.setItem("userCart", JSON.stringify(state.userCart));
    },
    decrementQuantity: (state, action) => {
      const item = state.userCart.products.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        const index = state.carts.findIndex(
          (item) => item.id === action.payload
        );
        state.carts.splice(index, 1);
      } else {
        item.quantity--;
      }
      localStorage.setItem("userCart", JSON.stringify(state.userCart));
    },

    removeFromCart: (state, action) => {
      const index = state.carts.findIndex((item) => item.id === action.payload);
      state.carts.splice(index, 1);
      state.userCart.products.filter((item)=>item.id != action.payload)
      localStorage.setItem("userCart", JSON.stringify(state.userCart));
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  setUserCart,
  setAllCarts,
  getUserCart,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;
