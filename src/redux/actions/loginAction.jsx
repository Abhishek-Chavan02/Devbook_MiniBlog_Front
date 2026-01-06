import Swal from "sweetalert2";
import axiosInstance from "../../app/axiosIntance";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  OTP_SEND_REQUEST,
  OTP_SEND_SUCCESS,
  OTP_SEND_FAIL,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
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

export const sendOtpFunc = (formData) => async (dispatch) => {
  try {
    dispatch({ type: OTP_SEND_REQUEST });

    const response = await axiosInstance.post("/sendOtp", {
      mobile_no: formData.mobile_no
    });

    if (response?.data?.otpToken) {
      localStorage.setItem("otpToken", response.data.otpToken);
    }

    dispatch({
      type: OTP_SEND_SUCCESS,
      payload: response.data,
    });

    Swal.fire({
      icon: "success",
      title: "OTP Sent!",
      text: `OTP sent to ${formData.mobile_no}`,
      timer: 2000,
      showConfirmButton: false,
    });

    return response.data;

  } catch (err) {
    dispatch({
      type: OTP_SEND_FAIL,
      payload: err.response?.data?.message || "Failed to send OTP",
    });
  }
};

export const verifyOtpfunc = (formData, navigate) => async (dispatch) => {
  console.log('formData: ', formData);

  try {
    dispatch({ type: VERIFY_OTP_REQUEST });

    const response = await axiosInstance.post("/validateOtp", {
      otpToken: formData.otpToken,
      userOtp: formData.otp,
    });

    dispatch({
      type: VERIFY_OTP_SUCCESS,
      payload: response.data,
    });

    // Store token & user
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userInfo", JSON.stringify(response.data.user));

    // Success Alert + Redirect
    Swal.fire({
      icon: "success",
      title: "Login Successful!",
      text: `Welcome back, ${response.data.user.name || "User"}!`,
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      navigate("/home", { replace: true });
    });

  } catch (err) {
    dispatch({
      type: VERIFY_OTP_FAIL,
      payload: err.response?.data?.message || "OTP Verification Failed",
    });

    // Failure Alert
    Swal.fire({
      icon: "error",
      title: "Invalid OTP",
      text: "Please enter the correct OTP and try again.",
      timer: 2000,
      showConfirmButton: false,
    });
  }
};


