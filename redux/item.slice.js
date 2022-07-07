import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "items",
  initialState: { products: [], searchValue:''},
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
    setSearchValue: (state, action)=>{
      state.searchValue = action.payload
    }
  },
});

export const itemReducer = itemSlice.reducer;

export const { addItem, deleteItem, getItems, setSearchValue } = itemSlice.actions;
