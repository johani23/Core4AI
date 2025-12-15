// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ MentorRadar.jsx (MVP-84 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œMentorship RadarÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Visualizes mentor ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬Â apprentice relations
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Live radar feed (Skill, Creativity, Consistency, Empathy, Influence)
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Growth pulse indicator + toggle from SimulationHub
// ============================================================

import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip,
  ResponsiveContainer
} from "recharts";

const RadarTheme = {
  mentor: "#a855f7",
  apprentice: "#14b8a6",
  neutral: "#facc15",
};

export default function MentorRadar({ visible, onClose }) {
  const [radarData, setRadarData] = useState([]);
  const [map, setMap] = useState([]);
  const [pulse, setPulse] = useState(null);
  const radarWS = useRef(null);

  // --- Pull mentorship map periodically
  useEffect(() => {
    if (!visible) return;
    const fetchMap = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/mentor/map");
        const data = await res.json();
        setMap(data.links || []);
      } catch (e) {
        console.warn("Mentor map fetch failed:", e);
      }
    };
    fetchMap();
    const loop = setInterval(fetchMap, 15000);
    return () => clearInterval(loop);
  }, [visible]);

  // --- WebSocket radar feed
  useEffect(() => {
    if (!visible) return;
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/radar");
    radarWS.current = ws;
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.event === "radar_update") {
        setRadarData(msg.payload);
      } else if (msg.event === "growth_pulse") {
        setPulse(msg.mentor);
        setTimeout(() => setPulse(null), 1000);
      }
    };
    ws.onclose = () => console.log("Radar WS closed");
    return () => ws.close();
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-black/90 text-white flex flex-col items-center justify-center z-50">
      <div className="absolute top-3 right-3">
        <button
          onClick={onClose}
          className="bg-gray-800 hover:bg-gray-700 text-sm px-3 py-1 rounded-xl border border-purple-500/40"
        >
          ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¢ Close Mentor Mode
        </button>
      </div>

      <div className="text-purple-300 text-lg font-semibold mb-2">
        Mentorship Radar
      </div>
      <div className="text-gray-400 text-sm mb-4">
        Visualizing SkillÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“CreativityÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“EmpathyÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“Influence networks
      </div>

      <div className="w-[600px] h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="#4b5563" />
            <PolarAngleAxis
              dataKey="axis"
              stroke="#9ca3af"
              tick={{ fill: "#d1d5db", fontSize: 12 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
            <Radar
              name="Mentor"
              dataKey="mentor"
              stroke={RadarTheme.mentor}
              fill={RadarTheme.mentor}
              fillOpacity={0.4}
            />
            <Radar
              name="Apprentice"
              dataKey="apprentice"
              stroke={RadarTheme.apprentice}
              fill={RadarTheme.apprentice}
              fillOpacity={0.3}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(30,30,40,0.9)",
                border: "none",
                color: "#fff",
                fontSize: "0.8rem",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Mentorship Map Feed */}
      <div className="mt-6 w-[600px] max-h-48 overflow-y-auto bg-gray-900/60 rounded-xl p-3 border border-purple-400/30 text-sm">
        <div className="text-purple-300 font-semibold mb-2">
          Active Mentorship Links
        </div>
        {map.length === 0 && (
          <div className="text-gray-500 text-xs">
            Waiting for mentorship data...
          </div>
        )}
        {map.map((m, i) => (
          <div
            key={i}
            className="flex justify-between items-center mb-1 p-2 rounded bg-gray-800/40 border border-gray-700"
          >
            <span>
              ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  <span className="text-purple-300">{m.mentor}</span>{" "}
              ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ <span className="text-emerald-300">{m.apprentice}</span>
            </span>
            <span className="text-xs text-gray-400">
              ÃƒÅ½Ã¢â‚¬Â {m.growth}% ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {m.axis}
            </span>
          </div>
        ))}
      </div>

      {/* Growth Pulse Indicator */}
      {pulse && (
        <div className="absolute bottom-10 text-2xl text-emerald-400 animate-pulse">
          ÃƒÂ¢Ã…â€œÃ‚Â¨ Mentor {pulse} triggered a Growth Pulse!
        </div>
      )}
    </div>
  );
}


