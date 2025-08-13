import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL
} from "../constant";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
};

export const userSignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { ...state, loading: true, error: null };

   case USER_SIGNUP_SUCCESS:
  return { ...state, loading: false, userInfo: action.payload };


    case USER_SIGNUP_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
