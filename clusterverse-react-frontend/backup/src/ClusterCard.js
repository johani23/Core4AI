// src/ClusterCard.js
import React, { useState } from "react";

export default function ClusterCard({ name, description, members }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        padding: "12px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        minHeight: "170px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "6px" }}>
          ðŸ™ï¸ {name}
        </h2>
        <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "10px" }}>
          {description}
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#6b7280" }}>ðŸ‘¥ {members} members</span>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: "6px 10px",
            fontSize: "12px",
            background: "#4f46e5",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Enter
        </button>
      </div>

      {/* Popup / Modal */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
              {name}
            </h2>
            <p style={{ fontSize: "14px", color: "#374151", marginBottom: "12px" }}>
              {description}
            </p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "20px" }}>
              ðŸ‘¥ Members in this ring: {members}
            </p>

            <button
              onClick={() => setOpen(false)}
              style={{
                padding: "8px 14px",
                background: "#ef4444",
                color: "white",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
