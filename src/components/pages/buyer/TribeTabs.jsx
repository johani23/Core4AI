import React, { useState } from "react";

const TRIBES = [
  "All",
  "Techy Tribe",
  "Adventurers",
  "EventGoers",
  "Fashionists",
  "Foodies",
];

export default function TribeTabs({ onChange }) {
  const [active, setActive] = useState("All");

  const handleClick = (t) => {
    setActive(t);
    onChange(t);
  };

  return (
    <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar" dir="rtl">
      {TRIBES.map((t) => (
        <button
          key={t}
          onClick={() => handleClick(t)}
          className={`px-4 py-1.5 rounded-full text-sm transition-all whitespace-nowrap
            ${
              active === t
                ? "bg-purple-600 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

