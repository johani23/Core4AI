import React, { useEffect, useState } from "react";

export default function LiveFeed() {
  const [updates] = useState([
    "✨ Noor just earned +10 points for posting",
    "💡 Ahmed shared a reflection note",
    "🎉 Sara received 3 likes on her update",
    "🔥 Ali completed today's challenge (+20)",
  ]);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % updates.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [updates.length]);

  return (
    <div className="bg-yellow-100 border border-yellow-300 rounded-md shadow-md overflow-hidden">
      <div className="bg-yellow-200 px-3 py-1 font-semibold text-yellow-900 flex items-center gap-2">
        📰 Live Updates
      </div>
      <div className="whitespace-nowrap overflow-hidden">
        <p
          key={current}
          className="inline-block px-4 py-2 animate-marquee text-gray-800"
        >
          {updates[current]}
        </p>
      </div>
    </div>
  );
}
