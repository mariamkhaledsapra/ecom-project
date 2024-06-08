import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  username: localStorage.getItem("username") || false,
  isLoggedIn: localStorage.getItem("username") ? true : false,
  darkMode: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoggedIn = true;
      state.username = localStorage.getItem("id");
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.username = false;
      toast.success("You have successfuly logout");
    },
    changeMode: (state) => {
      state.darkMode = !state.darkMode;
      if (state.darkMode) {
        document.querySelector("html").setAttribute("data-theme", "dark");
      } else {
        document.querySelector("html").setAttribute("data-theme", "winter");
      }
    },
  },
});

// console.log(cartSlice);
export const { loginUser, logoutUser, changeMode } = authSlice.actions;

export default authSlice.reducer;
