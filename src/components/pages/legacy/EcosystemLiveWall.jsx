// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ EcosystemLiveWall.jsx (v6.1 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œCinematic Synaptic Flow ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Stable EditionÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Split-screen cinematic layout for large displays
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Left: Dopamine Heat Flow (animated orbs)
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Right: Live Leaderboard (auto reordering)
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Top: TopTribeBanner crown overlay
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ UTF-8 safe ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ no emoji characters in logs
// ============================================================

import { motion, AnimatePresence } from "framer-motion";
import TopTribeBanner from "@components/TopTribeBanner";

export default function EcosystemLiveWall() {
  const [tribes, setTribes] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const wsRef = useRef(null);

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â WebSocket Sync
  // ------------------------------------------------------------
  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/synaptic");
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        // Tribe dopamine heat updates
        if (msg.event === "pulse" || msg.event === "tribe_pulse") {
          const heatmap = msg.heatmap || {};
          const updated = {};
          for (const [k, v] of Object.entries(heatmap)) {
            updated[k] = (v * 100).toFixed(1);
          }
          setTribes(updated);
        }

        // Leaderboard refresh triggers
        if (msg.event === "dopamine_update" || msg.event === "pulse") {
          fetchLeaderboard();
        }
      } catch (e) {
        console.error("WebSocket parse error:", e);
      }
    };

    // Safe console logging (no emojis)
    ws.onopen = () => console.log("LiveWall WebSocket connected");
    ws.onclose = () => console.warn("LiveWall WebSocket closed");
    ws.onerror = (e) => console.error("LiveWall WebSocket error:", e);

    fetchLeaderboard();
    return () => ws.close();
  }, []);

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â  Leaderboard Fetch
  // ------------------------------------------------------------
  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/leaderboard/recompute");
      const data = await res.json();
      if (Array.isArray(data?.leaderboard)) {
        setLeaderboard(
          data.leaderboard.map((e, i) => ({
            rank: i + 1,
            creator: e.creator,
            tribe: e.tribe,
            score: parseFloat(e.score || 0),
            level: e.level || "ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â",
            tokens: e.tokens || 0,
          }))
        );
      }
    } catch (err) {
      console.error("Leaderboard fetch failed:", err);
    }
  };

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨ Tribe Color Mapping
  // ------------------------------------------------------------
  const tribeColors = {
    Thinkers: "#60a5fa",
    Humorists: "#facc15",
    EventGoers: "#22c55e",
    Fashionists: "#ec4899",
  };

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â± Render
  // ------------------------------------------------------------
  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white">
      {/* Background Glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.4, 0.3] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-fuchsia-900/20 blur-3xl"
      />

      {/* Top Tribe Banner */}
      <div className="absolute top-4 left-0 right-0 z-20">
        <TopTribeBanner tribes={tribes} />
      </div>

      {/* Split-screen layout */}
      <div className="flex flex-col md:flex-row h-full relative z-10">
        {/* LEFT: Tribe Heatflow */}
        <div className="flex-1 flex items-center justify-center relative">
          <motion.div
            className="relative w-full h-[70vh]"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
          >
            <AnimatePresence>
              {Object.entries(tribes).map(([name, mood], i) => (
                <motion.div
                  key={name}
                  className="absolute flex flex-col items-center justify-center text-center"
                  style={{
                    top: `${40 + 20 * Math.sin(i * 1.5)}%`,
                    left: `${45 + 25 * Math.cos(i * 1.5)}%`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1 + parseFloat(mood) / 150,
                  }}
                  transition={{ duration: 1.5 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4 + i,
                    }}
                    className="w-20 h-20 rounded-full blur-lg"
                    style={{
                      backgroundColor: tribeColors[name] || "#888",
                      boxShadow: `0 0 25px ${tribeColors[name] || "#888"}99`,
                    }}
                  ></motion.div>
                  <span className="text-sm mt-2 text-gray-300 font-semibold">
                    {name}
                  </span>
                  <span className="text-xs text-yellow-400">{mood}% mood</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* RIGHT: Live Leaderboard */}
        <div className="flex-1 overflow-y-auto max-h-[85vh] p-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-purple-300">
            Live Creator Ranks
          </h2>
          <AnimatePresence>
            {leaderboard.map((entry) => (
              <motion.div
                key={entry.creator}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex justify-between items-center bg-gray-800/60 rounded-xl px-5 py-3 mb-3 shadow-md hover:bg-gray-700/60"
              >
                <div className="flex items-center gap-3 text-left">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="text-lg font-semibold text-purple-400"
                  >
                    #{entry.rank}
                  </motion.div>
                  <div>
                    <div className="font-bold">{entry.creator}</div>
                    <div className="text-xs text-gray-400">
                      {entry.tribe} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {entry.level}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <motion.div
                    key={entry.score}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-yellow-400"
                  >
                    {entry.score.toFixed(1)} pts
                  </motion.div>
                  <div className="text-xs text-gray-400">
                    Tokens: {entry.tokens}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


