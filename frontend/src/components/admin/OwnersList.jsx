import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OwnersList = () => {
  const [owners, setOwners] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOwners = async () => {
      const url = query
        ? `/api/admin/owners/search?name=${query}`
        : "/api/admin/owners";
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch: ${res.status} - ${errorText}`);
      }
      const data = await res.json();
      setOwners(data);
    };

    fetchOwners();
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search owners..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <ul className="space-y-2">
        {owners.map((owner) => (
          <li
            key={owner._id}
            className="p-2 border rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => navigate(`/admin/owner/${owner._id}`)}
          >
            {owner.name} - {owner.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnersList;
