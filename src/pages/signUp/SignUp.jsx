import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/actions/signUpAction";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.userSignup);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    dispatch(signup(formData));
  };

  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: "success",
        title: "Signup Successful!",
        text: "Redirecting to login...",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/login");
      });
    }
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error,
      });
    }
  }, [success, error, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full py-2 rounded text-white font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 transition"
          }`}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
