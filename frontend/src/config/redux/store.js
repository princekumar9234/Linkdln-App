import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";

/**
 * STEPS for state management
 * submit action
 * handle action in it's Reducer
 * register here -> Reducer
 *
 */

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
