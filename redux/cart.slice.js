import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {carts:[]},
  reducers: {
    setAllCarts:(state, action)=>{
      state.carts = [...action.payload];
    },
    addToCart: (state, action) => {
      const userCart = state.carts.find((item)=>item.user_id === action.payload.user_id)
      const itemExists = userCart?.products?.find((item) => item.product_id === action.payload.product.id);
        if (itemExists) {
          itemExists.quantity++;
          alert("item quantity increase!!");
        } else {
          userCart.products.push({ ...action.payload.product, quantity: 1 });
          // console.log("state update", state);
          alert("item Added to Cart!!");
        }
    },

    incrementQuantity: (state, action) => {
      const item = state.carts.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.carts.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        const index = state.carts.findIndex((item) => item.id === action.payload);
        state.carts.splice(index, 1);
      } else {
        item.quantity--;
      }
    },

    removeFromCart: (state, action) => {
      const index = state.carts.findIndex((item) => item.id === action.payload);
      state.carts.splice(index, 1);
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  setAllCarts,
  getUserCart,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;
