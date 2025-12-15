import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DopamineTimeline() {
  const [data, setData] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://127.0.0.1:8000/dopamine/timeline?hours=24");
        const json = await res.json();
        setData(json.timeline || []);
        setAvg(json.global_avg || 0);
      } catch (err) {
        console.error("âš ï¸ Timeline fetch failed:", err);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-lg">
      <h2 className="text-xl font-bold text-yellow-400 mb-2">ðŸ“ˆ Dopamine Flow (24 h)</h2>
      <p className="text-gray-400 text-sm mb-4">
        Global Avg: <span className="text-sky-400 font-semibold">{avg.toFixed(1)}</span>
      </p>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(v) => new Date(v).getHours() + ":00"}
              stroke="#aaa"
              fontSize={12}
            />
            <YAxis stroke="#aaa" domain={[40, 100]} fontSize={12} />
            <Tooltip
              labelFormatter={(v) => new Date(v).toLocaleString()}
              contentStyle={{ backgroundColor: "#111", border: "1px solid #444" }}
            />
            <Line
              type="monotone"
              dataKey="avg_dopamine"
              stroke="#facc15"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#facc15" }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center">No timeline data yet.</p>
      )}

      <motion.div
        className="mt-6 mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-sky-600 to-purple-600 text-white text-2xl font-bold shadow-lg"
        animate={{ scale: [1, 1 + avg / 150, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        ðŸ•’
      </motion.div>
    </div>
  );
}
