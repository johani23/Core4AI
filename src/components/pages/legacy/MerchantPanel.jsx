// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ MerchantPanel.jsx (v140.2 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œCommercial ReadinessÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Displays top tribes by Merchant Target Index (MTI)
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Real-time WS updates from /ws/simulation
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Auto-calculated DPP/IPM/MTI + Trend indicator
// ============================================================

import { motion } from "framer-motion";

export default function MerchantPanel() {
  const [tribeStats, setTribeStats] = useState({
    Adventurers: { DPP: 0, IPM: 0, MTI: 0, trend: 0 },
    Techy: { DPP: 0, IPM: 0, MTI: 0, trend: 0 },
    EventGoers: { DPP: 0, IPM: 0, MTI: 0, trend: 0 },
    Fashionists: { DPP: 0, IPM: 0, MTI: 0, trend: 0 },
  });
  const [topTribes, setTopTribes] = useState([]);
  const [wsStatus, setWsStatus] = useState("Offline");
  const wsRef = useRef(null);

  // ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â Connect WebSocket
  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket("ws://127.0.0.1:8000/ws/simulation");
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ [MerchantPanel] Connected");
        setWsStatus("Online");
      };

      ws.onclose = () => {
        console.warn("ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â WS Closed ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ reconnecting...");
        setWsStatus("Reconnecting...");
        setTimeout(connect, 4000);
      };

      ws.onerror = (err) => {
        console.error("ÃƒÂ¢Ã‚ÂÃ…â€™ WS Error:", err);
        setWsStatus("Error");
      };

      ws.onmessage = (msg) => {
        try {
          const data = JSON.parse(msg.data);
          if (data.intensity) {
            // ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¹ Simulate per-tribe metrics from event intensity
            const updated = {};
            Object.keys(tribeStats).forEach((t) => {
              const base = Math.random() * 0.3 + 0.7;
              const DPP = Math.min(base * 100, 100);
              const IPM = Math.min((base + data.intensity * 0.3) * 80, 100);
              const MTI = Math.round(0.6 * DPP + 0.4 * IPM);
              const trend = Math.round((Math.random() - 0.5) * 10); // Ãƒâ€šÃ‚Â±10 trend
              updated[t] = { DPP, IPM, MTI, trend };
            });
            setTribeStats(updated);

            // Sort top 3
            const sorted = Object.entries(updated)
              .sort((a, b) => b[1].MTI - a[1].MTI)
              .slice(0, 3);
            setTopTribes(sorted);
          }
        } catch (err) {
          console.warn("ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â WS Parse Error:", err);
        }
      };
    };

    connect();
    return () => wsRef.current && wsRef.current.close();
  }, []);

  const colorMap = {
    Adventurers: "from-blue-500 to-sky-500",
    Techy: "from-yellow-400 to-amber-500",
    EventGoers: "from-pink-400 to-rose-500",
    Fashionists: "from-purple-500 to-violet-500",
  };

  return (
    <div className="min-h-[85vh] bg-[#0d1117] text-gray-200 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° Merchant Target Panel
        </h1>
        <span
          className={`px-3 py-1 rounded-md text-sm ${
            wsStatus === "Online"
              ? "bg-green-700"
              : wsStatus === "Reconnecting..."
              ? "bg-yellow-600"
              : "bg-red-600"
          }`}
        >
          WS: {wsStatus}
        </span>
      </div>

      {/* ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â  Top Tribes */}
      <div className="grid md:grid-cols-3 gap-4">
        {topTribes.map(([name, stats], i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-5 rounded-xl bg-gradient-to-br ${colorMap[name]} shadow-lg`}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-white">{name}</h2>
              <span className="text-xs bg-black/40 px-2 py-1 rounded-md text-gray-200">
                Rank #{i + 1}
              </span>
            </div>
            <div className="text-sm">
              <p>ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ¢â‚¬â„¢ DPP: <b>{stats.DPP.toFixed(1)}%</b></p>
              <p>ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â IPM: <b>{stats.IPM.toFixed(1)}%</b></p>
              <p>ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â  MTI: <b>{stats.MTI.toFixed(1)}%</b></p>
              <p
                className={`mt-1 text-xs ${
                  stats.trend > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {stats.trend > 0 ? "ÃƒÂ¢Ã¢â‚¬â€œÃ‚Â²" : "ÃƒÂ¢Ã¢â‚¬â€œÃ‚Â¼"} {Math.abs(stats.trend)}% weekly
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â  Full Table */}
      <div className="mt-8 bg-[#111827] rounded-xl border border-gray-700 p-4">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-700 text-gray-400">
            <tr>
              <th className="text-left py-2">Tribe</th>
              <th className="text-center py-2">DPP</th>
              <th className="text-center py-2">IPM</th>
              <th className="text-center py-2">MTI</th>
              <th className="text-center py-2">Trend</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(tribeStats).map(([t, s]) => (
              <motion.tr
                key={t}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="border-b border-gray-800 hover:bg-[#1a2233]"
              >
                <td className="py-2 font-semibold text-gray-300">{t}</td>
                <td className="text-center text-amber-400">{s.DPP.toFixed(1)}%</td>
                <td className="text-center text-orange-400">{s.IPM.toFixed(1)}%</td>
                <td className="text-center text-emerald-400 font-bold">{s.MTI.toFixed(1)}%</td>
                <td
                  className={`text-center ${
                    s.trend > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {s.trend > 0 ? "ÃƒÂ¢Ã¢â‚¬â€œÃ‚Â²" : "ÃƒÂ¢Ã¢â‚¬â€œÃ‚Â¼"} {Math.abs(s.trend)}%
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


