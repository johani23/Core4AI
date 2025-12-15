import React, { useEffect, useState } from "react";

export default function Badges({ points }) {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const earned = [];
    if (points >= 10) earned.push("ðŸŒŸ Beginner");
    if (points >= 30) earned.push("ðŸ”¥ Active");
    if (points >= 50) earned.push("ðŸŽ– Explorer");
    if (points >= 100) earned.push("ðŸ† Champion");
    setBadges(earned);
  }, [points]);

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">ðŸŽ– Badges</h2>
      <p className="mb-4">Ù†Ù‚Ø§Ø·Ùƒ Ø§Ù„Ø­Ø§Ù„ÙŠØ©: {points}</p>
      <ul className="space-y-2">
        {badges.length > 0 ? (
          badges.map((b, i) => (
            <li key={i} className="border p-2 rounded bg-yellow-50">
              {b}
            </li>
          ))
        ) : (
          <p>ðŸš€ Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ø¨Ø§Ø¯Ø¬Ø§Øª Ø­ØªÙ‰ Ø§Ù„Ø¢Ù†</p>
        )}
      </ul>
    </div>
  );
}
