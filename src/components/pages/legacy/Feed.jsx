// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Feed.jsx (v1.9 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œSentiment Pulse EditionÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Fixes overflow (0ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“100 scaling)
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Adds sentiment pulse feedback
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Dynamic dopamine glow colors by sentiment
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Animated dopamine bar + aura effect
// ============================================================

import { motion, AnimatePresence } from "framer-motion";
import { useCreator } from "@context/CreatorContext";

const tribeColors = {
  Thinkers: "#60a5fa",
  Humorists: "#facc15",
  EventGoers: "#22c55e",
  Fashionists: "#ec4899",
  Unclassified: "#a1a1aa",
};

const colorize = (val) => {
  if (val >= 70) return "text-green-400";
  if (val >= 50) return "text-yellow-400";
  return "text-red-400";
};

export default function Feed() {
  const { creatorId, tribe, tokens, updateProfile } = useCreator();
  const [postText, setPostText] = useState("");
  const [feedItems, setFeedItems] = useState([]);
  const [sessionStats, setSessionStats] = useState({
    posts: 0,
    avgScore: 0,
    dopamine: 0,
  });
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [pulse, setPulse] = useState(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  // ------------------------------------------------------------
  // ÃƒÂ¢Ã…â€œÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â Submit Post
  // ------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postText.trim() || cooldown > 0) return;
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/content/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: postText, creator_id: creatorId }),
      });
      const data = await res.json();

      const sentimentLabel = data.sentiment?.label || "NEUTRAL";
      const sentimentScore = data.sentiment?.score || 0.5;

      const score = Math.round((data.total || 0) * 100);
      const tribeAssigned = data.tribe || tribe || "Unclassified";
      const tokenGain = data.tokens || (data.total > 0.8 ? 1 : 0);
      const dopamineGain = Math.round((data.dopamine || 0.5) * 100);

      updateProfile({
        tribe: tribeAssigned,
        tokens: tokens + tokenGain,
      });

      const newPosts = sessionStats.posts + 1;
      const newAvg =
        (sessionStats.avgScore * sessionStats.posts + score) / newPosts;
      const newDopamine = sessionStats.dopamine + dopamineGain;

      setSessionStats({
        posts: newPosts,
        avgScore: newAvg,
        dopamine: newDopamine,
      });

      const newPost = {
        id: Date.now(),
        creator: creatorId,
        time: new Date().toLocaleTimeString(),
        sentimentLabel,
        sentimentScore,
        ...data,
      };
      setFeedItems((prev) => [newPost, ...prev]);

      // ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Â¡ Set pulse with sentiment context
      setPulse({
        xp: Math.round(score / 10),
        dindex: dopamineGain,
        tribe: tribeAssigned,
        tokens: tokenGain,
        sentimentLabel,
        sentimentScore,
      });

      setTimeout(() => setPulse(null), 2500);
      setPostText("");
      setCooldown(8);
    } catch (err) {
      console.error("Feed error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨ Sentiment Glow
  // ------------------------------------------------------------
  const getGlowColor = (label) => {
    switch (label.toUpperCase()) {
      case "POSITIVE":
        return "from-green-500 to-emerald-400 shadow-[0_0_15px_#10b981]";
      case "NEGATIVE":
        return "from-red-500 to-pink-600 shadow-[0_0_15px_#ef4444]";
      default:
        return "from-purple-600 to-pink-500 shadow-[0_0_15px_#a855f7]";
    }
  };

  // ------------------------------------------------------------
  // UI
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Core4 Feed</h1>

      <div className="text-center text-sm text-gray-400 mb-6">
        Active Creator:{" "}
        <span className="text-purple-400 font-medium">{creatorId}</span> ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Tribe:{" "}
        <span
          className="font-medium"
          style={{ color: tribeColors[tribe] || "#a1a1aa" }}
        >
          {tribe}
        </span>{" "}
        ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Tokens:{" "}
        <span className="text-amber-400 font-medium">{tokens}</span>
      </div>

      <div className="text-center text-xs text-gray-500 mb-8">
        Posts: {sessionStats.posts} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Avg Score:{" "}
        {sessionStats.avgScore.toFixed(1)}% ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Dopamine:{" "}
        {sessionStats.dopamine.toFixed(1)}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-zinc-900 p-5 rounded-xl shadow-md"
      >
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Share a thought, idea, or insight..."
          className="w-full h-28 bg-zinc-800 text-white p-3 rounded-lg outline-none resize-none"
        />
        <div className="flex justify-between items-center mt-4">
          {cooldown > 0 ? (
            <span className="text-xs text-gray-500">
              ÃƒÂ¢Ã‚ÂÃ‚Â³ Cooldown: {cooldown}s
            </span>
          ) : (
            <span className="text-xs text-gray-600">Ready to post</span>
          )}
          <button
            type="submit"
            disabled={loading || cooldown > 0}
            className={`px-5 py-2 rounded-lg font-medium transition ${
              loading || cooldown > 0
                ? "bg-zinc-700 text-gray-400"
                : "bg-purple-700 hover:bg-purple-600"
            }`}
          >
            {loading ? "Scoring..." : "Post & Analyze"}
          </button>
        </div>
      </form>

      {/* Dopamine Pulse */}
      <AnimatePresence>
        {pulse && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-zinc-900 border border-purple-700 px-6 py-3 rounded-2xl shadow-lg text-center"
          >
            <p className="text-purple-300 font-medium">
              ÃƒÂ¢Ã…â€œÃ‚Â¨ +{pulse.xp} XP ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ D-Index ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬Ëœ {pulse.dindex}%{" "}
              {pulse.tokens > 0 && (
                <span className="text-amber-400 ml-2">+{pulse.tokens} ÃƒÂ°Ã…Â¸Ã‚ÂªÃ¢â€žÂ¢</span>
              )}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Sentiment:{" "}
              <span
                className={`${
                  pulse.sentimentLabel === "POSITIVE"
                    ? "text-green-400"
                    : pulse.sentimentLabel === "NEGATIVE"
                    ? "text-red-400"
                    : "text-purple-400"
                }`}
              >
                {pulse.sentimentLabel}
              </span>{" "}
              ({Math.round(pulse.sentimentScore * 100)}%)
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
              className={`h-1 mt-2 rounded-full bg-gradient-to-r ${getGlowColor(
                pulse.sentimentLabel
              )}`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feed */}
      <div className="max-w-3xl mx-auto mt-10 space-y-5">
        {feedItems.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900 border border-zinc-800 hover:border-purple-600 rounded-2xl p-5 transition-all"
          >
            <div className="flex justify-between items-center mb-2">
              <h2
                className="text-lg font-semibold"
                style={{ color: tribeColors[item.tribe] || "#a1a1aa" }}
              >
                {item.creator}
              </h2>
              <span className="text-sm text-gray-400">{item.time}</span>
            </div>

            <p className="text-sm text-gray-400 mb-2">
              Tribe:{" "}
              <span
                style={{ color: tribeColors[item.tribe] || "#a1a1aa" }}
                className="font-medium"
              >
                {item.tribe}
              </span>{" "}
              ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Level:{" "}
              <span className="text-purple-400 font-medium">{item.level}</span>
              {" ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ "}
              <span
                className={`${
                  item.sentimentLabel === "POSITIVE"
                    ? "text-green-400"
                    : item.sentimentLabel === "NEGATIVE"
                    ? "text-red-400"
                    : "text-purple-400"
                }`}
              >
                {item.sentimentLabel}
              </span>
            </p>

            {/* 6-Axis Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-300 mb-3">
              {[
                ["Credibility", item.credibility],
                ["Novelty", item.novelty],
                ["Coherence", item.coherence],
                ["Insight", item.insight],
                ["Emotion", item.emotion],
                ["Creativity", item.creativity],
              ].map(([label, val]) => (
                <div
                  key={label}
                  className="flex justify-between bg-zinc-800 rounded px-2 py-1"
                  title={label}
                >
                  <span>{label}</span>
                  <span className={`${colorize(val)} font-medium`}>
                    {val.toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>

            {/* Total Score */}
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Total Score:</span>
              <span className="text-purple-300 font-medium">
                {(item.total * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.total * 100}%` }}
                transition={{ duration: 0.8 }}
                className={`h-2 rounded-full bg-gradient-to-r ${getGlowColor(
                  item.sentimentLabel
                )}`}
              />
            </div>
          </div>
        ))}

        {!feedItems.length && (
          <div className="text-center text-gray-500 mt-10">
            No posts yet ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â share your first thought!
          </div>
        )}
      </div>
    </div>
  );
}


