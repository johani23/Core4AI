// ============================================================
// ðŸ’Ž Core4.AI â€“ Tokens.jsx (MVP-122 â€œDynamic Weight Engineâ€)
// ------------------------------------------------------------
// âœ… Displays user token balances
// âœ… Calculates real-time token weighting
// âœ… Integrated with /reward/simulate & /tokens/market
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Coins, TrendingUp, BarChart3 } from "lucide-react";
import { useCoreSync } from "@context/CoreSyncContext";

export default function Tokens() {
  const { tokens = {}, refreshTokens } = useCoreSync();
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    refreshTokens?.();
    computeWeight();
  }, [tokens]);

  const computeWeight = () => {
    const tribeToken = tokens.tribe_token || 0;
    const mastery = tokens.mastery_level || 1;
    const engagement = tokens.engagement_score || 0.5;
    const w = tribeToken * mastery * Math.exp(engagement);
    setWeight(w.toFixed(2));
  };

  return (
    <div className="p-8 text-gray-100">
      <h1 className="text-3xl font-bold mb-6">ðŸ’  Token Balance & Weight</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-gray-800 rounded-2xl border border-gray-700 shadow-lg"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-lg">C4T Tokens</h2>
            <Coins className="text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-yellow-400">{tokens.c4t_balance || 0}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-gray-800 rounded-2xl border border-gray-700 shadow-lg"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-lg">Tribe Tokens</h2>
            <TrendingUp className="text-emerald-400" />
          </div>
          <p className="text-3xl font-bold text-emerald-400">{tokens.tribe_token || 0}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-gray-800 rounded-2xl border border-gray-700 shadow-lg"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-lg">Dynamic Weight</h2>
            <BarChart3 className="text-cyan-400" />
          </div>
          <p className="text-3xl font-bold text-cyan-400">{weight}</p>
          <p className="text-sm text-gray-400 mt-1">
            Formula: tribe_token Ã— mastery_level Ã— e<sup>(engagement)</sup>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
