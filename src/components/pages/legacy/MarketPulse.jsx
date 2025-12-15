// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ MarketPulse.jsx (MVP-27.7 Visual Pulse Edition)
// ------------------------------------------------------------
// Displays latest tribe market events with dopamine animation
// Compatible with backend route: GET /market/pulse
// ============================================================

import { motion, AnimatePresence } from "framer-motion";
import { RefreshCcw } from "lucide-react";

export default function MarketPulse() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  async function fetchPulse() {
    try {
      setRefreshing(true);
      const res = await fetch("http://127.0.0.1:8000/market/pulse");
      if (!res.ok) throw new Error("Failed to load market pulse");
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â Pulse error:", err);
      setError("Unable to fetch market data.");
    } finally {
      setLoading(false);
      setTimeout(() => setRefreshing(false), 600);
    }
  }

  useEffect(() => {
    fetchPulse();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-yellow-400 animate-pulse">
        Loading Market Pulse...
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-red-400">
        <p>{error}</p>
        <button
          onClick={fetchPulse}
          className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-xl hover:bg-yellow-400"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-400 flex items-center gap-2">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¹ Market Pulse
        </h1>
        <button
          onClick={fetchPulse}
          disabled={refreshing}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            refreshing
              ? "bg-gray-700 cursor-wait"
              : "bg-emerald-500 hover:bg-emerald-400 text-black"
          }`}
        >
          <RefreshCcw
            size={18}
            className={refreshing ? "animate-spin" : ""}
          />
          {refreshing ? "Refreshing..." : "Refresh Pulse"}
        </button>
      </div>

      <AnimatePresence>
        {events.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-center mt-10"
          >
            No recent market news.
          </motion.p>
        ) : (
          <div className="flex flex-col gap-4">
            {events.map((e, i) => (
              <motion.div
                key={e.id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="border border-zinc-800 rounded-xl p-4 bg-gradient-to-br from-zinc-900 to-black shadow-lg hover:shadow-emerald-400/20 transition-all"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-yellow-400">
                    {e.tribe || "Unknown Tribe"}
                  </h2>
                  <span className="text-xs text-gray-500">
                    {e.created_at}
                  </span>
                </div>
                <p className="text-gray-300 mt-2">{e.message}</p>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


