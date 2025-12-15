// ðŸ’Ž ChooseTribe â€“ Onboarding Tribe Selection
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_BASE = "http://127.0.0.1:8000";

export default function ChooseTribe() {
  const [tribes, setTribes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  async function loadTribes() {
    try {
      const res = await fetch(`${API_BASE}/market/tribes`);
      const data = await res.json();
      setTribes(data);
    } catch (err) {
      console.error("Error loading tribes:", err);
    } finally {
      setLoading(false);
    }
  }

  async function assignTribe(tribeName) {
    setSubmitting(true);
    try {
      await fetch(`${API_BASE}/user/1/assign_tribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tribe_name: tribeName }),
      });
      localStorage.setItem("user_tribe", tribeName);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Assign tribe error:", err);
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    loadTribes();
  }, []);

  if (loading)
    return <p className="text-center text-gray-400 mt-10 animate-pulse">Loading tribesâ€¦</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto text-center space-y-8">
      <h1 className="text-3xl font-bold">ðŸŒˆ Choose Your Tribe</h1>
      <p className="text-gray-400">Select a tribe to begin your Core4.AI journey.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tribes.map((tribe, index) => (
          <motion.div
            key={tribe.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelected(tribe.name)}
            className={`cursor-pointer border rounded-xl p-5 transition ${
              selected === tribe.name
                ? "border-cyan-500 bg-gray-900/80 shadow-cyan-500/40"
                : "border-gray-800 bg-gray-900/50 hover:border-gray-600"
            }`}
          >
            <div className="text-4xl mb-2">{tribe.badge}</div>
            <h3 className="text-xl font-semibold">{tribe.name}</h3>
            <p className="text-sm text-gray-400 mt-1">ðŸ‘¥ {tribe.total_members}</p>
            <p className="text-xs text-gray-500 mt-1">
              ðŸ’° {tribe.pool_balance.toFixed(2)} C4T
            </p>
          </motion.div>
        ))}
      </div>
      {selected && (
        <div className="mt-8">
          <p className="mb-3 text-gray-300">
            You selected <span className="text-cyan-400 font-semibold">{selected}</span>
          </p>
          <button
            onClick={() => assignTribe(selected)}
            disabled={submitting}
            className={`px-6 py-2 rounded-lg font-semibold text-white ${
              submitting ? "bg-gray-600" : "bg-cyan-600 hover:bg-cyan-700"
            }`}
          >
            {submitting ? "Joining..." : "Join Tribe"}
          </button>
        </div>
      )}
    </div>
  );
}
