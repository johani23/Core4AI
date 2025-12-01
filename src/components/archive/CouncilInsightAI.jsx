// ============================================================
// ðŸ’Ž Core4.AI â€“ CouncilInsightAI.jsx (v164.2 â€œInsight Narrative Engineâ€)
// ------------------------------------------------------------
// âœ… Synthesizes narrative insights from tribe + council data
// âœ… Highlights leading tribe, global mood, and engagement pulse
// âœ… Uses animated display + toast notifications
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";
import toast from "react-hot-toast";

export default function CouncilInsightAI() {
  const { tribes, council, stats } = useCoreSync();
  const [insight, setInsight] = useState({
    summary: "",
    bullets: [],
    mood: "neutral",
  });

  // ðŸ§  Generate narrative whenever data updates
  useEffect(() => {
    if (!tribes || tribes.length === 0) return;

    const leader = tribes.reduce(
      (a, b) => (b.tokenValue > a.tokenValue ? b : a),
      tribes[0]
    );
    const avgDopamine =
      tribes.reduce((a, t) => a + (t.dopamine || 0), 0) / tribes.length;
    const dindex = council?.dindex ?? 50;
    const influence = stats?.totalInfluence ?? 0;

    // âœ… Corrected: simple JS array (no TS typing)
    const bullets = [];

    bullets.push(
      `Tribe **${leader.name}** currently leads the economic layer with token value â‰ˆ ${leader.tokenValue?.toFixed(
        3
      )}.`
    );
    bullets.push(
      `Global D-Index is ${dindex.toFixed(
        1
      )}%, indicating overall ${dindex > 55 ? "optimism" : dindex < 45 ? "cooling sentiment" : "neutral balance"}.`
    );
    bullets.push(
      `Collective dopamine level is at ${(avgDopamine * 100).toFixed(
        1
      )}%, showing ${
        avgDopamine > 0.6 ? "high creative excitement" : "moderate engagement"
      }.`
    );
    bullets.push(
      `Total influence generated so far: ${influence.toFixed(2)} pts.`
    );

    const mood =
      dindex > 55
        ? "bullish"
        : dindex < 45
        ? "bearish"
        : "neutral";

    const summary =
      mood === "bullish"
        ? "Council detects rising optimism â€” tribes expanding influence and creative flow increasing."
        : mood === "bearish"
        ? "Council detects cooling momentum â€” engagement stabilizing after earlier spikes."
        : "Council observes steady equilibrium across tribes â€” balanced growth environment.";

    setInsight({ summary, bullets, mood });

    // ðŸ”” Optional toast when sentiment changes
    toast.dismiss();
    toast.custom(
      (t) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-[#0b0b0b] text-white px-4 py-3 rounded-xl border border-purple-700 shadow-lg max-w-md"
        >
          <p className="text-sm text-purple-400 font-semibold mb-1">
            ðŸ§­ Council Insight Updated
          </p>
          <p className="text-xs text-gray-300">{summary}</p>
        </motion.div>
      ),
      { duration: 4000 }
    );
  }, [tribes, council, stats]);

  // ðŸŽ¨ Color map
  const colorMap = {
    bullish: "text-green-400",
    bearish: "text-red-400",
    neutral: "text-yellow-400",
  };

  return (
    <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6 space-y-4">
      <h3 className="text-pink-400 font-semibold">ðŸ§  Council AI Insight</h3>

      <motion.p
        className={`text-sm ${colorMap[insight.mood]} font-medium`}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        {insight.summary}
      </motion.p>

      <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
        {insight.bullets.map((b, i) => (
          <li key={i}>
            <span dangerouslySetInnerHTML={{ __html: b }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
