// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Heatflow.jsx (MVP-41.5 Visual Pulse Edition)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Real-time sync with /ws/heatflow
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Live mini-charts per tribe (sentiment over time)
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Smooth reconnect + animated transitions
// ============================================================

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";

export default function Heatflow() {
  const [heatData, setHeatData] = useState({});
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let ws;
    let retryDelay = 2000;

    const connect = () => {
      ws = new WebSocket("ws://127.0.0.1:8000/ws/heatflow");

      ws.onopen = () => {
        console.log("ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Connected to Heatflow stream");
        setConnected(true);
        retryDelay = 2000;
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        if (msg.type === "init_heatflow") {
          console.log("ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Handshake received:", msg.message);
          setConnected(true);
        }

        if (msg.type === "update_heat") {
          setConnected(true);
          setHeatData((prev) => {
            const updated = { ...prev };
            msg.tribes.forEach((t) => {
              const history = updated[t.name]?.history || [];
              const newData = [...history, { sentiment: t.sentiment }];
              if (newData.length > 10) newData.shift(); // keep last 10
              updated[t.name] = { ...t, history: newData };
            });
            return updated;
          });
        }

        if (msg.type === "heartbeat") {
          console.log("ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã¢â‚¬Å“ Heatflow heartbeat");
          setConnected(true);
        }
      };

      ws.onclose = () => {
        console.warn("ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â´ Heatflow socket closed, retrying...");
        setConnected(false);
        setTimeout(connect, retryDelay);
        retryDelay = Math.min(retryDelay * 1.5, 15000);
      };

      ws.onerror = (err) => {
        console.error("WS error:", err);
        ws.close();
      };
    };

    connect();
    return () => ws && ws.close();
  }, []);

  const tribes = Object.values(heatData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-2">ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Tribe Heatflow</h1>
        <p className="text-sm opacity-70 mb-8">
          Real-time sentiment & micro-momentum visualization
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tribes.length ? (
          tribes.map((t, i) => (
            <motion.div
              key={i}
              className={`rounded-2xl border border-white/10 p-6 bg-gradient-to-br from-${getColor(
                t.sentiment
              )}-500/20 to-black/30 shadow-lg`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-2">{t.name}</h2>

              <Metric label="Sentiment" value={t.sentiment} />
              <Metric label="Momentum" value={t.momentum} />
              <Metric label="Heat Index" value={t.heat} />

              {/* ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¹ Mini Chart */}
              <div className="h-24 mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={t.history}>
                    <YAxis hide domain={[-1, 1]} />
                    <Tooltip
                      contentStyle={{
                        background: "#111",
                        border: "none",
                        color: "#fff",
                        fontSize: 12,
                      }}
                      formatter={(val) => val.toFixed(3)}
                    />
                    <Line
                      type="monotone"
                      dataKey="sentiment"
                      stroke={
                        t.sentiment > 0.3
                          ? "#22c55e"
                          : t.sentiment < -0.3
                          ? "#ef4444"
                          : "#eab308"
                      }
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center opacity-70 col-span-3">
            Waiting for heatflow updates...
          </p>
        )}
      </div>

      <p className="text-center text-xs mt-6">
        <span
          className={`transition-all duration-500 ${
            connected ? "text-green-400" : "text-red-400"
          }`}
        >
          {connected ? "ÃƒÂ°Ã…Â¸Ã…Â¸Ã‚Â¢ Live Heatflow Active" : "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â´ Disconnected (retrying...)"}
        </span>
      </p>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="flex justify-between text-sm mb-1">
      <span className="opacity-60">{label}</span>
      <span className="font-semibold">{value.toFixed(3)}</span>
    </div>
  );
}

function getColor(val) {
  if (val > 0.3) return "green";
  if (val < -0.3) return "red";
  return "yellow";
}


