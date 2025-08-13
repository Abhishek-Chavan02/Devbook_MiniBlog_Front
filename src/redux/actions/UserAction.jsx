import axios from "axios";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
} from "../constant";

export const GetUser = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token here
      },
    };

    const { data } = await axios.get("/getAllUsers", config);

    dispatch({
      type: GET_USER_SUCCESS,
      payload: data.users, // Adjust according to your backend response
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
