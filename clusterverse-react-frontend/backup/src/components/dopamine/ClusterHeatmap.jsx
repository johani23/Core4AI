// src/components/dopamine/ClusterHeatmap.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ClusterHeatmap() {
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://127.0.0.1:8000/dopamine/cluster-heatmap");
        const json = await res.json();
        setClusters(json.clusters || []);
      } catch (err) {
        console.error("âš ï¸ Cluster heatmap fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <div className="bg-gray-900 p-6 text-center text-gray-400 rounded-xl border border-gray-800">
        Loading cluster heatmap...
      </div>
    );

  if (!clusters.length)
    return (
      <div className="bg-gray-900 p-6 text-center text-gray-400 rounded-xl border border-gray-800">
        No cluster data yet.
      </div>
    );

  const max = Math.max(...clusters.map((c) => c.avg_dopamine));

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-lg">
      <h2 className="text-xl font-bold text-yellow-400 mb-2">ðŸŒ Cluster Dopamine Heatmap</h2>
      <p className="text-gray-400 text-sm mb-4">
        Total Clusters: <span className="text-purple-400 font-semibold">{clusters.length}</span>
      </p>

      <div className="space-y-3">
        {clusters.map((c) => {
          const ratio = c.avg_dopamine / max;
          const color =
            ratio > 0.8
              ? "from-yellow-400 to-red-500"
              : ratio > 0.5
              ? "from-sky-400 to-indigo-600"
              : "from-purple-600 to-pink-700";
          return (
            <motion.div
              key={c.cluster}
              className="relative bg-gray-800 rounded-lg overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(ratio * 100, 5)}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-80`} />
              <div className="relative z-10 p-2 flex justify-between items-center text-sm">
                <span className="font-semibold text-white">{c.cluster}</span>
                <span className="text-gray-200">{c.avg_dopamine.toFixed(1)}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="mt-6 mx-auto w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-r from-yellow-500 to-pink-600 text-white text-3xl font-bold shadow-lg"
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        ðŸ’«
      </motion.div>
    </div>
  );
}
