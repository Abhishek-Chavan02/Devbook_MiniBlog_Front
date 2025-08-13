import { configureStore } from "@reduxjs/toolkit";
import { userSignupReducer } from "./reducers/SignupReducer";
import { loginReducer } from "./reducers/LoginReducer";
import {UserReducer} from "./reducers/UserReducer";

const store = configureStore({
  reducer: {
    userSignup: userSignupReducer,
    userLogin: loginReducer,
    userList: UserReducer
  }
});

export default store;
