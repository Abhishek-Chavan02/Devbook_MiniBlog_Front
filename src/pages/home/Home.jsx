import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_LOGOUT } from "../../redux/constant"; // make sure you have this constant

const Home = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear Redux state
    dispatch({ type: USER_LOGOUT });

    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");

    // Redirect to login
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {userInfo && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>First Name:</strong> {userInfo.firstname}</p>
          <p><strong>Last Name:</strong> {userInfo.lastname}</p>
          <p><strong>Username:</strong> {userInfo.username}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Role:</strong> {userInfo.role}</p>
          <p><strong>Role ID:</strong> {userInfo.roleId}</p>
          <p><strong>Created At:</strong> {new Date(userInfo.createdAt).toLocaleString()}</p>

          <button
            onClick={handleLogout}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
