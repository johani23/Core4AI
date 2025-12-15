import React, { useState, useEffect } from "react";

export default function Matching({ userCluster }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (!userCluster) return;
    fetch(`http://127.0.0.1:8000/matching?cluster=${userCluster}`)
      .then((res) => res.json())
      .then(setMatches)
      .catch(() => setMatches([]));
  }, [userCluster]);

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">ðŸ’ž Matching</h2>
      {!userCluster ? (
        <p className="text-gray-500">âš ï¸ Ø§Ù„Ø±Ø¬Ø§Ø¡ Ø¥ÙƒÙ…Ø§Ù„ Ø§Ù„ÙƒÙˆÙŠØ² Ù„ØªØ­Ø¯ÙŠØ¯ ÙƒÙ„Ø³ØªØ±Ùƒ Ø£ÙˆÙ„Ø§Ù‹.</p>
      ) : matches.length === 0 ? (
        <p className="text-gray-500">Ù„Ø§ ÙŠÙˆØ¬Ø¯ ØªØ·Ø§Ø¨Ù‚Ø§Øª Ø­Ø§Ù„ÙŠØ§Ù‹.</p>
      ) : (
        <ul className="space-y-3">
          {matches.map((m) => (
            <li key={m.id} className="border p-3 rounded">
              <p className="font-semibold">{m.name}</p>
              <p className="text-sm text-gray-600">
                Ø§Ù„ØªÙˆØ§ÙÙ‚: {m.compatibility}% ðŸŽ¯
              </p>
              <p className="text-xs text-gray-400">{m.reason}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
