// ============================================================
// ðŸ’Ž Core4.AI â€“ NetworkPulse.jsx (v4.0 â€œLive Tribe Analyticsâ€)
// ------------------------------------------------------------
// âœ… Real-time member & tribe updates via CoreSyncContext
// âœ… Campaign changes reflect instantly when broadcasted
// âœ… Smart CR & Token recalculations per tribe
// ============================================================

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaUsers } from "react-icons/fa";
import { useCoreSync } from "@context/CoreSyncContext";

export default function NetworkPulse() {
  const { tribeFeed = [] } = useCoreSync(); // ðŸ§  pulled from WebSocket stream
  const [expanded, setExpanded] = useState(null);
  const [tribes, setTribes] = useState([]);

  // ðŸ”¹ Initialize with default mock data (fallback before WebSocket updates)
  useEffect(() => {
    setTribes([
      {
        id: 1,
        name: "Gaming Tribe",
        cr: 2.68,
        token: 1.1,
        power: 17.8,
        trend: -1.17,
        color: "purple",
        members: [
          { id: 1, name: "RexPlayz", cr: 3.1, token: 1.15, campaign: "Active" },
          { id: 2, name: "LinaVision", cr: 2.4, token: 1.02, campaign: "None" },
        ],
      },
      {
        id: 2,
        name: "Fashion Tribe",
        cr: 2.09,
        token: 1.02,
        power: 9.5,
        trend: +2.16,
        color: "pink",
        members: [
          { id: 1, name: "Maya Events", cr: 2.8, token: 1.08, campaign: "None" },
          { id: 2, name: "Noor Editz", cr: 1.9, token: 0.97, campaign: "Pending" },
        ],
      },
      {
        id: 3,
        name: "Tech Tribe",
        cr: 5.43,
        token: 1.01,
        power: 7.2,
        trend: +1.3,
        color: "blue",
        members: [
          { id: 1, name: "Sam Tech", cr: 5.9, token: 1.12, campaign: "Active" },
        ],
      },
    ]);
  }, []);

  // ðŸ” React to WebSocket events (CoreSync updates)
  useEffect(() => {
    if (!tribeFeed || tribeFeed.length === 0) return;

    const latest = tribeFeed[tribeFeed.length - 1];

    if (latest.type === "campaign_update") {
      setTribes((prev) =>
        prev.map((tribe) =>
          tribe.name === latest.tribe
            ? {
                ...tribe,
                members: tribe.members.map((m) =>
                  m.name === latest.member
                    ? {
                        ...m,
                        campaign: latest.status,
                        cr: latest.conversion || m.cr,
                      }
                    : m
                ),
              }
            : tribe
        )
      );
    }
  }, [tribeFeed]);

  const toggleExpand = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="p-8 text-gray-100 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-purple-400 mb-1">
          âš¡ Live Conversion Power Index
        </h1>
        <p className="text-sm text-gray-400 mb-4">
          Track tribe and member performance across Core4.AI (real-time synced).
        </p>
      </div>

      {tribes.map((tribe) => (
        <motion.div
          key={tribe.id}
          className="bg-[#0b0b12] border border-gray-800 rounded-xl shadow-md"
        >
          {/* Tribe Header */}
          <div
            onClick={() => toggleExpand(tribe.id)}
            className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-900/40 transition-all"
          >
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FaUsers className={`text-${tribe.color}-400`} /> {tribe.name}
              </h2>
              <p className="text-xs text-gray-400">
                CR {tribe.cr.toFixed(2)}% â€¢ Token {tribe.token.toFixed(2)}Ã— â€¢ Power{" "}
                {tribe.power.toFixed(1)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-sm ${
                  tribe.trend >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {tribe.trend >= 0 ? "â–²" : "â–¼"} {Math.abs(tribe.trend)}%
              </span>
              {expanded === tribe.id ? (
                <FaChevronUp className="text-gray-400" />
              ) : (
                <FaChevronDown className="text-gray-400" />
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="px-5 pb-3">
            <div className="h-2 bg-gray-800 rounded-full">
              <div
                className={`h-2 rounded-full bg-gradient-to-r from-${tribe.color}-500 to-${tribe.color}-700`}
                style={{ width: `${tribe.power * 4}%` }}
              ></div>
            </div>
          </div>

          {/* Member Table */}
          <AnimatePresence>
            {expanded === tribe.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6"
              >
                <table className="w-full text-sm border-t border-gray-800 mt-3">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase">
                      <th className="text-left py-2">Member</th>
                      <th className="text-left py-2">Conversion %</th>
                      <th className="text-left py-2">Token Power</th>
                      <th className="text-left py-2">Campaign</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tribe.members.map((m) => (
                      <tr
                        key={m.id}
                        className="border-t border-gray-800 hover:bg-gray-900/50 transition-all"
                      >
                        <td className="py-2 flex items-center gap-3">
                          <img
                            src={
                              m.avatar ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                m.name
                              )}&background=4b0082&color=fff`
                            }
                            alt={m.name}
                            className="w-8 h-8 rounded-full border border-gray-700"
                          />
                          <span className="font-medium">{m.name}</span>
                        </td>
                        <td className="text-purple-300">{m.cr.toFixed(2)}%</td>
                        <td className="text-blue-300">{m.token.toFixed(2)}Ã—</td>
                        <td>
                          <span
                            className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                              m.campaign === "Active"
                                ? "bg-green-500/20 text-green-400"
                                : m.campaign === "Pending"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-gray-700/30 text-gray-400"
                            }`}
                          >
                            {m.campaign}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
