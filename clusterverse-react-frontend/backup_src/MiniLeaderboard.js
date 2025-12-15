import React, { useEffect, useState } from "react";

export default function MiniLeaderboard({ userPoints }) {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    // ðŸ”— Ø¬Ù„Ø¨ Ø¨ÙŠØ§Ù†Ø§Øª Ù…Ù† Ø§Ù„Ù€ backend Ù„Ø§Ø­Ù‚Ù‹Ø§
    fetch("http://127.0.0.1:8000/leaderboard")
      .then((res) => res.json())
      .then((data) => setLeaders(data))
      .catch(() => {
        // Ø¨ÙŠØ§Ù†Ø§Øª ØªØ¬Ø±ÙŠØ¨ÙŠØ© ÙÙŠ Ø­Ø§Ù„ Ù…Ø§ ÙÙŠÙ‡ Backend
        setLeaders([
          { user: "Ahmed", points: 120 },
          { user: "Sara", points: 95 },
          { user: "Ali", points: 75 },
        ]);
      });
  }, []);

  return (
    <div>
      <h3>ðŸ† Leaderboard</h3>
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
        <strong>âœ¨ You:</strong> {userPoints} pts
      </div>
    </div>
  );
}
