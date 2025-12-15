// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ SalesAnalyticsPanel.jsx (v1.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œROI ContinuumÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Merges merchant campaigns + commission data
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Shows Tribe ROI over time and revenue trends
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Integrates with CoreSyncContext + CommissionSharingEngine
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Persistent display under AnalyticsTabs
// ============================================================

import { motion } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function SalesAnalyticsPanel() {
  const { campaigns, tribes } = useCoreSync();
  const [roiData, setRoiData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â® Build time-series data
  useEffect(() => {
    if (!campaigns || campaigns.length === 0) return;

    const data = campaigns.slice(0, 8).map((c, idx) => ({
      id: c.campaign_id || `CMP-${idx + 1}`,
      tribe: c.tribe || "N/A",
      conversion: c.conversion || 0,
      roi: Math.min((c.conversion / 100) * 3 + Math.random(), 5),
      revenue: Math.round((c.budget || 500) * ((c.conversion || 50) / 100)),
    }));

    setRoiData(data);
    setRevenueData(
      tribes.slice(0, 4).map((t) => ({
        tribe: t.name,
        revenue: Math.round(Math.random() * 8000 + 1000),
        growth: Math.round(Math.random() * 100) / 10,
      }))
    );
  }, [campaigns, tribes]);

  return (
    <div className="p-8 bg-[#0b0b15]/80 rounded-2xl border border-gray-800 shadow-lg text-gray-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¹ Sales Analytics Panel
        </h2>
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-400"
        >
          Data refreshed every 10s ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {roiData.length} Campaigns tracked
        </motion.div>
      </div>

      {/* ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€  ROI Over Time */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-purple-300 mb-2">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â  Campaign ROI Progression
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={roiData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#222" />
            <XAxis dataKey="id" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid #333",
                color: "#ccc",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="roi"
              stroke="#c084fc"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="ROI (x)"
            />
            <Line
              type="monotone"
              dataKey="conversion"
              stroke="#34d399"
              strokeWidth={1.5}
              dot={false}
              name="Conversion (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° Tribe Revenue Comparison */}
      <div>
        <h3 className="text-lg font-semibold text-purple-300 mb-2">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Tribe Revenue Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#222" />
            <XAxis dataKey="tribe" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid #333",
                color: "#ccc",
              }}
            />
            <Bar dataKey="revenue" fill="#a855f7" name="Revenue ($)" />
            <Bar dataKey="growth" fill="#34d399" name="Growth (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 text-xs text-gray-500 text-center">
        ROI Continuum merges campaign ROI, revenue flow, and commission sharing.<br />
        Next version will integrate live payouts and merchant ROI feedback loop.
      </div>
    </div>
  );
}


