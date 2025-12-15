// src/HallofFame.js
import React, { useEffect, useState } from "react";
import { getLeaderboard } from "./teamsApi"; // âœ… fixed path

export default function HallofFame() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getLeaderboard();
      if (data) setUsers(data.slice(0, 5)); // top 5 only
    }
    fetchData();
  }, []);

  const getMedal = (index) => {
    if (index === 0) return "ðŸ¥‡";
    if (index === 1) return "ðŸ¥ˆ";
    if (index === 2) return "ðŸ¥‰";
    return "â­";
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">
        ðŸ† Hall of Fame
      </h2>
      <ul className="space-y-3">
        {users.map((user, index) => (
          <li
            key={user.username}
            className="flex items-center justify-between bg-gray-800 px-4 py-3 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getMedal(index)}</span>
              <div>
                <p className="font-semibold text-white">{user.username}</p>
                <p className="text-sm text-gray-400">{user.points} pts</p>
              </div>
            </div>
            <span className="text-orange-400 font-bold">
              ðŸ”¥ {user.streak || 0}d
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
