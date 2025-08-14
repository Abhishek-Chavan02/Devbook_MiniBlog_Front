import React, { useState } from "react";
import UserTable from "./UserTable";
import { useDispatch } from "react-redux";
import { UpdateUser, GetUser } from "../../redux/actions/UserAction";

const UserManagement = () => {
  
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
  });

  const dispatch = useDispatch();

  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setEditUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editUser?._id) return;

    await dispatch(UpdateUser(editUser._id, formData));
    await dispatch(GetUser()); // Refresh list after update
    setEditUser(null);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <UserTable onEdit={handleEdit} />

      {/* Modal */}
      {editUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>
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
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
