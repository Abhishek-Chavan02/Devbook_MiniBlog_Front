import { configureStore } from "@reduxjs/toolkit";
import { userSignupReducer } from "./reducers/SignupReducer";
import { loginReducer,sendOtpReducer } from "./reducers/LoginReducer";
import {UserReducer} from "./reducers/UserReducer";
import { blogReducer } from "./reducers/BlogReducer";

const store = configureStore({
  reducer: {
    userSignup: userSignupReducer,
    userLogin: loginReducer,
    sendOtp: sendOtpReducer,
    userList: UserReducer,
    blogList: blogReducer,
  }
});

export default store;
