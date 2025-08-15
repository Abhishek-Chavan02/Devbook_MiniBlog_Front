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
  TOGGLE_LIKE_SUCCESS,
  TOGGLE_LIKE_FAIL,
  TOGGLE_LIKE_REQUEST,
  //   RESET_BLOG_STATE
} from '../constant';

const initialState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
  success: false,
  operation: null, // Tracks current operation ('create', 'update', 'delete')
  totalBlogs: 0, // For pagination support
  currentPage: 1,
  likeCount:0,
  isLiked:false// For pagination support
};

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create Blog Cases
    case CREATE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        operation: 'create'
      };

    case CREATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        operation: null,
        blogs: [action.payload.blog, ...state.blogs],
        totalBlogs: state.totalBlogs + 1
      };

    case CREATE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        operation: null
      };

    // Get All Blogs Cases
    case GET_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: action.payload.blogs,
        totalBlogs: action.payload.totalCount || action.payload.blogs.length,
        currentPage: action.payload.currentPage || 1
      };

    case GET_BLOGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // Get Single Blog Cases
    case GET_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
        currentBlog: null,
        error: null
      };

    case GET_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        currentBlog: action.payload.blog
      };

    case GET_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // Update Blog Cases
    case UPDATE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        operation: 'update'
      };

    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        operation: null,
        blogs: state.blogs.map(blog =>
          blog._id === action.payload._id ? action.payload : blog
        ),
        currentBlog: action.payload
      };

    case UPDATE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        operation: null
      };

    // Delete Blog Cases
    case DELETE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        operation: 'delete'
      };

    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        operation: null,
        blogs: state.blogs.filter(blog => blog._id !== action.payload),
        totalBlogs: state.totalBlogs - 1,
        currentBlog: state.currentBlog?._id === action.payload ? null : state.currentBlog
      };

    case DELETE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        operation: null
      };

    case TOGGLE_LIKE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case TOGGLE_LIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: state.blogs.map(blog =>
          blog._id === action.payload.blogId
            ? {
              ...blog,
              likeCount: action.payload.likeCount,
              isLiked: action.payload.isLiked
            }
            : blog
        ),
        currentBlog: state.currentBlog && state.currentBlog._id === action.payload.blogId
          ? {
            ...state.currentBlog,
            likeCount: action.payload.likeCount,
            isLiked: action.payload.isLiked
          }
          : state.currentBlog,
        message: action.payload.message
      };

    case TOGGLE_LIKE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};