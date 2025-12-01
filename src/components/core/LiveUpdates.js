import React, { useEffect, useState } from "react";

function LiveUpdates() {
  const [updates] = useState([
    "Ahmed shared a reflection note 📝",
    "Mona earned 10 points 🎉",
    "Ali joined the Harmony Circle 🎶",
    "Sara reached the Illumination Circle ✨",
  ]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % updates.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [updates.length]);

  return (
    <div className="bg-yellow-100 border border-yellow-300 rounded p-3 mb-4 shadow-md transition-all duration-500 animate-pulse">
      <p className="text-sm font-medium text-yellow-900">
        <span className="font-bold">🔔 Live Updates:</span> {updates[current]}
      </p>
    </div>
  );
}

export default LiveUpdates;
