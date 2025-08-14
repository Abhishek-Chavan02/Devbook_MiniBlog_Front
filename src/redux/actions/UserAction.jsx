// actions/UserAction.js
import axiosInstance from "../../app/axiosIntance";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "../constant";

// GET all users
export const GetUser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const { data } = await axiosInstance.get("/getAllUsers");
    console.log("API response:", data);

    dispatch({
      type: GET_USER_SUCCESS,
      payload: { users: data.users },
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        error.response?.data?.message || error.message || "Something went wrong",
    });
  }
};

// GET user by ID
export const GetUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const { data } = await axiosInstance.get(`/getUserById/${id}`); // assuming route is /users/:id

    dispatch({
      type: GET_USER_SUCCESS,
      payload: { user: data.user },
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch user",
    });
  }
};

// DELETE user by ID
export const DeleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    await axiosInstance.delete(`/deleteUser/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response?.data?.message || error.message || "Failed to delete user",
    });
  }
};

// UPDATE user by ID
export const UpdateUser = (id, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const { data } = await axiosInstance.put(`/updateUser/${id}`, updatedData);

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.user, // assuming backend returns { message, user }
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response?.data?.message || error.message || "Failed to update user",
    });
  }
};
