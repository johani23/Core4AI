// ============================================================
// ðŸ’Ž Core4.AI â€“ Groups.jsx (MVP-27.9 Final)
// Structural Groups (Core4.AI 001â€“004) + Engagement Indicators
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { getGroups } from "@services/api";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const data = await getGroups();
        setGroups(data);
      } catch (err) {
        console.error("âŒ Error fetching groups:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGroups();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-yellow-400 animate-pulse">
        Loading Core4.AI Groups...
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Core4.AI Groups{" "}
        <span className="text-sm text-gray-400">(auto-generated pods)</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {groups.map((group) => {
          const engagement = group.engagement || 0;
          const status =
            engagement > 80
              ? { label: "UP", color: "text-green-400", icon: <TrendingUp size={16} /> }
              : engagement < 70
              ? { label: "DOWN", color: "text-red-400", icon: <TrendingDown size={16} /> }
              : { label: "STEADY", color: "text-yellow-400", icon: <Activity size={16} /> };

          return (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-900 rounded-2xl p-6 shadow-lg hover:shadow-yellow-500/10 border border-zinc-800"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Users size={18} className="text-yellow-400" />
                  {group.name}
                </h2>
                <span className={`text-xs font-bold ${status.color} flex items-center gap-1`}>
                  {status.icon}
                  {status.label}
                </span>
              </div>

              <p className="text-sm text-gray-400 mb-3">{group.description}</p>

              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full ${
                    status.label === "UP"
                      ? "bg-green-400"
                      : status.label === "DOWN"
                      ? "bg-red-500"
                      : "bg-yellow-400"
                  }`}
                  style={{ width: `${engagement}%` }}
                ></div>
              </div>

              <p className="text-xs text-gray-400">
                Engagement: <span className="text-white">{engagement}%</span> â€¢ Pool Balance:{" "}
                <span className="text-yellow-400">{group.pool_balance.toFixed(2)} C4T</span>
              </p>
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-sm text-gray-500 mt-8">
        Each Core4.AI group acts as a self-organizing unit of 4 members.
        <br />
        Members can later customize their group name and description.
      </p>
    </div>
  );
}
