import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_RESET
} from "../constant";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false
};

export const userSignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { ...state, loading: true, error: null, success:false };

    case USER_SIGNUP_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, success: true };

    case USER_SIGNUP_FAIL:
      return { ...state, loading: false, error: action.payload, success: false };

    case USER_SIGNUP_RESET:
      return { ...state, success: false, error: null };

    default:
      return state;
  }
};
