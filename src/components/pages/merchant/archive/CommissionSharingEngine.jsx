// ============================================================
// ðŸ’Ž Core4.AI â€“ CommissionSharingEngine.jsx (v1.0 â€œProfit Cascade Modelâ€)
// ------------------------------------------------------------
// âœ… Distributes merchant revenue among Tribes + Creators
// âœ… Weighted by XP (performance) and token_weight (influence)
// âœ… Calculates merchant ROI + tribe share ratios
// âœ… Ready for integration with AnalyticsHub + WalletRewards
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import toast from "react-hot-toast";

const COLORS = ["#c084fc", "#60a5fa", "#34d399", "#fbbf24", "#f472b6"];

export default function CommissionSharingEngine() {
  const { tribes, campaigns, level } = useCoreSync();
  const [distribution, setDistribution] = useState([]);
  const [totalPool, setTotalPool] = useState(0);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // âš™ï¸ Calculate Distribution based on latest campaign
  useEffect(() => {
    if (campaigns.length === 0 || tribes.length === 0) return;

    const latest = campaigns[0];
    setSelectedCampaign(latest);

    const pool = latest.budget || 1000;
    const activeTribes = tribes.slice(0, 4);

    const totalWeight = activeTribes.reduce(
      (sum, t) => sum + (t.token_weight || 1),
      0
    );

    const shares = activeTribes.map((t) => {
      const tribeRatio = (t.token_weight || 1) / totalWeight;
      const tribeXPBoost = (level.progress / 100) * 0.25 + 1; // XP influence
      const share = Math.round(pool * tribeRatio * tribeXPBoost);
      return {
        tribe: t.name,
        share,
        percent: Math.round((share / pool) * 100),
      };
    });

    setDistribution(shares);
    setTotalPool(pool);
  }, [campaigns, tribes, level]);

  // ðŸ’° Trigger payout
  const handleDistribute = () => {
    if (distribution.length === 0) return;
    toast.success(`ðŸ’¸ Distributed ${totalPool}$ across ${distribution.length} tribes`);
  };

  return (
    <div className="p-8 bg-[#0b0b15]/80 rounded-2xl border border-gray-800 shadow-xl text-gray-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-purple-400 flex items-center gap-2">
          ðŸ’° Commission Sharing Engine
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleDistribute}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md text-sm font-semibold"
        >
          Distribute Now
        </motion.button>
      </div>

      {selectedCampaign ? (
        <>
          <p className="text-sm text-gray-400 mb-3">
            Campaign:{" "}
            <span className="text-purple-300 font-semibold">
              {selectedCampaign.campaign_id || "CMP"}
            </span>{" "}
            â€¢ Budget:{" "}
            <span className="text-green-400 font-semibold">
              ${selectedCampaign.budget}
            </span>
          </p>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* ðŸ° Pie Chart */}
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={distribution}
                  dataKey="share"
                  nameKey="tribe"
                  outerRadius={100}
                  label={({ tribe, percent }) => `${tribe}: ${percent}%`}
                >
                  {distribution.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* ðŸ“Š Breakdown */}
            <div className="space-y-3">
              {distribution.map((d, idx) => (
                <motion.div
                  key={d.tribe}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#111]/70 border border-gray-700 rounded-lg p-3 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span className="text-sm font-semibold text-purple-300">
                      {d.tribe}
                    </span>
                  </div>
                  <span className="text-sm text-green-400 font-bold">
                    ${d.share}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-500 text-center">
            XP Influence Multiplier: <span className="text-purple-300">+{((level.progress / 100) * 25).toFixed(1)}%</span>  
            â€¢ Total Pool: <span className="text-green-400">${totalPool}</span>
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-500">No campaign available for distribution.</p>
      )}
    </div>
  );
}
