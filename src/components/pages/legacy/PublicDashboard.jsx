import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";

export default function PublicDashboard() {
  const { heatmap = {}, mentorBoosts = {}, levelUps = [], backendConnected } =
    useCoreSync();

  const [tribeList, setTribeList] = useState([]);

  useEffect(() => {
    if (!heatmap) return;
    setTribeList(
      Object.entries(heatmap).map(([tribe, val]) => ({
        name: tribe,
        dopamine: val,
      }))
    );
  }, [heatmap]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-10 px-6">
      {/* ... ÙƒÙ„ ÙƒÙˆØ¯ Public Dashboard Ø§Ù„Ø°ÙŠ ÙƒØªØ¨ØªÙ‡ ... */}
    </div>
  );
}

function MentorGlowCard({ tribe, dopamine, multiplier = 0 }) {
  const glowActive = multiplier > 0.02;
  const intensity = dopamine || 0.5;

  const color = `hsl(${intensity * 120}, 80%, 55%)`;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative p-6 rounded-2xl bg-gray-900 text-center shadow-lg overflow-hidden border border-gray-800"
    >
      {/* ... Ø¨Ø§Ù‚ÙŠ Ø§Ù„ÙƒÙˆØ¯ ... */}
    </motion.div>
  );
}
