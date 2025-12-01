import React, { useEffect, useState } from "react";
import { getUnifiedStats } from "@data/dataSync";
import { motion } from "framer-motion";

/**
 * Core4.AI â€“ MVP 15 Unified Stats v2
 * Global system overview for Posts, Votes, Users, Clusters, Wallets & Influence Links.
 * Consistent visual style with GroupStats.jsx
 */

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await getUnifiedStats();
        setStats(res.data);
      } catch (err) {
        console.error("âŒ Failed to load unified stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-gray-400 text-center bg-black min-h-screen">
        <p className="italic animate-pulse">Loading unified system stats...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-10 text-red-400 text-center bg-black min-h-screen">
        <p>âš ï¸ Failed to load stats. Try again later.</p>
      </div>
    );
  }

  const cards = [
    { label: "Users", value: stats.total_users, icon: "ðŸ‘¥", color: "from-purple-500 to-indigo-600" },
    { label: "Posts", value: stats.total_posts, icon: "ðŸ“", color: "from-yellow-500 to-orange-600" },
    { label: "Votes", value: stats.total_votes, icon: "ðŸ”¥", color: "from-pink-500 to-red-600" },
    { label: "Clusters", value: stats.total_clusters, icon: "ðŸŒ", color: "from-blue-500 to-cyan-600" },
    { label: "Wallets", value: stats.total_wallets, icon: "ðŸ’°", color: "from-green-500 to-emerald-600" },
    { label: "Influence Links", value: stats.influence_links, icon: "âš¡", color: "from-indigo-500 to-purple-600" },
  ];

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">ðŸ“Š Core4.AI System Overview</h1>

      {/* ðŸ”¹ Main Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.04 }}
            className={`p-6 rounded-2xl border border-gray-800 bg-gradient-to-br ${c.color} shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl">{c.icon}</span>
              <span className="text-4xl font-extrabold text-white drop-shadow-sm">
                {c.value ?? "â€“"}
              </span>
            </div>
            <p className="mt-3 text-sm uppercase tracking-wider text-gray-100 font-semibold">
              {c.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ðŸ”¹ System Summary Section */}
      <div className="mt-10 bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-purple-300 mb-2">
          System Cohesion Snapshot
        </h2>
        <p className="text-gray-400 leading-relaxed">
          The Core4.AI ecosystem currently operates with a unified data backbone 
          combining content dynamics, emotional clusters, and influenc
