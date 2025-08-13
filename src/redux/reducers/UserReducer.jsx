import {
GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  USER_LOGOUT, // add this
} from "../constant";

const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loading: false,
  userInfo: userFromStorage, 
  error: null,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_USER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload.user };

    case GET_USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_LOGOUT:
      return { ...state, userInfo: null, error: null }; 

    default:
      return state;
  }
};
export default  UserReducer;