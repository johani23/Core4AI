// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â  Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ LeagueAnalyticsHeatmap.jsx (MVP-53.9)
// ------------------------------------------------------------
// Live heatmap of Council votes & fairness index
// Uses WebSocket (VIS stream) + Recharts Cell coloring
// ============================================================

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip } from "recharts";
import useVISSocket from "@hooks/useVISSocket";
import { motion } from "framer-motion";

const COUNCIL = ["Noor", "Sama", "Rami", "Nova", "Zayd"];
const API_BASE = "http://127.0.0.1:8000";

export default function LeagueAnalyticsHeatmap() {
  const [data, setData] = useState([]);

  // Initialize creators as rows
  useEffect(() => {
    fetch(`${API_BASE}/creators`)
      .then((res) => res.json())
      .then((d) =>
        setData(
          d.creators.map((c) => ({
            name: c.name,
            vis: c.vis_score,
            votes: COUNCIL.map(() => 0),
          }))
        )
      );
  }, []);

  // Listen for live vote updates
  useVISSocket((pkt) => {
    if (pkt.type !== "vis_update") return;
    setData((prev) =>
      prev.map((row, i) =>
        i === pkt.creator_id - 1
          ? {
              ...row,
              vis: pkt.new_vis,
              votes: row.votes.map((v, j) =>
                j === Math.floor(Math.random() * COUNCIL.length) ? v + 1 : v
              ),
            }
          : row
      )
    );
  });

  // Derive fairness index (stdev of votes)
  const fairness =
    data.length > 0
      ? Math.round(
          100 -
            (Math.sqrt(
              data
                .flatMap((r) => r.votes)
                .reduce((acc, v, _, arr) => acc + Math.pow(v - arr.reduce((a, b) => a + b) / arr.length, 2), 0) /
                (data.length * COUNCIL.length)
            ) *
              100)
        )
      : 0;

  const colors = ["#ff005c", "#ff7a00", "#ffcc00", "#00ff99", "#00ccff"];

  return (
    <div className="p-6">
      <motion.h1
        className="text-2xl font-bold text-purple-400 mb-4"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
      >
        League Analytics Heatmap
      </motion.h1>
      <p className="text-sm text-gray-400 mb-4">
        Fairness Index:{" "}
        <span
          className={`font-semibold ${
            fairness > 80 ? "text-green-400" : fairness > 60 ? "text-yellow-400" : "text-red-400"
          }`}
        >
          {fairness}%
        </span>
      </p>

      <div className="w-full h-72 bg-gray-950 rounded-xl p-4 border border-gray-800">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 20, bottom: 5, left: 50 }}
          >
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#999" }}
              width={80}
            />
            <XAxis type="number" hide />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{ background: "#111", border: "none" }}
            />
            <Bar dataKey="vis" barSize={20}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[Math.floor(entry.vis * (colors.length - 1))]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        * Each bar color represents average VIS. Updates in real time with every Council vote.
      </p>
    </div>
  );
}


