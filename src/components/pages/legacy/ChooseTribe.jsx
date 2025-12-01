// ============================================================
// ðŸ’Ž Core4.AI â€“ ChooseTribe.jsx (MVP-27.6 Stable Edition)
// ------------------------------------------------------------
// Lets the user select a tribe (ðŸŒ¸ðŸ”¥âš¡ðŸ’«) safely and elegantly.
// Fully compatible with backend endpoints:
//   GET  /market/tribes
//   POST /user/1/assign_tribe
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getUserTribe, assignUserTribe } from "@services/api";
import { useNavigate } from "react-router-dom";

export default function ChooseTribe() {
  const [tribes, setTribes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load available tribes
  useEffect(() => {
    async function loadTribes() {
      try {
        const res = await fetch("http://127.0.0.1:8000/market/tribes");
        if (!res.ok) throw new Error("Failed to load tribes");
        const data = await res.json();
        if (Array.isArray(data)) setTribes(data);
        else setTribes([]); // fallback safety
      } catch (err) {
        console.error(âš ï¸ Tribe fetch error:", err);
        setError("Unable to load tribes. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    loadTribes();
  }, []);

  // Handle selection
  const handleSelect = async (tribe) => {
    try {
      setSelected(tribe.name);
      const res = await fetch(`http://127.0.0.1:8000/user/1/assign_tribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tribe_name: tribe.name }),
      });
      if (!res.ok) throw new Error("Failed to assign tribe");
      const data = await res.json();
      console.log("âœ… Tribe joined:", data);
      localStorage.setItem("user_tribe", tribe.name);
      setTimeout(() => navigate("/dashboard", { replace: true }), 800);
    } catch (err) {
      console.error("âŒ Tribe selection error:", err);
      setError("Could not join tribe. Please try again.");
    }
  };

  // ------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-yellow-400 animate-pulse">
        Loading tribesâ€¦
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-red-400">
        <p className="text-lg mb-2">âš ï¸ {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-400"
        >
          Retry
        </button>
      </div>
    );

  if (!tribes.length)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-gray-400">
        No tribes available.
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-center text-yellow-400 mb-8"
      >
        Choose Your Tribe
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {tribes.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`cursor-pointer rounded-2xl p-5 text-center border transition-all ${
              selected === t.name
                ? "border-emerald-400 bg-zinc-900"
                : "border-zinc-800 hover:border-yellow-400 bg-zinc-950"
            }`}
            onClick={() => handleSelect(t)}
          >
            <div className="text-5xl mb-3">{t.badge || "ðŸŒ"}</div>
            <h2 className="text-xl font-bold text-yellow-400 mb-2">{t.name}</h2>
            <p className="text-sm text-gray-400 mb-3">{t.description}</p>
            <p className="text-xs text-gray-500">
              Pool: {t.pool_balance?.toFixed(2) ?? 0} C4T
            </p>
            <button
              className={`mt-4 px-4 py-2 rounded-xl font-semibold ${
                selected === t.name
                  ? "bg-emerald-400 text-black"
                  : "bg-yellow-400 text-black hover:bg-yellow-300"
              }`}
            >
              {selected === t.name ? "Joined" : "Join"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
s
