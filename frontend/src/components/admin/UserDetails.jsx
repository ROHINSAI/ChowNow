// UserDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/admin/user/${id}`, {
        credentials: "include",
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch: ${res.status} - ${errorText}`);
      }
      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, [id]);

  const deleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const res = await fetch(`/api/admin/user/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      navigate("/admin");
    }
  };

  return (
    <div>
      {user && (
        <div className="space-y-2">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Address: {user.address}</p>
          <p>Role: {user.role}</p>
          <button
            onClick={deleteUser}
            className="bg-red-500 text-white p-2 rounded"
          >
            Delete User
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
