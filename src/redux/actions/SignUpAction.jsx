import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
} from "../constant";
import axiosInstance from "../../app/axiosIntance"; 

export const signup = (formData) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });

    const { data } = await axiosInstance.post("signup", formData);

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        err.response?.data?.message || err.message || "Signup failed",
    });
  }
};

