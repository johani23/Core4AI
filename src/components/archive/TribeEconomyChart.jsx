// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ TribeEconomyMonitor.jsx (v162.1 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œToken Value Live GraphÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Real-time tokenValue visualization for each tribe
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Pulls live data from CoreSyncContext
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Auto-updates every 10 s with smooth animation
// ============================================================

import { useCoreSync } from "@context/CoreSyncContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function TribeEconomyMonitor() {
  const { tribes } = useCoreSync();
  const [history, setHistory] = useState([]);

  // snapshot values every 10 s
  useEffect(() => {
    const stamp = {
      time: new Date().toLocaleTimeString(),
      ...Object.fromEntries(tribes.map((t) => [t.name, t.tokenValue])),
    };
    setHistory((prev) => [...prev.slice(-50), stamp]); // keep last 50 points
  }, [tribes]);

  return (
    <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6">
      <h3 className="text-pink-400 font-semibold mb-2">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€  Tribe Token Value Monitor
      </h3>
      <p className="text-gray-400 text-sm mb-4">
        Real-time token value dynamics per tribe (updates every 10 s)
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={history}>
          <XAxis dataKey="time" hide />
          <YAxis domain={[0.5, 1.5]} />
          <Tooltip />
          <Legend />
          {tribes.map((t, i) => (
            <Line
              key={t.name}
              type="monotone"
              dataKey={t.name}
              stroke={["#10b981", "#3b82f6", "#f472b6", "#facc15"][i % 4]}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


