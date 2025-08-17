import axiosInstance from "../../app/axiosIntance";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../constant";

export const login = (formData) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axiosInstance.post("/login", formData);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("userInfo", JSON.stringify(data.user));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response?.data?.message || err.message || "Wrong credentials",
    });
  }
};

