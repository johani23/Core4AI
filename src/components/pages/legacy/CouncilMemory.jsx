// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CouncilMemory.jsx (MVP-52 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œAI Memory CorrelationÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Live Learning-Index feed from /ws/memory
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Contrast-Analytics theme (dark-slate + violet-blue charts)
// ============================================================

import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend, BarChart, Bar
} from "recharts";
import { motion } from "framer-motion";

export default function CouncilMemory() {
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState("");
  const wsRef = useRef(null);

  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket("ws://127.0.0.1:8000/ws/memory");
      wsRef.current = ws;
      ws.onopen = () => setConnected(true);
      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.type === "memory_update") {
          const p = {
            time: new Date().toLocaleTimeString(),
            index: msg.learning_index * 100,
            correlation: msg.correlation,
            pattern: msg.pattern,
          };
          setData((prev) => [...prev.slice(-25), p]);
          setSummary(
            `The council is showing ${msg.pattern} behavior with a correlation of ${msg.correlation}.`
          );
        }
      };
      ws.onclose = () => {
        setConnected(false);
        setTimeout(connect, 4000);
      };
    };
    connect();
    return () => wsRef.current && wsRef.current.close();
  }, []);

  const patternColor = (pattern) =>
    pattern === "adaptive"
      ? "text-green-400"
      : pattern === "repetitive"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="min-h-screen bg-[#111827] text-gray-200 px-10 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-indigo-300">
          ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Council Memory Correlation
        </h1>
        <div
          className={`px-3 py-1 text-sm rounded-full ${
            connected ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-400"
          }`}
        >
          {connected ? "Live Feed Active" : "Disconnected"}
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-black/40 border border-indigo-800/40 rounded-2xl p-5 mb-6">
        <h2 className="text-lg font-medium text-indigo-300 mb-3">
          Learning Index Over Time
        </h2>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" tick={{ fill: "#aaa" }} />
              <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                labelStyle={{ color: "#ccc" }}
                formatter={(v, name) => [`${v.toFixed(1)}`, name]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="index"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Correlation Strength */}
      <div className="bg-black/40 border border-indigo-800/40 rounded-2xl p-5 mb-6">
        <h2 className="text-lg font-medium text-indigo-300 mb-3">
          DecisionÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“Mood Correlation Strength
        </h2>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.slice(-10)}>
              <XAxis dataKey="time" tick={{ fill: "#aaa", fontSize: 10 }} />
              <YAxis domain={[-1, 1]} />
              <Tooltip />
              <Bar dataKey="correlation" fill="#818cf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insight Summary */}
      {data.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-black/30 border border-indigo-800/30 rounded-xl p-4 text-center"
        >
          <p className={`text-base ${patternColor(data[data.length - 1].pattern)}`}>
            {summary}
          </p>
        </motion.div>
      )}
    </div>
  );
}


