// ===================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CampaignLiveDashboard.jsx (Saudi Edition ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Final v1.0)
// -------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Live WebSocket dashboard for campaign performance
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Real-time metrics, tribe activation, influencer impact, AI alerts
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Fully styled with Saudi green identity
// ===================================================================

import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiUsers,
  FiActivity,
  FiZap,
  FiBell,
  FiClock,
  FiRefreshCcw,
} from "react-icons/fi";
import { useParams } from "react-router-dom";

export default function CampaignLiveDashboard() {
  const { campaignId } = useParams();

  const [campaign, setCampaign] = useState(null);
  const [live, setLive] = useState({
    conversion: 0,
    clicks: 0,
    reach: 0,
    cost: 0,
    roas: 0,
  });

  const [tribeBoost, setTribeBoost] = useState([]);
  const [infImpact, setInfImpact] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [heatmap, setHeatmap] = useState([]);
  const wsRef = useRef(null);

  // ------------------------------------------------------------
  // Fetch campaign info
  // ------------------------------------------------------------
  useEffect(() => {
    fetch(`/api/campaign/${campaignId}`)
      .then((res) => res.json())
      .then(setCampaign);
  }, [campaignId]);


  // ------------------------------------------------------------
  // Connect live WebSocket
  // ------------------------------------------------------------
  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/synaptic");
    wsRef.current = ws;

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);

        if (data.type === "heartbeat") {
          // Simulate live metrics
          const conv = +(Math.random() * 4.5).toFixed(2);
          const reach = Math.floor(Math.random() * 5000);
          const clicks = Math.floor(reach * 0.12);
          const cost = +(clicks * 0.32).toFixed(2);
          const roas = +(conv > 0 ? (conv * 3.7) / cost : 0).toFixed(2);

          setLive({
            conversion: conv,
            reach,
            clicks,
            cost,
            roas,
          });

          // Tribe Boost
          const sorted = [...data.tribes]
            .sort((a, b) => b.dopamine - a.dopamine)
            .slice(0, 3);
          setTribeBoost(sorted);

          // Influencer impact simulation
          setInfImpact([
            { name: "Lama Al-Khaled", impact: +(Math.random() * 0.8 + 0.2).toFixed(2) },
            { name: "Rakan Tech", impact: +(Math.random() * 0.9 + 0.1).toFixed(2) },
            { name: "Fahad Explorer", impact: +(Math.random() * 0.7 + 0.15).toFixed(2) },
          ]);

          // AI Alerts
          if (conv < 1.2) {
            setAlerts((prev) => [
              ...prev.slice(-3),
              {
                type: "low_conversion",
                message: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â®Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â§ÃƒËœÃ‚Â¶ Ãƒâ„¢Ã‚ÂÃƒâ„¢Ã…Â  Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¯Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂµÃƒËœÃ‚Â­ ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â±Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¹ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â© ÃƒËœÃ‚Â£Ãƒâ„¢Ã‹â€  ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¬Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â¡Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â±.",
                time: new Date().toLocaleTimeString(),
              },
            ]);
          }

          // Heatmap simulation
          const newPoint = {
            hour: new Date().getHours(),
            sales: Math.floor(Math.random() * 10),
          };
          setHeatmap((h) => [...h.slice(-23), newPoint]);
        }
      } catch (e) {}
    };

    ws.onclose = () => console.log("WS Closed");
    return () => ws.close();
  }, []);


  // ------------------------------------------------------------
  // Metrics Card Component
  // ------------------------------------------------------------
  const Metric = ({ icon, label, value }) => (
    <div className="p-6 bg-[#01341c] rounded-xl border border-[#1d6642] text-center">
      <div className="text-[#4cff9b] text-3xl mb-3">{icon}</div>
      <p className="text-gray-300">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );


  // ------------------------------------------------------------
  // Page Layout
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen p-8 text-white bg-[#002b16]">
      <h1 className="text-3xl font-extrabold mb-6 text-[#4cff9b] flex items-center gap-3">
        <FiActivity /> Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â­ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒËœÃ‚Â§ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© (Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§ÃƒËœÃ‚Â´ÃƒËœÃ‚Â±)
      </h1>

      {campaign && (
        <div className="mb-8 bg-[#01341c] p-6 rounded-xl border border-[#1d6642]">
          <h2 className="text-xl font-bold">{campaign.name}</h2>
          <p className="text-gray-300 mt-1">
            {campaign.goal} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {campaign.duration} ÃƒËœÃ‚Â£Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {campaign.budget} ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾
          </p>
        </div>
      )}

      {/* ===================== Metrics ======================= */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
        <Metric icon={<FiTrendingUp />} label="ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ (Ãƒâ„¢Ã‚Âª)" value={live.conversion} />
        <Metric icon={<FiUsers />} label="ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚ÂµÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾" value={live.reach} />
        <Metric icon={<FiZap />} label="ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â±ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª" value={live.clicks} />
        <Metric icon={<FiClock />} label="ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒâ„¢Ã†â€™Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â© (ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾)" value={live.cost} />
        <Metric icon={<FiStar />} label="ROAS" value={live.roas} />
      </div>

      {/* ===================== Tribe Boost ==================== */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-3 text-[#4cff9b]">ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â° ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¦Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â«ÃƒËœÃ‚Â± ÃƒËœÃ‚ÂªÃƒâ„¢Ã‚ÂÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¹</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tribeBoost.map((t, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#01341c] border border-[#1d6642] rounded-xl"
            >
              <h3 className="font-bold text-lg">{t.name}</h3>
              <p className="text-gray-300">Dopamine: {t.dopamine}</p>
              <p className="text-[#4cff9b] font-bold mt-1">Token: {t.token}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== Influencer Impact ==================== */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-3 text-[#4cff9b]">ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â¸ ÃƒËœÃ‚Â£ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â </h2>

        <div className="space-y-4">
          {infImpact.map((i, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#01341c] border border-[#1d6642] rounded-xl flex justify-between"
            >
              <div>
                <p className="font-bold">{i.name}</p>
                <p className="text-gray-300 text-sm">Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â³ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¡Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â© Ãƒâ„¢Ã‚ÂÃƒâ„¢Ã…Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾</p>
              </div>
              <p className="text-[#4cff9b] font-bold text-xl">{i.impact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== AI Alerts ==================== */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-3 text-[#4cff9b]">ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¨ ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â°Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚ÂµÃƒËœÃ‚Â·Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â </h2>

        <div className="space-y-3">
          {alerts.slice(-5).map((a, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#350d0d] border border-red-600 rounded-xl"
            >
              <p className="text-red-400 font-bold">{a.message}</p>
              <p className="text-gray-400 text-sm mt-1">{a.time}</p>
            </div>
          ))}

          {alerts.length === 0 && (
            <div className="p-4 bg-[#01341c] text-gray-300 rounded-xl">
              Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â¯ ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â­ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¹
            </div>
          )}
        </div>
      </div>

      {/* ===================== Heatmap ==================== */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-3 text-[#4cff9b]">ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ ÃƒËœÃ‚Â®ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â·ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª (ÃƒËœÃ‚Â¢ÃƒËœÃ‚Â®ÃƒËœÃ‚Â± 24 ÃƒËœÃ‚Â³ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â©)</h2>

        <div className="grid grid-cols-12 gap-2">
          {heatmap.map((h, idx) => (
            <div
              key={idx}
              className="h-12 rounded-lg flex items-center justify-center text-xs"
              style={{
                background: `rgba(76, 255, 155, ${h.sales / 12})`,
              }}
            >
              {h.hour}:00
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}


