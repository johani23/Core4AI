// src/components/dopamine/DopamineForecast.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * 🧠 Core4.AI – Dopamine Forecast Panel (MVP 19.10)
 * Displays predicted dopamine trend over the next 12 hours.
 */

export default function DopamineForecast() {
  const [forecast, setForecast] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    async function fetchForecast() {
      try {
        const res = await fetch("http://127.0.0.1:8000/dopamine/forecast?hours_ahead=12");
        const json = await res.json();
        setForecast(json.forecast || []);
        setAvg(json.forecast_avg || 0);
      } catch (err) {
        console.error("⚠️ Dopamine forecast fetch failed:", err);
      }
    }

    fetchForecast();
    const interval = setInterval(fetchForecast, 20000); // auto-refresh every 20s
    return () => clearInterval(interval);
  }, []);

  if (!forecast.length) {
    return (
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 text-gray-400 text-center">
        Loading dopamine forecast...
      </div>
    );
  }

  return (
    <motion.div
      className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-semibold text-yellow-400 mb-4">🔮 Dopamine Forecast</h2>

      <div className="text-sm text-gray-400 mb-2">
        <p>Average Forecast: <span className="text-yellow-400">{avg}%</span></p>
      </div>

      <div className="h-48 overflow-x-auto mt-3">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-gray-500 border-b border-gray-700">
              <th className="text-left py-1">Time</th>
              <th className="text-right py-1">Predicted Level</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((item, i) => (
              <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="py-1 text-left">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </td>
                <td className="py-1 text-right text-yellow-400 font-semibold">
                  {item.predicted_dopamine}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
