import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

const itemSlice = createSlice({
  name: "items",
  initialState: [...data],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
      alert("item added");
    },
    deleteItem: (state, action) => {
      state.filter((item)=> action.payload !== item.id);
      alert("item removed");
    },

  },
});

export const itemReducer = itemSlice.reducer;

export const { addItem, deleteItem } = itemSlice.actions;
