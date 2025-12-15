/**
 * ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â© Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Engagement Debug Panel
 * -------------------------------------------------------
 * Displays real-time engagement logs from useEngagementTracker().
 * Appears as a small floating console in the corner.
 * Automatically hides in production builds.
 */

import { motion, AnimatePresence } from "framer-motion";

export default function EngagementDebugPanel() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (import.meta.env.MODE === "production") return; // Disable in production

    const handler = (e) => {
      if (e.detail && e.detail.event) {
        setLogs((prev) => [
          { ...e.detail, id: Date.now() },
          ...prev.slice(0, 8), // keep latest 8
        ]);
      }
    };

    window.addEventListener("core4ai:engagement", handler);
    return () => window.removeEventListener("core4ai:engagement", handler);
  }, []);

  if (import.meta.env.MODE === "production") return null;

  return (
    <AnimatePresence>
      {logs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-5 right-5 bg-gray-900/90 text-yellow-400 text-xs rounded-lg p-3 w-64 border border-gray-700 shadow-lg z-50"
        >
          <div className="font-bold text-purple-400 mb-2">
            ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â Engagement Tracker
          </div>
          <div className="max-h-40 overflow-y-auto space-y-1">
            {logs.map((log) => (
              <div key={log.id}>
                <span className="text-white">{log.event}</span>{" "}
                <span className="text-gray-500">({log.value})</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


