import React, { useEffect, useState } from "react";

export default function MiniLeaderboard({ userPoints }) {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    // Ã°Å¸â€â€” Ã˜Â¬Ã™â€žÃ˜Â¨ Ã˜Â¨Ã™Å Ã˜Â§Ã™â€ Ã˜Â§Ã˜Âª Ã™â€¦Ã™â€  Ã˜Â§Ã™â€žÃ™â‚¬ backend Ã™â€žÃ˜Â§Ã˜Â­Ã™â€šÃ™â€¹Ã˜Â§
    fetch("http://127.0.0.1:8000/leaderboard")
      .then((res) => res.json())
      .then((data) => setLeaders(data))
      .catch(() => {
        // Ã˜Â¨Ã™Å Ã˜Â§Ã™â€ Ã˜Â§Ã˜Âª Ã˜ÂªÃ˜Â¬Ã˜Â±Ã™Å Ã˜Â¨Ã™Å Ã˜Â© Ã™ÂÃ™Å  Ã˜Â­Ã˜Â§Ã™â€ž Ã™â€¦Ã˜Â§ Ã™ÂÃ™Å Ã™â€¡ Backend
        setLeaders([
          { user: "Ahmed", points: 120 },
          { user: "Sara", points: 95 },
          { user: "Ali", points: 75 },
        ]);
      });
  }, []);

  return (
    <div>
      <h3>Ã°Å¸Ââ€  Leaderboard</h3>
      <p style={{ fontSize: "12px", color: "#6b7280" }}>
        (Top users across clusters)
      </p>

      <ul style={{ marginTop: "8px", paddingLeft: "16px" }}>
        {leaders.map((l, i) => (
          <li key={i}>
            <strong>{i + 1}. {l.user}</strong> - {l.points} pts
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: "10px",
          padding: "6px",
          borderRadius: "6px",
          background: "#f3f4f6",
          fontSize: "14px",
        }}
      >
        <strong>Ã¢Å“Â¨ You:</strong> {userPoints} pts
      </div>
    </div>
  );
}

