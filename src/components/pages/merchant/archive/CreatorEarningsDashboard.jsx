// ======================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CreatorEarningsDashboard.jsx (v1.0 PREMIUM UI)
// ----------------------------------------------------------------------
// Shows:
//   ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Total Earnings
//   ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Monthly Earnings
//   ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Breakdown by Source
//   ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Last 10 Earnings Events
//   ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Creator Wallet + XP preview
// ======================================================================

import { motion } from "framer-motion";

export default function CreatorEarningsDashboard() {
  const creatorId = "creator_001";

  const [profile, setProfile] = useState(null);
  const [earnings, setEarnings] = useState(null);

  useEffect(() => {
    // Creator profile
    fetch(`/api/creator/${creatorId}`)
      .then((r) => r.json())
      .then(setProfile);

    // Earnings summary
    fetch(`/api/creator/earnings/summary/${creatorId}`)
      .then((r) => r.json())
      .then(setEarnings);
  }, []);

  if (!profile || !earnings)
    return <div className="p-6 text-gray-500">Loading creator earnings...</div>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-extrabold text-[#006C35] mb-6">
        Creator Earnings Dashboard
      </h1>

      {/* Earnings Overview */}
      <div className="grid grid-cols-3 gap-6 mb-10">

        <EarningCard
          title="Total Earnings"
          value={earnings.total_earnings + " SAR"}
          color="emerald"
        />

        <EarningCard
          title="This Month"
          value={earnings.monthly_earnings + " SAR"}
          color="sky"
        />

        <EarningCard
          title="XP Level"
          value={profile.xp + " XP"}
          color="violet"
        />
      </div>

      {/* Detailed Breakdown */}
      <motion.div
        className="p-6 rounded-2xl bg-white border shadow mb-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-bold mb-3">Breakdown</h2>
        <ul className="space-y-2 text-gray-700">
          <li>ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Conversions Earnings: {earnings.total_earnings * 0.55} SAR (est)</li>
          <li>ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Tribe Split Earnings: {earnings.total_earnings * 0.25} SAR (est)</li>
          <li>ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Merchant Deals: {earnings.total_earnings * 0.15} SAR (est)</li>
          <li>ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Bonus Rewards: {earnings.total_earnings * 0.05} SAR (est)</li>
        </ul>
      </motion.div>

      {/* Earnings Timeline */}
      <motion.div
        className="p-6 rounded-2xl bg-white border shadow"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-bold mb-4">Recent Earnings Activity</h2>

        {earnings.events && earnings.events.length > 0 ? (
          <ul className="space-y-4">
            {earnings.events.map((ev, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="text-2xl">ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Âµ</span>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">
                    +{ev.amount} SAR from {ev.source}
                  </div>
                  <div className="text-gray-600 text-sm">{ev.timestamp}</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm">No earnings yet.</p>
        )}
      </motion.div>
    </div>
  );
}


// -------------------------------------------------------
// Card Component
// -------------------------------------------------------
function EarningCard({ title, value, color }) {
  return (
    <motion.div
      className={`p-6 rounded-2xl bg-white border border-${color}-300 shadow`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={`text-${color}-600 font-bold text-sm mb-1`}>
        {title}
      </div>
      <div className={`text-3xl font-extrabold text-${color}-700`}>
        {value}
      </div>
    </motion.div>
  );
}


