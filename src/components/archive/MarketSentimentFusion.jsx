// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ MarketSentimentFusion.jsx (v164.2 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œWeighted Pulse + Council SyncÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Fuses Tribe Economy + D-Index into unified sentiment index
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Weighted mood indicator (Bullish / Neutral / Bearish)
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Smooth animation + contextual insight message
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Fully synced with live CoreSyncContext updates
// ============================================================

import { useCoreSync } from "@context/CoreSyncContext";
import { motion } from "framer-motion";

export default function MarketSentimentFusion() {
  const { tribes = [], council } = useCoreSync();
  const [sentiment, setSentiment] = useState({
    label: "Neutral",
    score: 0,
    color: "text-yellow-400",
    message: "Market in balance ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â energy and conversions steady.",
  });

  useEffect(() => {
    if (!tribes.length) return;

    // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â® Compute average tribe token value (fallback baseline = 1.0)
    const avgTokenValue =
      tribes.reduce((acc, t) => acc + (t.tokenValue ?? 1.0), 0) /
      tribes.length;

    // ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â  Normalize D-Index (centered at 50)
    const dindex = council?.dindex ?? 50;

    // ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â Weighted fusion: tokenValue (60%) + D-Index (40%)
    const marketMomentum = avgTokenValue - 1.0; // deviation from baseline
    const globalMood = (dindex - 50) / 100;
    const sentimentScore = marketMomentum * 0.6 + globalMood * 0.4;

    // ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨ Interpret sentiment state
    let label, color, message;
    if (sentimentScore > 0.08) {
      label = "Bullish";
      color = "text-green-400";
      message =
        "Optimism rising ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â tribes expanding influence and token confidence increasing.";
    } else if (sentimentScore < -0.08) {
      label = "Bearish";
      color = "text-red-400";
      message =
        "Market cooling down ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â dopamine and token momentum showing mild contraction.";
    } else {
      label = "Neutral";
      color = "text-yellow-400";
      message =
        "Market steady ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â balanced energy across tribes and stable engagement.";
    }

    setSentiment({ label, score: sentimentScore, color, message });
  }, [tribes, council]);

  return (
    <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6 text-center shadow-lg">
      <h3 className="text-pink-400 font-semibold mb-2">
        ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â Global Market Sentiment
      </h3>

      {/* Animated Pulse Indicator */}
      <motion.div
        className={`text-4xl font-extrabold ${sentiment.color}`}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        {sentiment.label}
      </motion.div>

      <p className="text-gray-400 text-sm mt-2">
        Sentiment Score:{" "}
        <span className={`${sentiment.color} font-semibold`}>
          {(sentiment.score * 100).toFixed(1)}%
        </span>
      </p>

      <p className="text-gray-300 text-sm mt-3 max-w-2xl mx-auto">
        {sentiment.message}
      </p>

      {/* Optional baseline hint */}
      <div className="mt-4 text-xs text-gray-500">
        Fusion Formula: <code>(Token Value ÃƒÆ’Ã¢â‚¬â€ 0.6) + (D-Index ÃƒÆ’Ã¢â‚¬â€ 0.4)</code>
      </div>
    </div>
  );
}


