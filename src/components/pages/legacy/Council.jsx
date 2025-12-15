// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Council.jsx (v137.9 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œSynaptic Stability + Ping MonitorÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Fixes multi-socket duplication (clean close on unmount)
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Adds Ping Monitor ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ live count of WS messages per minute
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Keeps mood sync, normalized dopamine, and D-index animation
// ============================================================

import { motion } from "framer-motion";

export default function Council() {
  const [tribes, setTribes] = useState({});
  const [dindex, setDindex] = useState(0);
  const [wsStatus, setWsStatus] = useState("Offline");
  const [mood, setMood] = useState("Stable");
  const [pingCount, setPingCount] = useState(0);
  const pingRef = useRef(0);
  const wsRef = useRef(null);

  // ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨ mood color scale
  const getMoodColor = () => {
    if (dindex >= 70) return "text-green-400";
    if (dindex >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  // ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â WebSocket logic
  useEffect(() => {
    let ws;
    const connect = () => {
      ws = new WebSocket("ws://127.0.0.1:8000/ws/synaptic");
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ [Council] Connected to /ws/synaptic");
        setWsStatus("Online");
      };

      ws.onclose = () => {
        console.warn("ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â [Council] WS Closed ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ reconnecting in 3s");
        setWsStatus("Reconnecting...");
        setTimeout(connect, 3000);
      };

      ws.onerror = (err) => {
        console.error("ÃƒÂ¢Ã‚ÂÃ…â€™ [Council] WS Error:", err);
        setWsStatus("Error");
      };

      ws.onmessage = (msg) => {
        try {
          const data = JSON.parse(msg.data);
          if (data.heatmap && data.influence_share) {
            pingRef.current += 1;
            const updated = {};
            Object.keys(data.heatmap).forEach((k) => {
              updated[k] = {
                dopamine: data.heatmap[k] * 100,
                influence: data.influence_share[k],
              };
            });
            setTribes(updated);
            setDindex(data.dindex || 0);
            setMood(
              data.dindex >= 70
                ? "Thriving"
                : data.dindex >= 50
                ? "Stable"
                : "Volatile"
            );
          }
        } catch (err) {
          console.error("ÃƒÂ¢Ã‚ÂÃ…â€™ [Council] Parse Error:", err);
        }
      };
    };

    connect();

    // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¹ cleanup ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ close previous socket properly
    return () => {
      console.log("ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â» [Council] Closing WS connection");
      ws && ws.close();
    };
  }, []);

  // ÃƒÂ¢Ã‚ÂÃ‚Â±ÃƒÂ¯Ã‚Â¸Ã‚Â Ping monitor ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ update every 60s
  useEffect(() => {
    const interval = setInterval(() => {
      setPingCount(pingRef.current);
      pingRef.current = 0;
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const colorMap = {
    Adventurers: "text-blue-400",
    Techy: "text-yellow-400",
    EventGoers: "text-pink-400",
    Fashionists: "text-purple-400",
  };

  return (
    <div className="bg-[#0d1117] text-gray-200 min-h-[90vh] p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-pink-400 flex items-center gap-2">
          ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Council Board
        </h1>
        <div className="flex gap-4 text-sm">
          <span>
            D-Index: <b className={getMoodColor()}>{dindex.toFixed(1)}</b>
          </span>
          <span
            className={`px-2 py-1 rounded-md ${
              wsStatus === "Online"
                ? "bg-green-600"
                : wsStatus === "Reconnecting..."
                ? "bg-yellow-600"
                : "bg-red-600"
            }`}
          >
            WS: {wsStatus}
          </span>
        </div>
      </div>

      {/* Tribe Table */}
      <div className="bg-[#111827] rounded-xl border border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#1f2937] text-gray-300 uppercase">
            <tr>
              <th className="text-left py-2 px-4">Tribe</th>
              <th className="text-left py-2 px-4">Dopamine</th>
              <th className="text-left py-2 px-4">Influence Share</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(tribes).map((name) => (
              <motion.tr
                key={name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="border-b border-gray-800 hover:bg-[#1a2233]"
              >
                <td className={`py-2 px-4 font-semibold ${colorMap[name] || ""}`}>
                  {name}
                </td>
                <td className="py-2 px-4">
                  {tribes[name].dopamine?.toFixed(1)}%
                </td>
                <td className="py-2 px-4">
                  {tribes[name].influence?.toFixed(1)}%
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* D-Index Progress */}
      <div className="mt-6">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-2 ${getMoodColor().replace("text-", "bg-")}`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(dindex, 100)}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          D-Index {dindex.toFixed(2)}%
        </p>
      </div>

      {/* Current Mood */}
      <div className="mt-6 bg-[#111827] rounded-xl p-4 border border-gray-700 flex justify-between items-center">
        <div className="text-sm text-gray-300">
          <span className="text-gray-400">Current D-Index:</span>{" "}
          <b className={getMoodColor()}>{dindex.toFixed(2)}%</b>
        </div>
        <motion.div
          className={`px-3 py-1 rounded-lg text-sm font-semibold shadow-md ${
            mood === "Thriving"
              ? "bg-green-700 text-white"
              : mood === "Stable"
              ? "bg-yellow-600 text-white"
              : "bg-red-600 text-white"
          }`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          {mood === "Thriving"
            ? "Stable / Thriving"
            : mood === "Stable"
            ? "Balanced State"
            : "Volatile Phase"}
        </motion.div>
      </div>

      {/* ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¡ Ping Monitor */}
      <div className="absolute top-6 right-6 text-xs bg-gray-900 border border-gray-700 px-3 py-1 rounded-lg shadow">
        <span className="text-gray-400">Ping/min:</span>{" "}
        <b className="text-indigo-400">{pingCount}</b>
      </div>
    </div>
  );
}


