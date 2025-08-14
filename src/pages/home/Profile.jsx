import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UpdateUser, GetUserById } from "../../redux/actions/UserAction";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { singleUser } = useSelector((state) => state.userList);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
  });

  // Fetch user by ID on component mount
  useEffect(() => {
    if (userInfo?.id) {
      dispatch(GetUserById(userInfo.id));
    }
  }, [dispatch, userInfo?.id]);

  // Update formData when singleUser changes
  useEffect(() => {
    if (singleUser) {
      setFormData({
        firstname: singleUser.firstname,
        lastname: singleUser.lastname,
        username: singleUser.username,
        email: singleUser.email,
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
    await dispatch(GetUserById(userInfo.id)); // refresh updated data
    setIsEditing(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>

      {/* Display profile info */}
      <div className="bg-white shadow rounded p-4 space-y-2 border">
        <p><span className="font-semibold">First Name:</span> {singleUser?.firstname}</p>
        <p><span className="font-semibold">Last Name:</span> {singleUser?.lastname}</p>
        <p><span className="font-semibold">Username:</span> {singleUser?.username}</p>
        <p><span className="font-semibold">Email:</span> {singleUser?.email}</p>
      </div>

      <button
        onClick={() => setIsEditing(true)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Edit Profile
      </button>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border p-2 rounded"
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
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
