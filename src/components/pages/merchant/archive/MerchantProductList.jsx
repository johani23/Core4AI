// ============================================================================
// ðŸ’š Core4.AI â€“ MerchantProductList.jsx (v6.0 â€“ AI Apply Price + Opportunity Score)
// ============================================================================

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import UnifiedPricingCompact from "@/components/pricing/UnifiedPricingCompact";
import { calculateOpportunityScore } from "@/components/pricing/OpportunityScore";

export default function MerchantProductList() {
  const navigate = useNavigate();
  const merchantId = "merchant_001";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/merchant/${merchantId}/products`);
      const data = await res.json();

      const list = Array.isArray(data) ? data : data.products || [];

      setProducts(list);
    } catch (err) {
      toast.error("âŒ ÙØ´Ù„ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª");
    }
    setLoading(false);
  };

  // APPLY AI PRICE (global method)
  const applyAIPrice = async (productId, price) => {
    try {
      const res = await fetch(`/api/product/${productId}/update-price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price }),
      });

      if (res.ok) {
        toast.success("ðŸ¤– ØªÙ… ØªØ·Ø¨ÙŠÙ‚ Ø³Ø¹Ø± Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ");
        loadProducts(); // refresh
      } else {
        toast.error("âŒ ÙØ´Ù„ ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ø³Ø¹Ø±");
      }
    } catch (e) {
      toast.error("âš ï¸ Ù…Ø´ÙƒÙ„Ø© Ø§Ù„Ø§ØªØµØ§Ù„ Ø¨Ø§Ù„Ø®Ø§Ø¯Ù…");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">

      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Ù…Ù†ØªØ¬Ø§Øª Ø§Ù„ØªØ§Ø¬Ø±
      </h2>

      {loading && (
        <div className="text-center text-gray-500 mb-4">
          Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù…ÙŠÙ„...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.product_id || product.id || product.name}
            className="p-4 bg-white border rounded-xl shadow hover:shadow-md transition"
          >

            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4 border"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                Ù„Ø§ ØªÙˆØ¬Ø¯ ØµÙˆØ±Ø©
              </div>
            )}

            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>

            <p className="text-gray-700 text-sm mt-1">
              Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ø­Ø§Ù„ÙŠ:{" "}
              <span className="font-semibold text-green-700">
                {product.price} Ø±.Ø³
              </span>
            </p>

            <p className="text-gray-600 text-sm mt-2">
              {product.description}
            </p>

            {/* â­ AI Pricing Snapshot */}
            <div className="mt-4 bg-gray-50 p-4 rounded-xl border">
              <UnifiedPricingCompact
                productId={product.product_id}
                onExpand={() => navigate(`/merchant/product/${product.product_id}`)}
              />
            </div>

            {/* â­ Opportunity Score (0â€“100) */}
            {product.ai_price && product.optimal_price && (
              <p className="text-sm mt-3 font-semibold text-blue-600 bg-blue-50 p-2 rounded-lg">
                Opportunity Score:{" "}
                {calculateOpportunityScore({
                  elasticity: -1,
                  optimalPrice: product.optimal_price,
                  merchantPrice: product.price,
                  suggestedPrice: product.ai_price,
                  revenueAtOptimal: product.optimal_price * 10,
                  revenueAtCurrent: product.price * 10,
                })} / 100
              </p>
            )}

            {/* â­ APPLY AI PRICE BUTTON */}
            <button
              onClick={() =>
                applyAIPrice(
                  product.product_id,
                  product.ai_price || product.recommended_price || product.price
                )
              }
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
            >
              ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…Ù‚ØªØ±Ø­ ðŸ¤–
            </button>

            <button
              onClick={() =>
                navigate("/merchant/campaign-builder", {
                  state: { product },
                })
              }
              className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold"
            >
              âœ” Ø§Ø³ØªØ®Ø¯Ù… Ù‡Ø°Ø§ Ø§Ù„Ù…Ù†ØªØ¬
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}
