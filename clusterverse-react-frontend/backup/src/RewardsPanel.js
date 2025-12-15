import React from "react";

function RewardsPanel({ points }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">ðŸŽ Rewards</h2>
      <p className="text-gray-700">
        You have <span className="font-bold">{points}</span> points.
      </p>
      <ul className="mt-4 space-y-2 text-gray-600">
        <li>+5 points for posting</li>
        <li>+2 points for each like</li>
      </ul>
    </div>
  );
}

export default RewardsPanel;
