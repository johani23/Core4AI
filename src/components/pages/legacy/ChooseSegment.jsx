// ============================================================
// ðŸ’Ž Core4.AI â€“ ChooseSegment.jsx (MVP-30.9 Stable Edition)
// ------------------------------------------------------------
// âœ… Integrated with backend (/user/{id}/assign_segment)
// âœ… Saves user_segment to localStorage
// âœ… Redirects to /dashboard automatically
// ============================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChooseSegment() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const segments = [
    { id: 1, name: "Vibe Makers", members: 84, trend: "UP" },
    { id: 2, name: "Adventurers", members: 77, trend: "STEADY" },
    { id: 3, name: "Techies", members: 90, trend: "UP" },
    { id: 4, name: "Rising Icons", members: 68, trend: "DOWN" },
  ];

  // ------------------------------------------------------------
  // ðŸ“¡ Join selected segment
  // ------------------------------------------------------------
  const joinSegment = async () => {
    if (!selected) return alert("Please choose a segment first!");
    setLoading(true);
    setMessage("");

    try {
      // mock backend call
      const res = await fetch("http://127.0.0.1:8000/user/1/assign_segment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ segment: selected }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // âœ… Save locally
      localStorage.setItem("user_segment", selected);
      setMessage(`ðŸŽ‰ You joined ${selected}!`);

      // Small delay for UX
      setTimeout(() => navigate("/dashboard", { replace: true }), 1200);
    } catch (err) {
      console.error("Join failed:", err);
      alert("âš ï¸ Unable to join segment. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">
          ðŸŒˆ Choose Your Segment
        </h1>
        <p className="text-gray-400">
          Select a Core4 segment to begin your journey.
        </p>
      </div>

      {/* Segments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {segments.map((seg) => (
          <div
            key={seg.id}
            onClick={() => setSelected(seg.name)}
            className={`cursor-pointer p-6 rounded-2xl border transition-all ${
              selected === seg.name
                ? "border-yellow-400 bg-yellow-900/20"
                : "border-gray-800 bg-gray-900 hover:border-gray-600"
            }`}
          >
            <h2 className="text-lg font-semibold text-center mb-2">
              {seg.name}
            </h2>
            <p className="text-sm text-gray-400 text-center">
              ðŸ‘¥ {seg.members} | Trend: {seg.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <button
        onClick={joinSegment}
        disabled={loading}
        className={`px-8 py-3 rounded-xl font-semibold transition-all ${
          loading
            ? "bg-yellow-700 text-gray-900 cursor-not-allowed"
            : "bg-yellow-400 text-black hover:bg-yellow-300"
        }`}
      >
        {loading ? "Joining..." : "Join Segment"}
      </button>

      {/* Message */}
      {message && (
        <p className="mt-6 text-yellow-400 font-medium text-center animate-pulse">
          {message}
        </p>
      )}

      {/* Selected status */}
      {selected && !message && (
        <p className="mt-4 text-gray-400 text-sm">
          You selected <span className="text-yellow-400">{selected}</span>
        </p>
      )}
    </div>
  );
}
