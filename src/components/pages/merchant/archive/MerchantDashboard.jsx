// ============================================================
// ðŸª MerchantDashboard.jsx (v5.0 â€œUnified Pricing Intelligence Addedâ€)
// ------------------------------------------------------------
// Displays:
// - AI Pricing Insights (UnifiedPricing)
// - Top Suggested Teams
// - Current Offers
// ============================================================

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import UnifiedPricing from "@/components/pricing/UnifiedPricing";   // â­ ADDED

const BASE = "http://127.0.0.1:8000";

export default function MerchantDashboard() {
  const [offers, setOffers] = useState([]);
  const [suggest, setSuggest] = useState([]);
  const [products, setProducts] = useState([]);   // â­ ADDED

  useEffect(() => {
    axios.get(`${BASE}/api/merchant/offers`)
         .then((res) => setOffers(res.data.offers || []));

    axios.get(`${BASE}/api/suggest`)
         .then((res) => setSuggest(res.data.suggestions || []));

    axios.get(`/api/merchant/merchant_001/products`)   // â­ GET PRODUCTS
         .then((res) => {
            const list = Array.isArray(res.data) ? res.data : res.data.products || [];
            setProducts(list);
         })
         .catch(() => toast.error("âŒ ÙØ´Ù„ ØªØ­Ù…ÙŠÙ„ Ù…Ù†ØªØ¬Ø§Øª Ø§Ù„ØªØ§Ø¬Ø±"));
  }, []);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-purple-400">ðŸª Merchant Intelligence</h1>
        <p className="text-gray-400 text-sm">
          Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ÙŠÙ‚Ø¯Ù… Ù„Ùƒ Ø£Ù‚ÙˆÙ‰ ÙØ±Øµ Ø§Ù„ØªØ³Ø¹ÙŠØ± ÙˆØ§Ù„ØªØ¹Ø§ÙˆÙ†.
        </p>
      </div>

      {/* â­ AI PRICING INSIGHTS SECTION */}
      <div className="bg-[#111827] p-5 rounded-xl border border-gray-700">
        <h2 className="text-xl font-bold text-green-400 mb-4">
          ðŸ’š AI Pricing Insights â€” Ø£ÙØ¶Ù„ 3 Ù…Ù†ØªØ¬Ø§Øª ØªØ­ØªØ§Ø¬ Ø§Ù‡ØªÙ…Ø§Ù…Ùƒ Ø§Ù„Ø¢Ù†
        </h2>

        {products.length === 0 && (
          <p className="text-gray-500 text-sm">Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…Ù†ØªØ¬Ø§Øª Ø­ØªÙ‰ Ø§Ù„Ø¢Ù†.</p>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.slice(0, 3).map((p) => (
            <div key={p.product_id || p.id} className="bg-white rounded-xl p-4 shadow border">
              <h3 className="font-bold text-gray-800 mb-2">{p.name}</h3>

              <div className="bg-gray-50 p-3 rounded-lg border">
                <UnifiedPricing productId={p.product_id || p.id} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOP SUGGESTED TEAMS */}
      <div>
        <h2 className="text-lg text-pink-400 mb-2">Top Suggested Teams</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {suggest.map((s, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-[#0a0a0a] p-3 rounded-lg border border-gray-700">
              <p className="font-semibold text-white">{s.team}</p>
              <p className="text-sm text-gray-400">Score: {s.score}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CURRENT OFFERS */}
      <div>
        <h2 className="text-lg text-pink-400 mb-2">Current Offers</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {offers.map((o, i) => (
            <div key={i} className="bg-[#111827] p-4 rounded-lg border border-gray-700">
              <p className="font-semibold text-white mb-1">{o.product}</p>
              <p className="text-gray-400 text-sm">Commission: {o.commission_band}%</p>
              <button className="mt-2 w-full bg-purple-600 py-1 text-sm rounded-md hover:bg-purple-700">
                ðŸŽ¯ Invite Teams
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
