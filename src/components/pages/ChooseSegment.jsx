// ============================================================================
// 💎 Core4.AI – ChooseSegment.jsx (Role Selection v3 – Onboarding Integrated)
// ============================================================================

import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChooseSegment() {
  const navigate = useNavigate();

  const roles = [
    { id: "creator", label: "Creator", emoji: "🎨" },
    { id: "buyer", label: "Buyer", emoji: "🛒" },
    { id: "merchant", label: "Merchant", emoji: "🏪" },
  ];

  const handleSelect = (role) => {
    localStorage.setItem("userRole", role);

    // 🚀 Send user to the FIRST onboarding step
    navigate("/onboarding/identity");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">
        Choose Your Role
      </h1>

      <p className="text-gray-300 mb-8 text-center max-w-lg">
        Select how you want to explore the Core4.AI ecosystem.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        {roles.map((r) => (
          <button
            key={r.id}
            onClick={() => handleSelect(r.id)}
            className="border border-gray-700 bg-gray-900 p-6 rounded-xl shadow hover:border-purple-500 hover:bg-gray-800 transition flex flex-col items-center"
          >
            <div className="text-4xl mb-2">{r.emoji}</div>
            <div className="text-xl font-semibold">{r.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
