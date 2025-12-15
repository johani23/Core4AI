import React, { useEffect, useState } from "react";

export default function Badges({ points }) {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const earned = [];
    if (points >= 10) earned.push("Ã°Å¸Å’Å¸ Beginner");
    if (points >= 30) earned.push("Ã°Å¸â€Â¥ Active");
    if (points >= 50) earned.push("Ã°Å¸Å½â€“ Explorer");
    if (points >= 100) earned.push("Ã°Å¸Ââ€  Champion");
    setBadges(earned);
  }, [points]);

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Ã°Å¸Å½â€“ Badges</h2>
      <p className="mb-4">Ã™â€ Ã™â€šÃ˜Â§Ã˜Â·Ã™Æ’ Ã˜Â§Ã™â€žÃ˜Â­Ã˜Â§Ã™â€žÃ™Å Ã˜Â©: {points}</p>
      <ul className="space-y-2">
        {badges.length > 0 ? (
          badges.map((b, i) => (
            <li key={i} className="border p-2 rounded bg-yellow-50">
              {b}
            </li>
          ))
        ) : (
          <p>Ã°Å¸Å¡â‚¬ Ã™â€žÃ˜Â§ Ã™Å Ã™Ë†Ã˜Â¬Ã˜Â¯ Ã˜Â¨Ã˜Â§Ã˜Â¯Ã˜Â¬Ã˜Â§Ã˜Âª Ã˜Â­Ã˜ÂªÃ™â€° Ã˜Â§Ã™â€žÃ˜Â¢Ã™â€ </p>
        )}
      </ul>
    </div>
  );
}

