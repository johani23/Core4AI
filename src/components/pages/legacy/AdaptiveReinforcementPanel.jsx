// ============================================================
// ðŸ’Ž Core4.AI â€“ AdaptiveReinforcementPanel.jsx (MVP-91)
// ------------------------------------------------------------
// âœ… Real-time D-Index charts per tribe (Recharts)
// âœ… Color-coded + auto-updating
// ============================================================

import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { useCoreSync } from "@context/CoreSyncContext";

const COLORS = {
  Thinkers: "#60A5FA",
  Humorists: "#FACC15",
  EventGoers: "#FB7185",
  Fashionists: "#C084FC",
};

export default function AdaptiveReinforcementPanel() {
  const { tribeHistory } = useCoreSync();

  const merged = [];
  // build unified time-series for all tribes
  Object.keys(tribeHistory).forEach((tribe) => {
    tribeHistory[tribe].forEach((p, i) => {
      merged[i] = merged[i] || { t: p.time };
      merged[i][tribe] = p.d;
    });
  });

  return (
    <div className="bg-gray-900 p-4 rounded-2xl text-white mt-8">
      <h3 className="text-lg font-semibold mb-2">ðŸ“ˆ Adaptive Reinforcement Trends</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={merged}>
          <XAxis
            dataKey="t"
            tickFormatter={(t) =>
              new Date(t).toLocaleTimeString("en-US", { minute: "2-digit", second: "2-digit" })
            }
            stroke="#aaa"
          />
          <YAxis domain={[0, 1]} stroke="#888" />
          <Tooltip
            labelFormatter={(l) => new Date(l).toLocaleTimeString()}
            formatter={(v) => v.toFixed(2)}
          />
          <Legend />
          {Object.keys(tribeHistory).map((tribe) => (
            <Line
              key={tribe}
              type="monotone"
              dataKey={tribe}
              stroke={COLORS[tribe]}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
