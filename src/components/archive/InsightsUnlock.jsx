// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ InsightsUnlock.jsx (v1.2 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œTribe Identity CertificateÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Displays D-Index, dominant tribe, and personalized insight
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Includes summary stats + ceremonial Core4.AI signature
// ============================================================

import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";

export default function InsightsUnlock({ samples = [], dindex }) {
  const { tribes } = useCoreSync();

  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Determine dominant tribe (based on dopamine + tokenValue)
  const dominantTribe = tribes.reduce((a, b) => {
    const scoreA = (a.dopamine * 0.6 + (a.tokenValue || 1) * 0.4);
    const scoreB = (b.dopamine * 0.6 + (b.tokenValue || 1) * 0.4);
    return scoreA > scoreB ? a : b;
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white px-6 py-16 text-center">
      {/* ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â¦ Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold text-purple-400 mb-4"
      >
        ÃƒÂ°Ã…Â¸Ã‚ÂªÃ‚Â¶ Tribe Identity Certificate
      </motion.h1>

      <p className="text-gray-400 max-w-2xl mb-10">
        Based on <span className="text-yellow-400 font-semibold">{samples.length}</span>{" "}
        original reflections, Core4.AI decoded your creative fingerprint and aligned you with your true tribe.
      </p>

      {/* ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…â€œ Certificate Block */}
      <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-8 max-w-lg mx-auto text-left space-y-4 shadow-lg shadow-purple-900/20">
        <div>
          <h3 className="text-pink-400 font-semibold">ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â  Tribe Alignment</h3>
          <p className="text-gray-300">
            You resonate most with the{" "}
            <span className="text-purple-300 font-bold">{dominantTribe.name}</span>{" "}
            Tribe ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â characterized by dopamine flow of{" "}
            <span className="text-green-400">{(dominantTribe.dopamine * 100).toFixed(1)}%</span>{" "}
            and token strength of{" "}
            <span className="text-yellow-300">{(dominantTribe.tokenValue ?? 1).toFixed(2)}</span>.
          </p>
        </div>

        <div>
          <h3 className="text-purple-400 font-semibold">ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€  D-Index</h3>
          <p className="text-gray-300">
            Your current D-Index is{" "}
            <span className="text-yellow-400 font-bold">
              {dindex?.toFixed(1) ?? "50.0"}
            </span>, representing the collective trust in your influence potential.
          </p>
        </div>

        <div>
          <h3 className="text-pink-400 font-semibold">ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­ Insight</h3>
          <p className="text-gray-300 italic">
            ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œYour curiosity and authenticity spark genuine engagement ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â your tribe values emotional depth and creative exploration.ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â
          </p>
        </div>

        <div className="pt-4 border-t border-gray-800 text-center text-sm text-gray-500">
          Certified by <span className="text-purple-400 font-semibold">Core4.AI Council</span>  
          <br />Dated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â® Continue */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="mt-10 bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-pink-500/20 transition"
        onClick={() => (window.location.href = "/pulse")}
      >
        Continue to Live Network Pulse ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢
      </motion.button>
    </div>
  );
}


