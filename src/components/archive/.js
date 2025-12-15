import React, { useEffect, useState } from "react";
import { getSpotlight } from "../services/api";

function Spotlight() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getSpotlight();
        setUser(res);
      } catch (err) {
        console.error("Ã¢ÂÅ’ Failed to fetch spotlight", err);
      }
    }
    fetchData();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Ã°Å¸â€Â¦ Spotlight</h1>
      <div className="p-6 bg-white shadow-lg rounded-xl flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.bio}</p>
          <p className="mt-2 text-sm text-blue-600">
            Followers: {user.followers}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Spotlight;

