import React, { useEffect, useState } from "react";
import { getDashboardSummary, getActiveOffers } from "@/services/marketAPI";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export default function MerchantInfluenceDashboard() {
  const [msi, setMsi] = useState(0);
  const [mii, setMii] = useState(0);
  const [tokenHistory, setTokenHistory] = useState([]);

  async function loadData() {
    const summary = await getDashboardSummary();
    const offers = await getActiveOffers();

    // MSI – simplified example based on summary
    const rising = summary.momentum_dist?.Rising || 0;
    const stable = summary.momentum_dist?.Stable || 0;
    const falling = summary.momentum_dist?.Falling || 0;
    const msiValue = (rising - falling) / (rising + stable + falling || 1);

    // MII – average merchant boost
    const totalDiscount = offers.reduce((sum, o) => sum + (o.discount_value || 0), 0);
    const avgDiscount = offers.length ? totalDiscount / offers.length : 0;
    const miiValue = avgDiscount / 50; // normalize 0–1

    setMsi(msiValue);
    setMii(miiValue);

    // Token drift simulation (fake rolling history for now)
    const next = [
      ...tokenHistory.slice(-9),
      { time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        value: 3 + Math.random() * 0.5 },
    ];
    setTokenHistory(next);
  }

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white rounded-2xl border border-gray-800 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">📊 Merchant Influence Dashboard</h2>
        <span className="text-xs text-gray-400">
          Updated {new Date().toLocaleTimeString()}
        </span>
      </div>

      {/* Key indicators */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Market Sentiment Index (MSI)</p>
          <h3 className="text-2xl font-bold text-yellow-400">
            {(msi * 100).toFixed(1)}%
          </h3>
          <p className="text-xs text-gray-500">{msi > 0 ? "Bullish" : "Bearish"} trend</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Merchant Influence Index (MII)</p>
          <h3 className="text-2xl font-bold text-green-400">
            {(mii * 100).toFixed(1)}%
          </h3>
          <p className="text-xs text-gray-500">
            {mii > 0.05 ? "High merchant engagement" : "Low activity"}
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800 p-4 rounded-xl col-span-2 md:col-span-1">
          <p className="text-gray-400 text-sm">Combined Influence</p>
          <h3
            className={`text-2xl font-bold ${
              msi + mii > 0 ? "text-blue-400" : "text-red-400"
            }`}
          >
            {((msi + mii) * 100).toFixed(1)}%
          </h3>
          <p className="text-xs text-gray-500">Overall market mood</p>
        </motion.div>
      </div>

      {/* Token Drift Chart */}
      <div className="h-64 bg-gray-800 rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={tokenHistory}>
            <XAxis dataKey="time" stroke="#888" />
            <YAxis domain={["auto", "auto"]} stroke="#888" />
            <Tooltip
              contentStyle={{ backgroundColor: "#111", border: "none" }}
              labelStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#facc15"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
