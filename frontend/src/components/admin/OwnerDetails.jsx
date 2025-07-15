import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OwnerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await fetch(`/api/admin/owner/${id}`, {
          credentials: "include",
        });

        if (!res.ok) {
          console.error("Failed to fetch owner:", res.status);
          return;
        }

        const data = await res.json();
        setOwner(data);
      } catch (err) {
        console.error("Error fetching owner:", err.message);
      }
    };

    fetchOwner();
  }, [id]);

  const deleteOwner = async () => {
    if (!window.confirm("Are you sure you want to delete this owner?")) return;
    const res = await fetch(`/api/admin/owner/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      navigate("/admin");
    }
  };

  return (
    <div>
      {owner && (
        <div className="space-y-2">
          <h2 className="text-xl font-bold">{owner.name}</h2>
          <p>Email: {owner.email}</p>
          <p>Phone: {owner.phone}</p>
          <p>Address: {owner.address}</p>
          <p>Role: {owner.role}</p>
          <button
            onClick={deleteOwner}
            className="bg-red-500 text-white p-2 rounded"
          >
            Delete Owner
          </button>
        </div>
      )}
    </div>
  );
};

export default OwnerDetails;
