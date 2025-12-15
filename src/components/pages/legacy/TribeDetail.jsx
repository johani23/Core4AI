// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ TribeDetail.jsx (MVP-57 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œInsight ModeÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// Mini radar chart for tribe members
// + Compare to League button
// ============================================================

import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Radar } from "react-chartjs-2";
import "chart.js/auto";

const API_BASE = "http://127.0.0.1:8000";

export default function TribeDetail() {
  const { name } = useParams();
  const [tribeData, setTribeData] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`${API_BASE}/creators`);
      const data = await res.json();
      const members = data.filter((c) => c.tribe.toLowerCase() === name.toLowerCase());
      if (members.length) {
        const avgVis = members.reduce((a, b) => a + b.vis_score, 0) / members.length;
        setTribeData({ tribe: name, members, avgVis });
      }
    }
    load();
  }, [name]);

  if (!tribeData)
    return <div className="flex h-screen items-center justify-center text-gray-400">Loading...</div>;

  const radarData = {
    labels: tribeData.members.map((m) => m.name),
    datasets: [
      {
        label: "Member VIS",
        data: tribeData.members.map((m) => (m.vis_score * 100).toFixed(1)),
        backgroundColor: "rgba(236,72,153,0.2)",
        borderColor: "#ec4899",
        pointBackgroundColor: "#f472b6",
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        ticks: { color: "#aaa" },
        grid: { color: "rgba(255,255,255,0.1)" },
        pointLabels: { color: "#ddd" },
        suggestedMax: 100,
      },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Link to="/tribes" className="text-sm text-purple-400 hover:text-purple-300">ÃƒÂ¢Ã¢â‚¬Â Ã‚Â Back to Tribes</Link>
      <div className="flex justify-between items-center mt-4 mb-3">
        <h1 className="text-3xl font-bold text-pink-400">Tribe {tribeData.tribe}</h1>
        <button
          onClick={() => (window.location.href = "/tribes")}
          className="px-3 py-1 text-sm bg-purple-700 hover:bg-purple-600 rounded-lg text-white"
        >
          Compare with League
        </button>
      </div>
      <p className="text-gray-400 mb-6">
        Members: {tribeData.members.length} | Avg VIS{" "}
        <span className="text-pink-300 font-semibold">{(tribeData.avgVis * 100).toFixed(1)}%</span>
      </p>

      {/* Mini Radar */}
      <div className="p-6 bg-gray-900/60 border border-purple-800/30 rounded-2xl mb-8 shadow-lg">
        <h2 className="text-lg text-purple-300 mb-3 font-semibold text-center">Tribe Insight Map</h2>
        <Radar data={radarData} options={radarOptions} />
      </div>

      {/* Members List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tribeData.members.map((m) => {
          const visPct = (m.vis_score * 100).toFixed(1);
          return (
            <motion.div
              key={m.id}
              whileHover={{ scale: 1.04 }}
              className="relative bg-gray-900/70 border border-purple-800/30 rounded-2xl p-6 overflow-hidden shadow-lg"
            >
              <motion.div
                className="absolute top-3 right-3 w-4 h-4 rounded-full bg-pink-400"
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1.5 - m.vis_score }}
              />
              <h3 className="text-lg font-semibold text-purple-300 mb-1">{m.name}</h3>
              <p className="text-sm text-gray-400 mb-2">VIS: <span className="text-pink-400">{visPct}%</span></p>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${visPct}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}


