// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ValueFunnel.jsx (v139.6 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œMerchant Intelligence + Tribe ConversionÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Adds per-tribe conversion analytics (DPP/IPM/MTS)
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Unified live funnel visualization
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ WS auto-reconnect + intensity-driven updates
// ============================================================

import { motion } from "framer-motion";

export default function ValueFunnel() {
  const [funnel, setFunnel] = useState({
    content: 68,
    tokens: 54,
    dpp: 45,
    ipm: 39,
    influence: 31,
    governance: 28,
    mastery: 23,
  });
  const [tribeScores, setTribeScores] = useState({
    Adventurers: { DPP: 0, IPM: 0, MTS: 0 },
    Techy: { DPP: 0, IPM: 0, MTS: 0 },
    EventGoers: { DPP: 0, IPM: 0, MTS: 0 },
    Fashionists: { DPP: 0, IPM: 0, MTS: 0 },
  });
  const [wsStatus, setWsStatus] = useState("Offline");
  const wsRef = useRef(null);

  // ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â Connect WebSocket
  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket("ws://127.0.0.1:8000/ws/simulation");
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ [ValueFunnel] Connected");
        setWsStatus("Online");
      };

      ws.onclose = () => {
        setWsStatus("Reconnecting...");
        setTimeout(connect, 4000);
      };

      ws.onerror = () => setWsStatus("Error");

      ws.onmessage = (msg) => {
        try {
          const data = JSON.parse(msg.data);
          if (data.intensity) {
            const delta = Math.min(data.intensity * 10, 5);
            setFunnel((prev) => ({
              ...prev,
              dpp: Math.min(prev.dpp + delta, 80),
              ipm: Math.min(prev.ipm + delta * 0.8, 70),
              influence: Math.min(prev.influence + delta * 0.5, 60),
            }));

            // ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¹ Update tribe conversion simulation
            setTribeScores((prev) => {
              const updated = { ...prev };
              Object.keys(updated).forEach((tribe) => {
                const base = Math.random() * 0.4 + 0.6; // engagement simulation
                const DPP = Math.min(base * 100, 100);
                const IPM = Math.min(base * 80 + data.intensity * 20, 100);
                const MTS = Math.round(0.6 * DPP + 0.4 * IPM);
                updated[tribe] = { DPP, IPM, MTS };
              });
              return updated;
            });
          }
        } catch (err) {
          console.warn("ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â WS Parse Error:", err);
        }
      };
    };

    connect();
    return () => wsRef.current && wsRef.current.close();
  }, []);

  const stages = [
    { label: "Content", value: funnel.content, color: "from-cyan-500 to-sky-500" },
    { label: "Tokens", value: funnel.tokens, color: "from-emerald-500 to-green-500" },
    { label: "Merchant: Direct Purchase (DPP)", value: funnel.dpp, color: "from-amber-500 to-yellow-500" },
    { label: "Merchant: Influence-on-Purchase (IPM)", value: funnel.ipm, color: "from-orange-500 to-rose-500" },
    { label: "Influence Gain", value: funnel.influence, color: "from-violet-500 to-purple-500" },
    { label: "Tribe Governance (Add/Kick)", value: funnel.governance, color: "from-blue-500 to-indigo-500" },
    { label: "Tribe Mastery Progress", value: funnel.mastery, color: "from-rose-500 to-pink-500" },
  ];

  const colorMap = {
    Adventurers: "text-blue-400",
    Techy: "text-yellow-400",
    EventGoers: "text-pink-400",
    Fashionists: "text-purple-400",
  };

  return (
    <div className="min-h-[90vh] bg-[#0d1117] text-gray-200 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: Funnel View */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-cyan-400">ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€  Value Funnel</h1>
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

        <div className="space-y-4">
          {stages.map((stage, i) => (
            <motion.div
              key={i}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: `${stage.value}%`, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className={`bg-gradient-to-r ${stage.color} rounded-lg h-10 flex items-center pl-4 shadow-lg`}
            >
              <div className="flex justify-between w-full pr-4">
                <span className="font-semibold">{stage.label}</span>
                <span className="text-sm text-gray-100">{stage.value.toFixed(1)}%</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-xs text-gray-400">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡ <b>Merchant Targeting</b> now splits into two channels:
          <br />ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ <span className="text-amber-400">DPP</span>: Direct purchase behavior.
          <br />ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ <span className="text-orange-400">IPM</span>: Influence-based conversion power.
        </div>
      </div>

      {/* Right: Tribe Merchant Intelligence */}
      <div className="bg-[#111827] rounded-xl border border-gray-700 p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-pink-400 mb-4">ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â  Tribe Conversion Intelligence</h2>
        <table className="w-full text-sm">
          <thead className="border-b border-gray-700 text-gray-400">
            <tr>
              <th className="text-left py-2">Tribe</th>
              <th className="text-center py-2">DPP</th>
              <th className="text-center py-2">IPM</th>
              <th className="text-center py-2">MTS</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(tribeScores).map((t) => (
              <motion.tr
                key={t}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="border-b border-gray-800 hover:bg-[#1a2233]"
              >
                <td className={`py-2 font-semibold ${colorMap[t] || ""}`}>{t}</td>
                <td className="text-center py-2 text-amber-400">{tribeScores[t].DPP.toFixed(1)}%</td>
                <td className="text-center py-2 text-orange-400">{tribeScores[t].IPM.toFixed(1)}%</td>
                <td className="text-center py-2 text-cyan-400 font-bold">{tribeScores[t].MTS.toFixed(1)}%</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


