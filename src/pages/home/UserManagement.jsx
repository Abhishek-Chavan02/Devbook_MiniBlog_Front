import React, { useState, useEffect } from "react";
import UserTable from "./UserTable";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Example static data — replace with API call
    setUsers([
      {
        firstname: "John",
        lastname: "Doe",
        username: "john123",
        email: "john@example.com",
        role: "Admin",
        roleId: "R001",
      },
      {
        firstname: "Jane",
        lastname: "Smith",
        username: "jane456",
        email: "jane@example.com",
        role: "User",
        roleId: "R002",
      },
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <UserTable users={users} />
    </div>
  );
};

export default UserManagement;
