import { createSlice } from "@reduxjs/toolkit";
import { getAboutUser, loginUser, registerUser } from "../../action/authAction";

const initialState = {
  user: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  LoggedIn: false,
  message: "",
  profileFetched: false,
  connections: [],
  connectionRequest: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    handleLoginUser: (state) => {
      state.message = "hello";
    },
    emptyMessage: (state) =>{
  state.message= "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = "knowing the door....";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.LoggedIn = true;
        state.message = "login is successful.";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
        state.message = "register you...";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.LoggedIn = true;
        state.message = {
          message: "Registration is successful, Please login in",
        };
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAboutUser.fulfilled, (state, action) =>{
         state.isLoading =false;
        state.LoggedIn =false;
        state.profileFetched = true;
        state.user = action.payload
      })
      
  }
});
 
export const {reset,emptyMessage} =authSlice.actions;
export default authSlice.reducer;
