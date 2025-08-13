import { configureStore } from "@reduxjs/toolkit";
import { userSignupReducer } from "./reducers/SignupReducer";
import { loginReducer } from "./reducers/LoginReducer";

const store = configureStore({
  reducer: {
    userSignup: userSignupReducer,
    userLogin: loginReducer,
  }
});

export default store;
