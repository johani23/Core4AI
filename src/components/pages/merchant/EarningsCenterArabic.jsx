// ======================================================================
// ðŸ’š EarningsCenterArabic.jsx â€” Saudi Premium
// ======================================================================

import React, { useEffect, useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";

export default function EarningsCenterArabic() {
  const [today, setToday] = useState(0);
  const [week, setWeek] = useState(0);
  const [month, setMonth] = useState(0);
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    // Dummy data â€“ replace with API later
    setToday(1200);
    setWeek(5400);
    setMonth(15800);
    setInfluencers([
      { name: "Ù†Ø§ØµØ±", sales: 8, payout: 120 },
      { name: "Ø¯Ø§Ù†Ù‡", sales: 3, payout: 75 },
      { name: "Ø¹Ø¨Ø¯Ø§Ù„Ù„Ù‡", sales: 5, payout: 95 },
    ]);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 page-wrapper">
      <BackToMerchant />

      <h1 className="text-3xl font-extrabold text-yellow-600 mb-10">
        Ø£Ø±Ø¨Ø§Ø­Ùƒ
      </h1>

      {/* Earnings Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div className="core-card text-center" whileHover={{ scale: 1.02 }}>
          <h3 className="text-lg font-bold text-green-700">Ø£Ø±Ø¨Ø§Ø­ Ø§Ù„ÙŠÙˆÙ…</h3>
          <p className="text-3xl font-bold mt-2 text-green-800">
            + {today.toLocaleString()} Ø±ÙŠØ§Ù„
          </p>
        </motion.div>

        <motion.div className="core-card text-center" whileHover={{ scale: 1.02 }}>
          <h3 className="text-lg font-bold text-blue-700">Ø£Ø±Ø¨Ø§Ø­ Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹</h3>
          <p className="text-3xl font-bold mt-2 text-blue-800">
            + {week.toLocaleString()} Ø±ÙŠØ§Ù„
          </p>
        </motion.div>

        <motion.div className="core-card text-center" whileHover={{ scale: 1.02 }}>
          <h3 className="text-lg font-bold text-purple-700">Ø£Ø±Ø¨Ø§Ø­ Ø§Ù„Ø´Ù‡Ø±</h3>
          <p className="text-3xl font-bold mt-2 text-purple-800">
            + {month.toLocaleString()} Ø±ÙŠØ§Ù„
          </p>
        </motion.div>
      </div>

      {/* Influencer payouts */}
      <h2 className="section-title mt-12">ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ†</h2>

      <div className="space-y-4">
        {influencers.map((inf, index) => (
          <motion.div
            key={index}
            className="core-card flex justify-between items-center"
            whileHover={{ scale: 1.02 }}
          >
            <div>
              <p className="font-bold text-gray-900">{inf.name}</p>
              <p className="text-gray-600 text-sm">
                Ø¬Ø§Ø¨ {inf.sales} Ù…Ø¨ÙŠØ¹Ø§Øª
              </p>
            </div>
            <p className="text-green-600 font-bold text-lg">
              {inf.payout} Ø±ÙŠØ§Ù„
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
