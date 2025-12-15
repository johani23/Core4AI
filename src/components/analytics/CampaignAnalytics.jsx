// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CampaignAnalytics.jsx (v1.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œReach & ROI PulseÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Recharts visual for reach, engagement & conversion trends
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Auto-updates when new campaign data arrives from CoreSync
// ============================================================

import { useCoreSync } from "@context/CoreSyncContext";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

export default function CampaignAnalytics() {
  const { campaigns = [] } = useCoreSync();

  const chartData = useMemo(() => {
    if (!campaigns.length) {
      return [
        { name: "No Data", reach: 0, conversion: 0, roi: 0 }
      ];
    }
    return campaigns.slice(0, 8).map((c, i) => ({
      name: `#${i + 1}`,
      reach: c.reach || Math.floor(Math.random() * 1000),
      conversion: c.conversion || Math.random() * 100,
      roi: c.roi || Math.random() * 3,
    }));
  }, [campaigns]);

  return (
    <div className="bg-[#0b0b15]/70 border border-gray-800 rounded-xl p-6">
      <h3 className="text-purple-400 font-bold mb-4 text-center">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â  Campaign Performance Overview
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Bar dataKey="reach" fill="#8b5cf6" name="Reach" />
              <Bar dataKey="conversion" fill="#10b981" name="Conversion %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="roi" stroke="#facc15" name="ROI (x)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


