import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: { users: [] },
  reducers: {
    getUsers: (state, action) => {
      state.users = [...action.payload];
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
      alert("user added");
    },
    deleteUser: (state, action) => {
      state.users.filter((user) => action.payload !== user.id);
      alert("user Deleted");
    },
    // updateUser: (state, action) => {
    //   state.map((item) => {
    //     if(action.payload.id == item.id){
    //       action.payload.name ==
    //     }});
    //   alert("user Updated");
    // },
  },
});

export const userReducer = userSlice.reducer;

export const { addUser, deleteUser, getUsers } = userSlice.actions;
