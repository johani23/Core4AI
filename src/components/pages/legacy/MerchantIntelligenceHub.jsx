// ============================================================
// ðŸ’Ž Core4.AI â€“ MerchantIntelligenceHub.jsx (v140.2 â€œStable API Fixâ€)
// ------------------------------------------------------------
// âœ… Fixed 500 error by updating route to /api/merchant/transactions
// âœ… Compatible with main.py v141.2
// ============================================================

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import MerchantKPISummary from "@components/MerchantKPISummary";

export default function MerchantIntelligenceHub() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [funnel, setFunnel] = useState({
    content: 68,
    tokens: 54,
    targeting: 42,
    influence: 31,
    mastery: 26,
  });

  useEffect(() => {
    const fetchTx = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/merchant/transactions");
        setTransactions(res.data.transactions || []);
        setLoading(false);
      } catch (e) {
        console.error("âŒ Error fetching merchant data:", e);
      }
    };
    fetchTx();
    const interval = setInterval(fetchTx, 8000);
    return () => clearInterval(interval);
  }, []);

  const avgConv = transactions.length
    ? transactions.reduce((a, t) => a + (t.conversion_score || 0), 0) / transactions.length
    : 0;

  const color = avgConv > 70 ? "green" : avgConv > 40 ? "yellow" : "red";

  return (
    <div className="p-6 min-h-[90vh] bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200">
      <h1 className="text-3xl font-bold text-purple-400 mb-6 flex items-center gap-2">
        ðŸ§­ Merchant Intelligence Dashboard
      </h1>

      <MerchantKPISummary />

      {/* Conversion Funnel */}
      <div className="mt-8 bg-[#111827] border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-300">Value Conversion Funnel</h2>
        <div className="space-y-6">
          {Object.entries(funnel).map(([key, val], i) => (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="capitalize text-gray-400">{key}</span>
                <span className="font-semibold text-purple-300">{val.toFixed(1)}%</span>
              </div>
              <motion.div
                className="h-3 bg-gray-800 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${val}%` }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <div className="h-3 bg-indigo-500 rounded-full" style={{ width: "100%" }} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Merchant Transactions */}
      <div className="mt-8 bg-[#111827] border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-300">Recent Merchant Transactions</h2>
        {loading ? (
          <p className="text-gray-500">Loading transactions...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#1f2937] text-gray-300">
                <tr>
                  <th className="py-2 px-3 text-left">Merchant</th>
                  <th className="py-2 px-3 text-left">Tribe</th>
                  <th className="py-2 px-3 text-right">Value ($)</th>
                  <th className="py-2 px-3 text-right">Impact</th>
                  <th className="py-2 px-3 text-right">Conversion</th>
                  <th className="py-2 px-3 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 10).map((tx, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="border-b border-gray-800 hover:bg-[#1a2233]"
                  >
                    <td className="py-2 px-3 text-purple-400 font-semibold">{tx.merchant}</td>
                    <td className="py-2 px-3 text-gray-300">{tx.tribe}</td>
                    <td className="py-2 px-3 text-right text-gray-200">${tx.value}</td>
                    <td className="py-2 px-3 text-right text-yellow-400">
                      {(tx.impact * 100).toFixed(1)}%
                    </td>
                    <td
                      className={`py-2 px-3 text-right font-semibold ${
                        tx.conversion_score > 70
                          ? "text-green-400"
                          : tx.conversion_score > 40
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {tx.conversion_score.toFixed(1)}%
                    </td>
                    <td className="py-2 px-3 text-right text-gray-500 text-xs">
                      {new Date(tx.timestamp).toLocaleTimeString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Avg Conversion */}
      <div className="mt-6 bg-[#111827] border border-gray-700 rounded-xl p-4 flex items-center justify-between">
        <p className="text-sm text-gray-400">Current Average Conversion Score:</p>
        <motion.div
          className={`text-xl font-bold ${
            color === "green"
              ? "text-green-400"
              : color === "yellow"
              ? "text-yellow-400"
              : "text-red-400"
          }`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {avgConv.toFixed(1)}%
        </motion.div>
      </div>
    </div>
  );
}
