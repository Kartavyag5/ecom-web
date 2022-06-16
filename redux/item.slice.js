import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

const itemSlice = createSlice({
  name: "items",
  initialState: { products: [] },
  reducers: {
    getItems: (state, action) => {
      state.products = [...action.payload];
    },
    addItem: (state, action) => {
      state.products.push(action.payload);
      alert("item added");
    },
    deleteItem: (state, action) => {
      state.filter((item) => action.payload !== item.id);
      alert("item removed");
    },
  },
});

export const itemReducer = itemSlice.reducer;

export const { addItem, deleteItem, getItems } = itemSlice.actions;
