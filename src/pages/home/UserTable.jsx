import React, { useEffect } from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { GetUser } from "../../redux/actions/UserAction";

const UserTable = ({ onEdit, onDelete }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetUser());
  }, [dispatch]);
  const { loading, error, user } = useSelector((state) => state.userList);



  console.log("userInfo: ", user);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role ID</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-2">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="6" className="text-center py-2 text-red-500">
                {error}
              </td>
            </tr>
          ) : user?.length > 0 ? (
            user.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{u.firstname}</td>
                <td className="py-2 px-4 border-b">{u.lastname}</td>
                <td className="py-2 px-4 border-b">{u.username}</td>
                <td className="py-2 px-4 border-b">{u.email}</td>
                <td className="py-2 px-4 border-b">{u.roleId}</td>
                <td className="py-2 px-4 border-b text-center flex justify-center gap-3">
                  <PencilAltIcon
                    className="h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-700"
                    onClick={() => onEdit(u)}
                  />
                  <TrashIcon
                    className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => onDelete(u)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-2">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
