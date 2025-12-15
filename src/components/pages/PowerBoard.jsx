// ============================================================================
// ÃƒÂ¢Ã…Â¡Ã‚Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ PowerBoard.jsx (v3.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œSaudi-Tech A3 EditionÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Fully redesigned UI with Saudi Dark + Green + Gold Identity
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Uses CorePanel + CoreHeader
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Unified Tribe Power, Orders, XP, Creator Impact, Promoter Earnings
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Pulse, Glow, and consistent styling across entire dashboard
// ============================================================================

import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";
import CorePanel from "@/components/ui/CorePanel";
import CoreHeader from "@/components/ui/CoreHeader";
import { Zap } from "lucide-react";
import PowerRing from "@components/visuals/PowerRing";
import LevelBadges from "@components/gamification/LevelBadges";

export default function PowerBoard() {
  const { wsData, tribes, council, latency, backendStatus } = useCoreSync();

  // Hybrid streams
  const [orders, setOrders] = useState([]);
  const [creatorImpact, setCreatorImpact] = useState([]);
  const [tribeImpact, setTribeImpact] = useState([]);
  const [promoterEarnings, setPromoterEarnings] = useState(0);

  const [lastUpdate, setLastUpdate] = useState("");

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setLastUpdate(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(t);
  }, []);

  // Socket Data
  useEffect(() => {
    if (!wsData) return;

    if (wsData.type === "order_event") {
      setOrders((prev) => [wsData, ...prev.slice(0, 20)]);
      setPromoterEarnings((prev) => prev + (wsData.promoter_commission || 0));
    }

    if (wsData.type === "creator_score_update") {
      setCreatorImpact((prev) => [wsData, ...prev.slice(0, 20)]);
    }

    if (wsData.type === "tribe_boost") {
      setTribeImpact((prev) => [wsData, ...prev.slice(0, 20)]);
    }
  }, [wsData]);

  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10">

      {/* =======================================
          HEADER
      ======================================== */}
      <CoreHeader
        title="Core Influence PowerBoard"
        subtitle="Real-time dopamine, XP flow, tribe impact & promoter analytics."
        icon="ÃƒÂ¢Ã…Â¡Ã‚Â¡"
      />

      {/* =======================================
          LEVEL BADGES
      ======================================== */}
      <LevelBadges />

      {/* =======================================
          GLOBAL KPIs (Saudi Styled)
      ======================================== */}
      <div className="grid md:grid-cols-4 gap-6 mt-8">
        
        <CorePanel>
          <div className="text-gray-400 text-sm mb-1">Promoter Earnings</div>
          <div className="text-3xl font-bold text-[#CBA65C]">
            {promoterEarnings.toFixed(2)} SAR
          </div>
        </CorePanel>

        <CorePanel>
          <div className="text-gray-400 text-sm mb-1">Live Orders</div>
          <div className="text-3xl font-bold text-[#4FBF77]">
            {orders.length}
          </div>
        </CorePanel>

        <CorePanel>
          <div className="text-gray-400 text-sm mb-1">Creator Signals</div>
          <div className="text-3xl font-bold text-[#4FBF77]">
            {creatorImpact.length}
          </div>
        </CorePanel>

        <CorePanel>
          <div className="text-gray-400 text-sm mb-1">Tribe Boosts</div>
          <div className="text-3xl font-bold text-[#CBA65C]">
            {tribeImpact.length}
          </div>
        </CorePanel>

      </div>

      {/* =======================================
          TRIBE POWER CARDS
      ======================================== */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {tribes.map((t, i) => {
          const power = (t.dopamine * 60).toFixed(1);

          return (
            <CorePanel key={t.name} className="hover:shadow-[0_0_40px_rgba(0,108,53,0.25)]">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-[#4FBF77] text-lg">
                  {i + 1}. {t.name}
                </h3>
              </div>

              <div className="flex justify-center my-4">
                <PowerRing percentage={Math.min(power, 100)} />
              </div>

              <div className="flex justify-between items-center text-sm text-gray-300 mt-2">
                <span className="flex items-center gap-1">
                  <Zap className="text-[#4FBF77]" size={14} />
                  Power {power}
                </span>
              </div>
            </CorePanel>
          );
        })}
      </div>

      {/* =======================================
          LIVE ORDERS
      ======================================== */}
      <section>
        <CoreHeader title="Live Orders" icon="ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¡" />
        <CorePanel className="max-h-80 overflow-y-auto space-y-3">
          {orders.map((o, i) => (
            <div key={i} className="bg-[#11161A] p-4 rounded-xl">
              <div><strong>Order:</strong> {o.amount} SAR</div>
              <div><strong>Creator:</strong> {o.creator_id}</div>
              <div><strong>Campaign:</strong> {o.campaign_id}</div>
              <div className="text-[#4FBF77]"><strong>Promoter Cut:</strong> {o.promoter_commission}</div>
            </div>
          ))}
        </CorePanel>
      </section>

      {/* =======================================
          CREATOR IMPACT
      ======================================== */}
      <section>
        <CoreHeader title="Creator Impact" icon="ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨" />
        <CorePanel className="max-h-80 overflow-y-auto space-y-3">
          {creatorImpact.map((c, i) => (
            <div key={i} className="bg-[#11161A] p-4 rounded-xl">
              <div><strong>Creator:</strong> {c.creator_id}</div>
              <div><strong>Delta:</strong> {c.delta}</div>
              <div className="text-[#4FBF77]"><strong>New D-Index:</strong> {c.new_d_index}</div>
            </div>
          ))}
        </CorePanel>
      </section>

      {/* =======================================
          TRIBE BOOSTS
      ======================================== */}
      <section>
        <CoreHeader title="Tribe Boosts" icon="ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥" />
        <CorePanel className="max-h-72 overflow-y-auto space-y-3">
          {tribeImpact.map((t, i) => (
            <div key={i} className="bg-[#11161A] p-4 rounded-xl">
              <div><strong>Tribe:</strong> {t.tribe_id}</div>
              <div className="text-[#CBA65C]"><strong>Impact:</strong> {t.impact}</div>
            </div>
          ))}
        </CorePanel>
      </section>

    </div>
  );
}


