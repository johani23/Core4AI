import React from "react";

export default function ProfileCard({ points }) {
  const nextLevel = Math.ceil((points + 1) / 50) * 50; // Ã™Æ’Ã™â€ž 50 Ã™â€ Ã™â€šÃ˜Â·Ã˜Â© Ã™â€¦Ã˜Â³Ã˜ÂªÃ™Ë†Ã™â€°
  const progress = Math.min((points / nextLevel) * 100, 100);

  const getStage = (pts) => {
    if (pts < 50) return "Seeker";
    if (pts < 100) return "Explorer";
    if (pts < 150) return "Pathfinder";
    if (pts < 200) return "Master";
    return "Grandmaster";
  };

  const stage = getStage(points);

  return (
    <div style={{ padding: "12px", background: "white", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
      <h2>Ã°Å¸â€Â Profile Overview</h2>
      <p><strong>Stage / Ring:</strong> {stage}</p>
      <p><strong>Accumulated Points:</strong> {points}</p>

      <div style={{
        background: "#e5e7eb",
        borderRadius: "6px",
        height: "14px",
        marginTop: "6px",
        overflow: "hidden"
      }}>
        <div style={{
          width: `${progress}%`,
          height: "100%",
          borderRadius: "6px",
          background: progress >= 100 ? "#16a34a" : "#4f46e5",
          transition: "width 0.4s ease-in-out"
        }}></div>
      </div>

      <p style={{ fontSize: "12px", marginTop: "4px" }}>
        {progress.toFixed(1)}% toward {nextLevel} points
      </p>
    </div>
  );
}

