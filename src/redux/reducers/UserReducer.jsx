// reducers/UserReducer.js
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_SINGLE_USER_REQUEST,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_FAIL,
  USER_LOGOUT,
} from "../constant";

const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loading: false,
  loggedInUser: userFromStorage, // currently logged-in user
  users: [], // all users list
  singleUser: null, // user fetched by ID
  error: null,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get all users
    case GET_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_USER_SUCCESS:
      return { ...state, loading: false, users: action.payload.users };
    case GET_USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Get single user by ID
    case GET_SINGLE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_SINGLE_USER_SUCCESS:
      return { ...state, loading: false, singleUser: action.payload };
    case GET_SINGLE_USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Logout
    case USER_LOGOUT:
      return { ...state, loggedInUser: null, error: null };

    default:
      return state;
  }
};
