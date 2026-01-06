import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  OTP_SEND_REQUEST,
  OTP_SEND_SUCCESS,
  OTP_SEND_FAIL,
} from "../constant";

const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loading: false,
  userInfo: userFromStorage,
  error: null,
  otpData: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };

    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload.user, error: null };

    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_LOGOUT:
      return { ...state, userInfo: null, error: null };

    default:
      return state;
  }
};

export const sendOtpReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case OTP_SEND_REQUEST:
      return { ...state, loading: true, error: null };

    case OTP_SEND_SUCCESS:
      return { ...state, loading: false, success: true, error: null, otpData: action.payload };

    case OTP_SEND_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

// ✅ Correct default export (Redux compatible)
export default { loginReducer, sendOtpReducer };

