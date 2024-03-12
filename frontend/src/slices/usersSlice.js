import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersDetails: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setusers: (state, action) => {
      state.usersDetails = action.payload;
    },
  },
});

export const { setusers } = usersSlice.actions;
export default usersSlice.reducer;
