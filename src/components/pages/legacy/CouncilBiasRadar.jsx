// ============================================================
// ðŸ§­ Core4.AI â€“ CouncilBiasRadar.jsx (MVP-54 â€œBias Radarâ€)
// ------------------------------------------------------------
// Live radial chart of Council membersâ€™ behavior
// Requires WebSocket feed from /ws/vis-stream
// ============================================================

import React, { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import useVISSocket from "@hooks/useVISSocket";

const COUNCIL = ["Noor", "Sama", "Rami", "Nova", "Zayd"];

export default function CouncilBiasRadar() {
  const [stats, setStats] = useState(
    COUNCIL.map((m) => ({
      name: m,
      positivity: 0.5,
      consistency: 0.8,
      activity: 0.3,
      influence: 0.2,
    }))
  );

  // Simulate or update via live VIS feed
  useVISSocket((pkt) => {
    if (pkt.type === "vis_update") {
      const index = Math.floor(Math.random() * COUNCIL.length);
      setStats((prev) =>
        prev.map((s, i) =>
          i === index
            ? {
                ...s,
                activity: Math.min(1, s.activity + 0.05),
                positivity: Math.min(1, s.positivity + (pkt.new_vis > 0.6 ? 0.02 : -0.02)),
                consistency: Math.max(0, s.consistency - 0.01),
                influence: Math.min(1, s.influence + pkt.new_vis * 0.05),
              }
            : s
        )
      );
    }
  });

  return (
    <div className="p-6">
      <motion.h1
        className="text-2xl font-bold text-blue-400 mb-4"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Council Bias Radar
      </motion.h1>
      <p className="text-sm text-gray-400 mb-6">
        Visualizing voting balance, positivity, and influence in real time.
      </p>

      <div className="w-full h-96 bg-gray-950 rounded-xl p-4 border border-gray-800">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stats}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="name" tick={{ fill: "#aaa" }} />
            <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} />
            <Radar
              name="Influence"
              dataKey="influence"
              stroke="#FFD54F"
              fill="#FFD54F"
              fillOpacity={0.3}
            />
            <Radar
              name="Positivity"
              dataKey="positivity"
              stroke="#00CCFF"
              fill="#00CCFF"
              fillOpacity={0.2}
            />
            <Radar
              name="Consistency"
              dataKey="consistency"
              stroke="#FF005C"
              fill="#FF005C"
              fillOpacity={0.15}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        * Radar expands when Council members show high influence + positivity.  
        Spikes or asymmetry = bias or over-dominance.
      </p>
    </div>
  );
}
