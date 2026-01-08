import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  sendOtpFunc,
  verifyOtpfunc,
} from "../../redux/actions/loginAction";
import { useNavigate, Link } from "react-router-dom";
import { USER_SIGNUP_RESET } from "../../redux/constant";
import Swal from "sweetalert2";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [withOtp, setWithOtp] = useState(false);
  const [otpTimer, setOtpTimer] = useState(300);
  const [timeStarted, setTimeStarted] = useState(false);

  const { loading, error, userInfo } = useSelector((state) => state.userLogin);
  const {
    otpData,
  } = useSelector((state) => state.sendOtp);
  console.log(otpData?.otpToken);


  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobile_no: "",
    otp: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };
  const validateOtpForm = () => {
    const newErrors = {};
    if (!formData.mobile_no.trim()) {
      newErrors.mobile_no = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile_no)) {
      newErrors.mobile_no = "Invalid mobile number";
    }
    return newErrors;
  };

  const handleLogin = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(login(formData));
  };

 const handleOtpLogin = () => {
  const otpValue = formData.otp.trim();
  const otpTokenValue = localStorage.getItem("otpToken");
  dispatch(
    verifyOtpfunc(  { otp: otpValue, otpToken: otpTokenValue }, navigate )
  );
};


const sendOtp = async () => {
  const validationErrors = validateOtpForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  startOtpTimer();

   await dispatch(sendOtpFunc(formData));

  if (otpData && otpData?.otpToken) {
    localStorage.setItem("otpToken", otpData?.otpToken);
  }
};


  useEffect(() => {
    if (userInfo) {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${userInfo.name || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/home", { replace: true });
      });
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch({ type: USER_SIGNUP_RESET });
  }, [dispatch]);

  // Show SweetAlert for wrong credentials
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error === "Wrong credentials" ? "Wrong credentials" : error,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }, [error]);

  const startOtpTimer = () => {
    setTimeStarted(true);
    setOtpTimer(300);

    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeStarted(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email */}
        {/* Email & Password or OTP Inputs */}
        {withOtp ? (
          <>
            <input
              type="tel"
              name="mobile_no"
              placeholder="Mobile Number"
              value={formData.mobile_no}
              onChange={handleChange}
              className={`border p-2 rounded w-full mb-1 focus:outline-none focus:ring-2 ${
                errors.mobile_no
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.mobile_no && (
              <p className="text-red-500 text-sm mb-2">{errors.mobile_no}</p>
            )}

            <input
              type="number"
              name="otp"
              placeholder="Otp"
              value={formData.otp}
              onChange={handleChange}
              className={`border p-2 rounded w-full mb-1 focus:outline-none focus:ring-2 ${
                errors.otp
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mb-2">{errors.otp}</p>
            )}
            {timeStarted && otpTimer > 0 && (
              <p className="text-center text-sm text-gray-700 mt-2">
                OTP expires in: <span className="font-bold">{otpTimer}s</span>
              </p>
            )}

            {timeStarted && otpTimer === 0 && (
              <p className="text-center text-sm text-red-600 mt-2 font-semibold">
                OTP expired! Please resend OTP.
              </p>
            )}
          </>
        ) : (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`border p-2 rounded w-full mb-1 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-2">{errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`border p-2 rounded w-full mb-1 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mb-2">{errors.password}</p>
            )}
          </>
        )}

        {withOtp && (
          <button
            onClick={sendOtp}
            disabled={timeStarted}
            className={`w-full py-2 rounded text-white font-semibold mt-2 ${
              timeStarted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          >
            Send OTP
          </button>
        )}

        <button
          onClick={withOtp ? handleOtpLogin : handleLogin}
          disabled={loading}
          className={`w-full py-2 rounded text-white font-semibold mt-2 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {withOtp ? (
          <>
            <p className="text-center mt-4 text-gray-600">
              Login with password{" "}
              <button
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => setWithOtp(false)}
              >
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <p className="text-center mt-4 text-gray-600">
            Login with OTP{" "}
            <button
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => setWithOtp(true)}
            >
              Sign Up
            </button>
          </p>
        )}

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
