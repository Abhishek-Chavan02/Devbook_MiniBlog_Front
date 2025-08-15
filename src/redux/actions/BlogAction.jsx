// actions/BlogAction.js
import axiosInstance from "../../app/axiosIntance";
import {
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_FAIL,
  GET_BLOGS_REQUEST,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAIL,
  GET_BLOG_REQUEST,
  GET_BLOG_SUCCESS,
  GET_BLOG_FAIL,
  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_FAIL,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
  TOGGLE_LIKE_REQUEST,
  TOGGLE_LIKE_SUCCESS,
  TOGGLE_LIKE_FAIL,
} from "../constant";

// CREATE blog
export const CreateBlog = (blogData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BLOG_REQUEST });

    const { data } = await axiosInstance.post("/createBlog", blogData);

    dispatch({
      type: CREATE_BLOG_SUCCESS,
      payload: { blog: data.blog },
    });
  } catch (error) {
    dispatch({
      type: CREATE_BLOG_FAIL,
      payload:
        error.response?.data?.message || 
        error.message || 
        "Failed to create blog",
    });
  }
};

// GET all blogs
export const GetBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BLOGS_REQUEST });

    const { data } = await axiosInstance.get("/all");

    dispatch({
      type: GET_BLOGS_SUCCESS,
      payload: { blogs: data.blogs },
    });
  } catch (error) {
    dispatch({
      type: GET_BLOGS_FAIL,
      payload:
        error.response?.data?.message || 
        error.message || 
        "Failed to fetch blogs",
    });
  }
};

// GET single blog by ID
export const GetBlogById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_BLOG_REQUEST });

    const { data } = await axiosInstance.get(`/${id}`);

    dispatch({
      type: GET_BLOG_SUCCESS,
      payload: { blog: data.blog },
    });
  } catch (error) {
    dispatch({
      type: GET_BLOG_FAIL,
      payload:
        error.response?.data?.message || 
        error.message || 
        "Failed to fetch blog",
    });
  }
};

// UPDATE blog by ID
export const UpdateBlog = (id, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BLOG_REQUEST });

    const { data } = await axiosInstance.put(`/updateBlog/${id}`, updatedData);

    dispatch({
      type: UPDATE_BLOG_SUCCESS,
      payload: data.blog,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BLOG_FAIL,
      payload:
        error.response?.data?.message || 
        error.message || 
        "Failed to update blog",
    });
  }
};

// DELETE blog by ID
export const DeleteBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BLOG_REQUEST });

    await axiosInstance.delete(`/deleteBlog/${id}`);

    dispatch({ type: DELETE_BLOG_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_BLOG_FAIL,
      payload:
        error.response?.data?.message || 
        error.message || 
        "Failed to delete blog",
    });
  }
};

export const ToggleLike = (blogId, userId) => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_LIKE_REQUEST });

    const { data } = await axiosInstance.put(`/like/${blogId}/${userId}`);

    dispatch({
      type: TOGGLE_LIKE_SUCCESS,
      payload: {
        blogId,
        likeCount: data.likeCount,
        isLiked: data.isLiked,
      },
    });
  } catch (error) {
    dispatch({
      type: TOGGLE_LIKE_FAIL,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to toggle like",
    });
  }
};