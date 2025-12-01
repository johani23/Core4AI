import React, { useEffect, useState } from "react";

export default function MiniLeaderboard({ userPoints }) {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    // 🔗 جلب بيانات من الـ backend لاحقًا
    fetch("http://127.0.0.1:8000/leaderboard")
      .then((res) => res.json())
      .then((data) => setLeaders(data))
      .catch(() => {
        // بيانات تجريبية في حال ما فيه Backend
        setLeaders([
          { user: "Ahmed", points: 120 },
          { user: "Sara", points: 95 },
          { user: "Ali", points: 75 },
        ]);
      });
  }, []);

  return (
    <div>
      <h3>🏆 Leaderboard</h3>
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
        <strong>✨ You:</strong> {userPoints} pts
      </div>
    </div>
  );
}
