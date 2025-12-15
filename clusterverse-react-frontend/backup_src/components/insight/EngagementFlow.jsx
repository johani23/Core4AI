import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { recordEngagement } from "@services/api";
import useEngagementTracker from "@hooks/useEngagementTracker";

/**
 * Core4.AI â€“ Engagement Flow
 * Displays user engagement trend (simulated) with silent dopamine logging.
 */
export default function EngagementFlow() {
  const [flow, setFlow] = useState([]);
  useEngagementTracker("engagement_flow_view");

  useEffect(() => {
    async function simulate() {
      const data = [];
      for (let i = 0; i < 12; i++) {
        data.push({
          time: `${i * 2}:00`,
          engagement: Math.round(50 + Math.random() * 40),
        });
      }
      setFlow(data);
      recordEngagement("view_engagement_flow"); // hidden dopamine ping
    }
    simulate();
  }, []);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-yellow-400 text-xl font-semibold mb-1">
        ðŸŒŠ Engagement Flow (24 h)
      </h2>
      <p className="text-gray-400 text-sm mb-3">
        Balanced engagement flow.
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={flow}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="time" stroke="#888" />
          <YAxis domain={[0, 100]} stroke="#888" />
          <Tooltip
            contentStyle={{
              background: "#1f1f1f",
              border: "1px solid #444",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="#FFD700"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-sm text-gray-500 mt-2">
        Global Engagement Avg: <span className="text-yellow-400">72.3</span>
      </p>
    </div>
  );
}
