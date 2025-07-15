import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const url = query
        ? `/api/admin/users/search?name=${query}`
        : "/api/admin/users";

      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch: ${res.status} - ${errorText}`);
      }
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user._id}
            className="p-2 border rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => navigate(`/admin/user/${user._id}`)}
          >
            {user.name} - {user.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
