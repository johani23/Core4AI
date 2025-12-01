import React, { useEffect, useState } from "react";
import { syncMarketData, getMoodColor } from "@data/dataSync";

/**
 * 👤 Profile – MVP-24.9
 * Shows personal dopamine & market insight snapshot.
 */
export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadData() {
      const data = await syncMarketData(1);
      setProfile(data);
    }
    loadData();
  }, []);

  if (!profile)
    return <div className="p-6 min-h-screen text-gray-400">Loading profile...</div>;

  return (
    <div className="p-6 min-h-screen text-white">
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">👤 Creator Snapshot</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Wallet */}
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
          <h3 className="font-semibold">Wallet Balance</h3>
          <p className="text-gray-300">{profile.wallet.balance} C4T</p>
          <p className="text-sm text-indigo-400">Dopamine: {profile.wallet.dopamine} ⚡</p>
        </div>

        {/* Mood */}
        <div
          className="bg-gray-900 p-4 rounded-xl border border-gray-800"
          style={{ borderColor: getMoodColor(profile.mood.mood) }}
        >
          <h3 className="font-semibold">Market Mood</h3>
          <p className="text-xl">{profile.mood.emoji} {profile.mood.label}</p>
          <p className="text-sm text-gray-400">EMI Score: {profile.mood.emi.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
}
