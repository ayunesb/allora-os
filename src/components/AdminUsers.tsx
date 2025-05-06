import React, { useEffect, useState } from "react";
import { User } from "../types";

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users from API or other source
    const fetchedUsers: User[] = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ];
    setUsers(fetchedUsers);
  }, []);

  return (
    <div>
      <h1>Admin Users</h1>
      {users.map((user, index) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default AdminUsers;
