// ============================================================
// ðŸ’Ž CouncilDreams.jsx â€“ MVP-82.7 â€œDream Layerâ€
// ------------------------------------------------------------
// Shows generated dream narratives from the Council
// ============================================================

import React, { useEffect, useState } from "react";

export default function CouncilDreams() {
  const [dreams, setDreams] = useState([]);

  useEffect(() => {
    const fetchDreams = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/council/dreams");
      const data = await res.json();
      setDreams(data.dreams || []);
    };
    fetchDreams();
    const interval = setInterval(fetchDreams, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-2xl text-purple-400 font-bold mb-6">
        ðŸŒ™ Council Dream Archive
      </h1>
      {dreams.slice().reverse().map((d, i) => (
        <div key={i}
          className="mb-4 p-4 rounded-lg bg-gray-900/70 border border-purple-400/40">
          <div className="text-lg font-semibold text-purple-300 mb-1">
            {d.title}
          </div>
          <div className="text-xs text-gray-400 mb-2">
            {new Date(d.time).toLocaleString()}
          </div>
          <div className="text-gray-100 whitespace-pre-line">
            {d.content}
          </div>
        </div>
      ))}
    </div>
  );
}
