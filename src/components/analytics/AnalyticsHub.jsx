// ============================================================================
// ðŸ’š Core4.AI â€“ AnalyticsHub.jsx (v1.0 â€œAI Pricing Intelligence Dashboardâ€)
// ----------------------------------------------------------------------------
// â€¢ UnifiedPricing (Compact)
// â€¢ Elasticity Score
// â€¢ Opportunity Ranking
// â€¢ Overpriced / Underpriced Product Insights
// â€¢ Clean, fast, ready for Beta
// ============================================================================

import React, { useEffect, useState } from "react";
import UnifiedPricing from "@/components/pricing/UnifiedPricing";
import axios from "axios";
import ElasticityEngine from "@/components/pricing/ElasticityEngine";


export default function AnalyticsHub() {
  const merchantId = "merchant_001";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/merchant/${merchantId}/products`)
      .then((res) => {
        const list = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];
        setProducts(list);
      })
      .catch(() => console.log("Error loading analytics"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-20">
        â³ Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ ØªØ­Ù„ÙŠÙ„Ø§Øª Ø§Ù„ØªØ³Ø¹ÙŠØ±...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-400 py-20">
        Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª â€” Ø£Ø¶Ù Ù…Ù†ØªØ¬Ø§Øª Ù„Ø¨Ø¯Ø¡ Ø§Ù„ØªØ­Ù„ÙŠÙ„Ø§Øª.
      </div>
    );
  }

  // Ø§Ø®ØªÙŠØ§Ø± Ø£ÙØ¶Ù„ Ù…Ù†ØªØ¬ Ù„Ø£ØºØ±Ø§Ø¶ Ø§Ù„Ù€AI Insights
  const topProduct = products[0];

  return (
    <div className="p-8 space-y-10">

      {/* HEADER */}
      <h1 className="text-3xl font-extrabold text-green-400 mb-4">
        ðŸ’š AI Pricing Intelligence
      </h1>
      <p className="text-gray-400 mb-8">
        ØªØ­Ù„ÙŠÙ„Ø§Øª Ù…ØªÙ‚Ø¯Ù…Ø© Ù„Ù„ØªØ³Ø¹ÙŠØ± ØªØ¹ØªÙ…Ø¯ Ø¨Ø§Ù„ÙƒØ§Ù…Ù„ Ø¹Ù„Ù‰ Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ.
      </p>

      {/* MAIN AI PRICING CARD */}
      <div className="bg-[#0d0d17] p-6 rounded-2xl border border-gray-700 shadow-xl">
        <h2 className="text-xl font-bold text-green-300 mb-4">
          ðŸ”¥ Ø§Ù„ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ â€” Unified Pricing
        </h2>

        <div className="bg-white rounded-xl p-4 border shadow">
          <UnifiedPricing
            productId={topProduct.product_id || topProduct.id}
          />
        </div>
      </div>
     <div className="bg-[#0d0d17] p-6 rounded-2xl border border-gray-700 shadow-xl">
  <h2 className="text-xl font-bold text-green-300 mb-4">
    ðŸ“ˆ Elasticity Analysis
  </h2>

  <ElasticityEngine productId={topProduct.product_id || topProduct.id} />
</div>


      {/* PRODUCT OPPORTUNITY LIST */}
      <div>
        <h2 className="text-xl font-bold text-green-300 mb-4">
          ðŸ“Š Ø£ÙØ¶Ù„ Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª Ù…Ù† Ù†Ø§Ø­ÙŠØ© Ø§Ù„ÙØ±ØµØ© Ø§Ù„Ø³Ø¹Ø±ÙŠØ©
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {products.slice(0, 4).map((p) => (
            <div
              key={p.product_id}
              className="bg-[#111827] p-4 rounded-xl border border-gray-700 shadow"
            >
              <h3 className="font-bold text-white">{p.name}</h3>
              <p className="text-gray-400 text-sm">{p.price} Ø±.Ø³</p>

              <button
                className="mt-3 bg-green-600 text-white py-2 rounded-lg w-full hover:bg-green-700"
                onClick={() =>
                  alert(`Coming soon: Dedicated price analytics for ${p.name}`)
                }
              >
                Ø¹Ø±Ø¶ ØªÙØ§ØµÙŠÙ„ Ø§Ù„ØªØ³Ø¹ÙŠØ±
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* OVER / UNDER PRICED PLACEHOLDERS */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-[#0b0b15]/70 border border-gray-700 rounded-xl p-6">
          <h3 className="text-red-400 font-bold mb-3">ðŸ“‰ Ù…Ù†ØªØ¬Ø§Øª Ø³Ø¹Ø±Ù‡Ø§ Ø£Ø¹Ù„Ù‰ Ù…Ù† Ø§Ù„Ø³ÙˆÙ‚</h3>
          <p className="text-gray-400 text-sm">
            Ø³ÙŠØªÙ… Ù‡Ù†Ø§ Ø¹Ø±Ø¶ Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª Ø§Ù„ØªÙŠ ÙŠÙ‚ØªØ±Ø­ Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ØªØ®ÙÙŠØ¶ Ø³Ø¹Ø±Ù‡Ø§ Ù„Ø²ÙŠØ§Ø¯Ø© Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª.
          </p>
        </div>

        <div className="bg-[#0b0b15]/70 border border-gray-700 rounded-xl p-6">
          <h3 className="text-green-400 font-bold mb-3">ðŸ“ˆ Ù…Ù†ØªØ¬Ø§Øª ÙŠÙ…ÙƒÙ† Ø±ÙØ¹ Ø³Ø¹Ø±Ù‡Ø§</h3>
          <p className="text-gray-400 text-sm">
            Ø³ÙŠØªÙ… Ù‡Ù†Ø§ Ø¹Ø±Ø¶ Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª Ø§Ù„ØªÙŠ ØªÙ…ØªÙ„Ùƒ Elasticity Ù…Ù†Ø®ÙØ¶Ø© ÙˆÙŠÙ…ÙƒÙ† Ø±ÙØ¹ Ø§Ù„Ø³Ø¹Ø± Ø¨Ø£Ù…Ø§Ù†.
          </p>
        </div>

      </div>

      {/* DEMAND TREND PLACEHOLDER */}
      <div className="bg-[#0b0b15]/70 border border-gray-700 rounded-xl p-6 mt-8">
        <h3 className="text-yellow-400 font-bold mb-3">ðŸ“ˆ Ù…Ù†Ø­Ù†Ù‰ Ø§Ù„Ø·Ù„Ø¨ (Demand Trend)</h3>
        <p className="text-gray-400 text-sm">
          Ø³ÙŠØªÙ… Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ø±Ø³Ù… Ø§Ù„Ø¨ÙŠØ§Ù†ÙŠ Ø§Ù„Ø¯ÙŠÙ†Ø§Ù…ÙŠÙƒÙŠ Ù„Ø§Ø­Ù‚Ù‹Ø§ Ø¨Ø¹Ø¯ Ø±Ø¨Ø· Ù…Ø­Ø±Ùƒ Elasticity Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠ.
        </p>
      </div>

    </div>
  );
}
