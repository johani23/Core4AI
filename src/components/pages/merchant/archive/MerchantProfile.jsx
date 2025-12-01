// ============================================================================
// ðŸ’š MerchantProfile.jsx â€” Core4.AI (v1.0 BETA RELEASE)
// ----------------------------------------------------------------------------
// â€¢ New Merchant Profile page
// â€¢ AI Pricing Summary + UnifiedPricing
// â€¢ Compact, clean and ready for Beta
// ============================================================================

import React, { useEffect, useState } from "react";
import UnifiedPricing from "@/components/pricing/UnifiedPricing";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MerchantProfile() {
  const navigate = useNavigate();
  const merchantId = "merchant_001";

  const [merchant, setMerchant] = useState({
    name: "Ù…ØªØ¬Ø± Ø§Ù„ØªØ§Ø¬Ø± Ø§Ù„Ø°ÙƒÙŠ",
    avatar: "https://i.imgur.com/1Q9Z1Zm.png",
    plan: "Free Beta Plan",
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/merchant/${merchantId}/products`)
      .then((res) => {
        const list = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];
        setProducts(list);
      })
      .catch(() => console.log("Error loading products"));
  }, []);

  const topProduct = products.length > 0 ? products[0] : null;

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">

      {/* HEADER */}
      <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow border">
        <img
          src={merchant.avatar}
          alt="avatar"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h1 className="text-3xl font-bold text-green-700">{merchant.name}</h1>
          <p className="text-gray-500">{merchant.plan}</p>
        </div>
      </div>

      {/* AI PRICING SUMMARY */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <h2 className="text-xl font-bold text-green-600 mb-4">
          ðŸ’š Ù…Ù„Ø®Øµ Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ù„Ù„ØªØ³Ø¹ÙŠØ±
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          ÙŠØ¹Ø±Ø¶ Ù„Ùƒ Ø§Ù„Ù†Ø¸Ø§Ù… Ø£ÙØ¶Ù„ Ù…Ù†ØªØ¬ Ù…Ù† Ù†Ø§Ø­ÙŠØ© ØªØ³Ø¹ÙŠØ± Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ.
        </p>

        {topProduct ? (
          <div className="bg-gray-50 p-4 rounded-xl border">
            <UnifiedPricing
              productId={topProduct.product_id || topProduct.id}
            />
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù…Ù†ØªØ¬Ø§Øª Ø¨Ø¹Ø¯.</p>
        )}
      </div>

      {/* TOP PRODUCTS */}
      <div>
        <h2 className="text-xl font-bold text-green-600 mb-4">
          Ø£ÙØ¶Ù„ Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª Ø£Ø¯Ø§Ø¡Ù‹
        </h2>

        {products.length === 0 && (
          <p className="text-gray-500 text-sm">Ù„Ù… ÙŠØªÙ… Ø¥Ø¶Ø§ÙØ© Ù…Ù†ØªØ¬Ø§Øª Ø­ØªÙ‰ Ø§Ù„Ø¢Ù†.</p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {products.slice(0, 3).map((p) => (
            <div
              key={p.product_id}
              className="bg-white p-4 shadow rounded-xl border"
            >
              <h3 className="font-bold text-gray-800">{p.name}</h3>
              <p className="text-gray-500 text-sm mb-3">{p.price} Ø±.Ø³</p>

              <button
                onClick={() =>
                  navigate("/merchant/campaign-builder", { state: { product: p } })
                }
                className="mt-2 bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700"
              >
                ðŸš€ Ø¨Ù†Ø§Ø¡ Ø­Ù…Ù„Ø©
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/merchant/add-product")}
          className="bg-purple-600 text-white p-4 rounded-xl shadow hover:bg-purple-700"
        >
          âž• Ø¥Ø¶Ø§ÙØ© Ù…Ù†ØªØ¬ Ø¬Ø¯ÙŠØ¯
        </button>

        <button
          onClick={() => navigate("/merchant/products/list")}
          className="bg-gray-800 text-white p-4 rounded-xl shadow hover:bg-gray-900"
        >
          ðŸ“¦ Ø¬Ù…ÙŠØ¹ Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª
        </button>

        <button
          onClick={() => navigate("/merchant/campaigns")}
          className="bg-blue-600 text-white p-4 rounded-xl shadow hover:bg-blue-700"
        >
          ðŸŽ¯ Ø§Ù„Ø­Ù…Ù„Ø§Øª Ø§Ù„Ù†Ø´Ø·Ø©
        </button>
      </div>
    </div>
  );
}
