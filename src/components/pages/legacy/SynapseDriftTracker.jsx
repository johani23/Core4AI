// ============================================================
// ðŸ’Ž Core4.AI â€“ SynapseDriftTracker.jsx (MVP-39.7 â€œEmotion-Mapped Flowâ€)
// ------------------------------------------------------------
// ðŸ“ˆ Animated line chart + morphing gradient by dominance
// ============================================================

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion, useAnimation } from "framer-motion";

export default function SynapseDriftTracker({ echo, nova }) {
  const [data, setData] = useState([]);
  const [mood, setMood] = useState("neutral");
  const controls = useAnimation();

  // ðŸ§  Simulate drift over time
  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const next = [
          ...prev,
          {
            t: new Date().toLocaleTimeString().slice(3, 8),
            echo,
            nova,
          },
        ].slice(-20);
        return next;
      });

      if (echo > nova + 1) setMood("echo");
      else if (nova > echo + 1) setMood("nova");
      else setMood("neutral");
    }, 2000);
    return () => clearInterval(id);
  }, [echo, nova]);

  // ðŸŽ¨ Dynamic background color by dominance
  useEffect(() => {
    if (mood === "echo")
      controls.start({
        background:
          "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.25), rgba(17,17,17,0.9))",
        transition: { duration: 1.2 },
      });
    else if (mood === "nova")
      controls.start({
        background:
          "radial-gradient(circle at 50% 50%, rgba(244,63,94,0.25), rgba(17,17,17,0.9))",
        transition: { duration: 1.2 },
      });
    else
      controls.start({
        background:
          "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.2), rgba(17,17,17,0.9))",
        transition: { duration: 1.2 },
      });
  }, [mood, controls]);

  const tooltipMood =
    mood === "echo"
      ? "Calm precision risingâ€¦"
      : mood === "nova"
      ? "Neural confidence surgeâ€¦"
      : "Synaptic harmony.";

  return (
    <motion.div
      animate={controls}
      className="border border-gray-700 rounded-2xl p-6 mt-10 w-11/12 md:w-[700px] mx-auto shadow-2xl"
    >
      <h3 className="text-xl font-semibold text-purple-300 text-center mb-4">
        ðŸ“ˆ Synapse Drift Tracker
      </h3>

      <div className="h-[280px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="t" stroke="#aaa" fontSize={12} />
            <YAxis domain={[0, 100]} stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f1f1f",
                border: "1px solid #555",
                color: "#fff",
              }}
              formatter={(value, name) => [
                `${value.toFixed(1)}%`,
                name === "echo" ? "Echo Accuracy" : "Nova Accuracy",
              ]}
              labelFormatter={() => tooltipMood}
            />
            <Line
              type="monotone"
              dataKey="echo"
              stroke="#6366F1"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#818CF8" }}
            />
            <Line
              type="monotone"
              dataKey="nova"
              stroke="#F43F5E"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#FB7185" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-gray-400 mt-3 text-sm italic"
      >
        {tooltipMood}
      </motion.p>
    </motion.div>
  );
}
