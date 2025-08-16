import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UpdateUser, GetUserById } from "../../redux/actions/UserAction";

const Profile = () => {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const { singleUser } = useSelector((state) => state.userList);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    if (userInfo?.id) {
      dispatch(GetUserById(userInfo.id));
    }
  }, [dispatch, userInfo?.id]);

  useEffect(() => {
    if (singleUser) {
      setFormData({
        firstname: singleUser.user.firstname,
        lastname: singleUser.user.lastname,
        username: singleUser.user.username,
        email: singleUser.user.email,
      });
    }
  }, [singleUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo?.id) return;

    await dispatch(UpdateUser(userInfo.id, formData));
    await dispatch(GetUserById(userInfo.id));
    setIsEditing(false);
  };

  return (
    <div className="p-6 flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg relative">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {singleUser?.user?.firstname?.[0]}
            {singleUser?.user?.lastname?.[0]}
          </div>
          <h1 className="text-2xl font-bold mt-4">
            {singleUser?.user?.firstname} {singleUser?.user?.lastname}
          </h1>
          <p className="text-gray-500">@{singleUser?.user?.username}</p>
        </div>

        {/* Profile Details */}
        <div className="mt-6 space-y-3 text-gray-700">
          <p className="flex justify-between border-b pb-2">
            <span className="font-semibold">First Name:</span>
            {singleUser?.user?.firstname}
          </p>
          <p className="flex justify-between border-b pb-2">
            <span className="font-semibold">Last Name:</span>
            {singleUser?.user?.lastname}
          </p>
          <p className="flex justify-between border-b pb-2">
            <span className="font-semibold">Username:</span>
            {singleUser?.user?.username}
          </p>
          <p className="flex justify-between">
            <span className="font-semibold">Email:</span>
            {singleUser?.user?.email}
          </p>
        </div>

        {/* Edit Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow hover:scale-105 transform transition duration-200"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-96 animate-fadeIn">
            <h3 className="text-lg font-semibold mb-4 text-center">Edit Profile</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded hover:scale-105 transform transition duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
