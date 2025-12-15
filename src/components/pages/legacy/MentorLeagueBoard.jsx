// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ MentorLeagueBoard.jsx (MVP-86 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œMentor League BoardÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Fetches analytics from /mentor/analytics
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Displays leaderboard + scatter chart (efficiency vs retention)
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Click mentor name ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ detailed history timeline
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Auto refresh every 15 s
// ============================================================

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function MentorLeagueBoard() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [history, setHistory] = useState([]);

  // --- Fetch analytics periodically
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/mentor/analytics");
        const json = await res.json();
        setData(json.analytics || []);
      } catch (e) {
        console.warn("Analytics fetch failed:", e);
      }
    };
    fetchData();
    const loop = setInterval(fetchData, 15000);
    return () => clearInterval(loop);
  }, []);

  // --- Fetch mentor history
  const loadHistory = async (name) => {
    setSelected(name);
    try {
      const res = await fetch(`http://127.0.0.1:8000/mentor/history/${name}`);
      const json = await res.json();
      setHistory(json.history || []);
    } catch (e) {
      console.warn("History fetch failed:", e);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-purple-400">
          ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Mentor League Board
        </h1>
        <span className="text-gray-400 text-sm">
          Auto-refresh every 15 seconds
        </span>
      </div>

      {/* Scatter Chart */}
      <div className="w-full h-80 bg-gray-900/70 border border-purple-400/30 rounded-2xl p-4 mb-8">
        <div className="text-center text-sm text-purple-300 font-semibold mb-2">
          Efficiency vs Retention
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
            <CartesianGrid stroke="#444" />
            <XAxis
              type="number"
              dataKey="efficiency_index"
              name="Efficiency"
              domain={[0, "auto"]}
              tick={{ fill: "#aaa" }}
            />
            <YAxis
              type="number"
              dataKey="retention_score"
              name="Retention"
              domain={[0, 1]}
              tick={{ fill: "#aaa" }}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                background: "rgba(30,30,40,0.9)",
                border: "none",
                color: "#fff",
                fontSize: "0.8rem",
              }}
              formatter={(v, n) => [v.toFixed(2), n]}
            />
            <Scatter
              name="Mentors"
              data={data}
              fill="#a855f7"
              onClick={(p) => loadHistory(p.mentor)}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto bg-gray-900/80 border border-purple-400/30 rounded-2xl p-4 mb-10">
        <table className="w-full text-sm text-left">
          <thead className="text-purple-300 border-b border-gray-700">
            <tr>
              <th className="p-2">Mentor</th>
              <th className="p-2">Total Growth</th>
              <th className="p-2">Sessions</th>
              <th className="p-2">Unique Apprentices</th>
              <th className="p-2">Efficiency Index</th>
              <th className="p-2">Retention</th>
            </tr>
          </thead>
          <tbody>
            {data.map((m, i) => (
              <tr
                key={i}
                className={`border-b border-gray-800 hover:bg-gray-800/40 cursor-pointer ${
                  selected === m.mentor ? "bg-purple-800/30" : ""
                }`}
                onClick={() => loadHistory(m.mentor)}
              >
                <td className="p-2 font-semibold text-purple-300">
                  {m.mentor}
                </td>
                <td className="p-2">{m.total_growth}</td>
                <td className="p-2">{m.sessions}</td>
                <td className="p-2">{m.unique_apprentices}</td>
                <td className="p-2 text-emerald-400">
                  {m.efficiency_index.toFixed(2)}
                </td>
                <td className="p-2 text-blue-400">
                  {(m.retention_score * 100).toFixed(0)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mentor History Detail */}
      {selected && (
        <div className="bg-gray-900/90 border border-emerald-400/40 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-emerald-300 font-semibold text-lg">
              {selected} ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Growth History
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg border border-emerald-400/30"
            >
              Close
            </button>
          </div>

          {history.length === 0 ? (
            <div className="text-gray-500 text-sm">No history yetÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦</div>
          ) : (
            <>
              <div className="w-full h-56 mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={history.map((h, i) => ({
                      index: i + 1,
                      growth: h.growth,
                    }))}
                  >
                    <XAxis
                      dataKey="index"
                      tick={{ fill: "#aaa", fontSize: 10 }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, "auto"]}
                      tick={{ fill: "#aaa", fontSize: 10 }}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(30,30,40,0.9)",
                        border: "none",
                        color: "#fff",
                        fontSize: "0.7rem",
                      }}
                      formatter={(v) => [`+${v}`, "Growth"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="growth"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="max-h-56 overflow-y-auto text-xs">
                {history
                  .slice()
                  .reverse()
                  .map((h, i) => (
                    <div
                      key={i}
                      className="mb-1 p-2 rounded border border-gray-700 bg-gray-800/40"
                    >
                      <div className="flex justify-between">
                        <span className="text-emerald-400">
                          +{h.growth}% {h.axis}
                        </span>
                        <span className="text-gray-400">
                          {new Date(h.time).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-gray-300 mt-1">
                        Mentored ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ {h.apprentice}
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}


