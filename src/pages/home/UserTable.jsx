import React, { useEffect } from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { GetUser, DeleteUser } from "../../redux/actions/UserAction";

const UserTable = ({ onEdit }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetUser());
  }, [dispatch]);

  const { loading, error, users } = useSelector((state) => state.userList);

  const handleDelete = async (user) => {
    await dispatch(DeleteUser(user._id));
    dispatch(GetUser());
  };

  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">First Name</th>
              <th className="py-2 px-4 border-b">Last Name</th>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b text-center w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-2">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="text-center py-2 text-red-500">{error}</td>
              </tr>
            ) : users?.length > 0 ? (
              users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{u.firstname}</td>
                  <td className="py-2 px-4 border-b">{u.lastname}</td>
                  <td className="py-2 px-4 border-b">{u.username}</td>
                  <td className="py-2 px-4 border-b">{u.email}</td>
                  <td className="py-2 px-4 border-b text-center w-24">
                    <div className="flex justify-center gap-3">
                      <PencilAltIcon
                        className="h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-700"
                        onClick={() => onEdit(u)}
                      />
                      <TrashIcon
                        className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleDelete(u)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-2">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : users?.length > 0 ? (
          users.map((u) => (
            <div key={u._id} className="border rounded-lg p-4 shadow-sm bg-white">
              <p><span className="font-semibold">First Name:</span> {u.firstname}</p>
              <p><span className="font-semibold">Last Name:</span> {u.lastname}</p>
              <p><span className="font-semibold">Username:</span> {u.username}</p>
              <p><span className="font-semibold">Email:</span> {u.email}</p>
              <div className="flex justify-end gap-4 mt-3">
                <PencilAltIcon
                  className="h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-700"
                  onClick={() => onEdit(u)}
                />
                <TrashIcon
                  className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleDelete(u)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No users found</p>
        )}
      </div>
    </div>
  );
};

export default UserTable;
