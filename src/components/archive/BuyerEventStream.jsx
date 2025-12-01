import React from "react";
import { motion } from "framer-motion";

export default function BuyerEventStream({ events }) {
  if (!events || events.length === 0)
    return (
      <div className="p-4 rounded-xl bg-[#1a1630] text-gray-400 text-sm">
        No recent buyer activityâ€¦
      </div>
    );

  return (
    <div className="p-6 rounded-2xl bg-[#161226] border border-purple-400/30 shadow-lg">
      <h2 className="text-purple-300 text-xl font-bold mb-3">
        âš¡ Buyer Event Stream
      </h2>

      <div className="space-y-2 max-h-64 overflow-auto pr-2">
        {events.map((ev, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="p-3 bg-[#201a3b] rounded-lg text-gray-200 text-sm flex justify-between items-center border border-gray-600/20"
          >
            <span>{ev}</span>
            <span className="text-xs text-purple-400">
              #{events.length - i}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
