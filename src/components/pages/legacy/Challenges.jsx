import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getChallenges, evaluateRewards } from "@services/api";

/**
 * ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Core4.AI MVP-23 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Dynamic Challenges + Reward Trigger
 */
export default function Challenges({ userId = 1 }) {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rewarding, setRewarding] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await getChallenges();
        setChallenges(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â Failed to load challenges:", err);
        setChallenges([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleEvaluate = async () => {
    try {
      setRewarding(true);
      const res = await evaluateRewards(userId);
      setResult(res.result);
    } catch (err) {
      alert("ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â Error evaluating rewards.");
    } finally {
      setRewarding(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <motion.h1
        className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-pink-400 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Weekly Core4 Challenges
      </motion.h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : challenges.length === 0 ? (
        <p className="text-gray-500">No challenges yet. Come back later! ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {challenges.map((c, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-gray-900/80 to-purple-900/40 p-4 rounded-2xl border border-purple-700/40 shadow-md hover:shadow-purple-700/40 transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-yellow-300">{c.title}</h3>
                <span className="text-xs text-gray-400">{c.points} pts</span>
              </div>
              <p className="text-gray-300 text-sm">{c.description}</p>
              <p
                className={`mt-3 text-xs ${
                  c.status === "completed"
                    ? "text-green-400"
                    : c.status === "expired"
                    ? "text-red-400"
                    : "text-blue-400"
                }`}
              >
                {c.status}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex flex-col items-center mt-8">
        <button
          onClick={handleEvaluate}
          disabled={rewarding}
          className={`px-6 py-3 rounded-xl font-semibold ${
            rewarding
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-black"
          }`}
        >
          {rewarding ? "Evaluating..." : "Evaluate My Rewards ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°"}
        </button>

        {result && (
          <motion.div
            className="mt-6 text-center text-sm text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Completed: {result.completed.join(", ")}<br />
            Earned {result.count} reward(s)!
          </motion.div>
        )}
      </div>
    </div>
  );
}

