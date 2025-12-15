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
      <h2 className="text-2xl font-bold mb-4">Ã°Å¸â€™Å¾ Matching</h2>
      {!userCluster ? (
        <p className="text-gray-500">Ã¢Å¡Â Ã¯Â¸Â Ã˜Â§Ã™â€žÃ˜Â±Ã˜Â¬Ã˜Â§Ã˜Â¡ Ã˜Â¥Ã™Æ’Ã™â€¦Ã˜Â§Ã™â€ž Ã˜Â§Ã™â€žÃ™Æ’Ã™Ë†Ã™Å Ã˜Â² Ã™â€žÃ˜ÂªÃ˜Â­Ã˜Â¯Ã™Å Ã˜Â¯ Ã™Æ’Ã™â€žÃ˜Â³Ã˜ÂªÃ˜Â±Ã™Æ’ Ã˜Â£Ã™Ë†Ã™â€žÃ˜Â§Ã™â€¹.</p>
      ) : matches.length === 0 ? (
        <p className="text-gray-500">Ã™â€žÃ˜Â§ Ã™Å Ã™Ë†Ã˜Â¬Ã˜Â¯ Ã˜ÂªÃ˜Â·Ã˜Â§Ã˜Â¨Ã™â€šÃ˜Â§Ã˜Âª Ã˜Â­Ã˜Â§Ã™â€žÃ™Å Ã˜Â§Ã™â€¹.</p>
      ) : (
        <ul className="space-y-3">
          {matches.map((m) => (
            <li key={m.id} className="border p-3 rounded">
              <p className="font-semibold">{m.name}</p>
              <p className="text-sm text-gray-600">
                Ã˜Â§Ã™â€žÃ˜ÂªÃ™Ë†Ã˜Â§Ã™ÂÃ™â€š: {m.compatibility}% Ã°Å¸Å½Â¯
              </p>
              <p className="text-xs text-gray-400">{m.reason}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

