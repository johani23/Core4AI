import React from "react";

const AIContentCoach = ({ tips }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-xl mt-4">
      <h2 className="text-lg font-bold mb-2">AI Content Coach ðŸ¤–</h2>
      {tips && tips.length > 0 ? (
        <ul className="list-disc pl-5">
          {tips.map((tip, idx) => (
            <li key={idx} className="mb-1">{tip}</li>
          ))}
        </ul>
      ) : (
        <p>No tips yet. Click â€œGet AI Tipsâ€ to start.</p>
      )}
    </div>
  );
};

export default AIContentCoach;
