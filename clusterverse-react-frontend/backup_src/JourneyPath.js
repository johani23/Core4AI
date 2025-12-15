import React from "react";

export default function JourneyPath({ points }) {
  const milestones = [
    { percent: 0, label: "Seeker" },
    { percent: 25, label: "Explorer" },
    { percent: 50, label: "Connector" },
    { percent: 75, label: "Illuminator" },
    { percent: 100, label: "Master" },
  ];

  const progress = Math.min(points, 100);

  return (
    <div
      style={{
        margin: "16px auto",
        padding: "12px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "800px",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "8px" }}>
        ðŸš€ Your Journey Progress
      </h3>

      <div
        style={{
          position: "relative",
          height: "50px",
          background: "#f3f4f6",
          borderRadius: "25px",
          overflow: "hidden",
        }}
      >
        {/* Progress fill */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #4f46e5, #06b6d4)",
            transition: "width 0.6s ease",
          }}
        />

        {/* Milestones */}
        {milestones.map((m, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${m.percent}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: progress >= m.percent ? "#facc15" : "#9ca3af",
                boxShadow:
                  progress >= m.percent
                    ? "0 0 12px #facc15, 0 0 24px #f59e0b"
                    : "none",
                margin: "0 auto",
                transition: "all 0.3s ease",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                marginTop: "4px",
                display: "block",
                color: progress >= m.percent ? "#111" : "#6b7280",
                fontWeight: progress >= m.percent ? "bold" : "normal",
              }}
            >
              {m.label}
            </span>
          </div>
        ))}

        {/* Rocket */}
        <div
          style={{
            position: "absolute",
            left: `${progress}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            transition: "left 0.6s ease",
            fontSize: "22px",
            animation: "bounce 1s ease infinite",
          }}
        >
          ðŸš€
        </div>
      </div>

      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translate(-50%, -50%) translateY(0); }
            50% { transform: translate(-50%, -50%) translateY(-8px); }
          }
        `}
      </style>
    </div>
  );
}
