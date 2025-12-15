// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ LeagueIntelligenceHub.jsx (v55.3 Live WebSocket Edition)
// ------------------------------------------------------------
// Real-time Council analytics dashboard
//  - Fairness Index (auto-updates)
//  - Council Bias Radar (Recharts)
//  - VIS Heatmap (creator sentiment)
//  - Live WebSocket data sync from backend
// ============================================================

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from "recharts";

export default function LeagueIntelligenceHub() {
  const [creators, setCreators] = useState([]);
  const [fairness, setFairness] = useState(0);
  const [liveStatus, setLiveStatus] = useState("ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â´ Disconnected");
  const socketRef = useRef(null);

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Calculate Fairness dynamically
  // ------------------------------------------------------------
  const updateFairness = (data) => {
    if (!data || data.length === 0) return;
    const maxVis = Math.max(...data.map((c) => c.vis_score));
    const minVis = Math.min(...data.map((c) => c.vis_score));
    const fairnessIndex = (1 - (maxVis - minVis) / (maxVis || 1)) * 100;
    setFairness(fairnessIndex.toFixed(2));
  };

  // ------------------------------------------------------------
  // ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â Initial Fetch (on page load)
  // ------------------------------------------------------------
  async function fetchInitialData() {
    try {
      const res = await fetch("http://127.0.0.1:8000/creators");
      const data = await res.json();
      setCreators(data.creators || []);
      updateFairness(data.creators);
    } catch (err) {
      console.error("Initial fetch error:", err);
    }
  }

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â Live WebSocket Stream
  // ------------------------------------------------------------
  useEffect(() => {
    fetchInitialData();

    const socket = new WebSocket("ws://127.0.0.1:8000/ws/council");
    socketRef.current = socket;

    socket.onopen = () => {
      setLiveStatus("ÃƒÂ°Ã…Â¸Ã…Â¸Ã‚Â¢ Live");
      console.log("ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Connected to council WebSocket");
    };

    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);

        // Handle various payload structures
        if (payload.creators) {
          setCreators(payload.creators);
          updateFairness(payload.creators);
        } else if (payload.type === "update") {
          // Example: {"type": "update", "creator": "Noor", "vis": 0.823}
          setCreators((prev) =>
            prev.map((c) =>
              c.name === payload.creator ? { ...c, vis_score: payload.vis } : c
            )
          );
          updateFairness(creators);
        }
      } catch (err) {
        console.error("WebSocket message error:", err);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      setLiveStatus("ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â Error");
    };

    socket.onclose = () => {
      console.log("ÃƒÂ¢Ã‚ÂÃ…â€™ Council WebSocket closed");
      setLiveStatus("ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â´ Disconnected");
      setTimeout(() => {
        setLiveStatus("Reconnecting...");
        fetchInitialData();
      }, 4000);
    };

    return () => socket.close();
  }, []);

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â© Render
  // ------------------------------------------------------------
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-1">ÃƒÂ¢Ã…Â¡Ã‚Â¡ AI Arena ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Live Intelligence Hub</h1>
      <p className="text-gray-400 mb-4">
        Real-time council analytics ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ bias radar, fairness index, and VIS balance.
      </p>

      {/* Connection Status */}
      <div className="flex items-center justify-between bg-gray-900 p-3 rounded-lg mb-6">
        <div>
          <span className="text-yellow-400 font-semibold">Live Status:</span>{" "}
          <span className="text-green-400">{liveStatus}</span>
        </div>
        <div className="text-pink-400 font-bold">
          Fairness Index: {fairness}%
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Creator VIS Heatmap */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h2 className="text-purple-400 font-semibold mb-2">
            Creator VIS Heatmap
          </h2>
          {creators.length === 0 ? (
            <div className="text-gray-600 text-center py-10">
              No data yet.
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {creators.map((c) => (
                <div
                  key={c.id || c.name}
                  className="flex justify-between py-1 hover:bg-gray-800 px-2 rounded transition"
                >
                  <span>{c.name}</span>
                  <span className="text-green-400">
                    {c.vis_score.toFixed(3)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Council Bias Radar */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h2 className="text-blue-400 font-semibold mb-2">Council Bias Radar</h2>
          {creators.length > 0 ? (
            <RadarChart
              cx={200}
              cy={150}
              outerRadius={120}
              width={400}
              height={300}
              data={creators.map((c) => ({
                name: c.name,
                vis: c.vis_score * 100,
              }))}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <Tooltip />
              <Radar
                name="VIS"
                dataKey="vis"
                stroke="#f472b6"
                fill="#f472b6"
                fillOpacity={0.4}
              />
            </RadarChart>
          ) : (
            <div className="text-gray-600 text-center py-10">
              Waiting for council data...
            </div>
          )}
        </div>
      </div>

      {/* Token Flow Section */}
      <div className="mt-8 bg-gray-900 rounded-xl p-4">
        <h2 className="text-green-400 font-semibold mb-2">ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â« Live Token Flow</h2>
        <p className="text-gray-500 text-center py-4">
          Token activity updates automatically from council voting and market actions.
        </p>
      </div>
    </div>
  );
}


