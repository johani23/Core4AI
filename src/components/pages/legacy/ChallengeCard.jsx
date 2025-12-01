// src/components/ChallengeCard.jsx
import React from "react";

const ChallengeCard = ({ challenge }) => {
  const progress = challenge.progress || 0;

  return (
    <div className="border p-4 rounded-2xl shadow-md bg-white mb-4">
      <h3 className="text-lg font-bold">{challenge.title}</h3>
      <p className="text-gray-700">{challenge.description}</p>

      <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
        <div
          className="bg-blue-500 h-3 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        {progress}% complete
      </p>
    </div>
  );
};

export default ChallengeCard;
