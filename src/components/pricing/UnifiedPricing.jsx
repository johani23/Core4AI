// =====================================================================================
// ðŸ’š Core4.AI â€“ UnifiedPricing.jsx (v3 FINAL â€“ With "Apply AI Price")
// -------------------------------------------------------------------------------------
// â€¢ Adds Apply AI Price button that updates product price instantly
// â€¢ Sends POST to backend
// â€¢ Updates local UI
// =====================================================================================

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UnifiedPricing({ productId }) {
  const [data, setData] = useState(null);
  const [finalPrice, setFinalPrice] = useState("");
  const [saving, setSaving] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    loadPricing();
  }, [productId]);

  const loadPricing = async () => {
    try {
      const res = await fetch(`/api/pricing/${productId}`);
      const json = await res.json();
      setData(json);
      setFinalPrice(json.ai_suggested_price);
    } catch (e) {
      console.error("Pricing fetch failed", e);
    }
  };

  // ----------------------------------------------------------------------------
  // SAVE FINAL PRICE (manual decision)
  // ----------------------------------------------------------------------------
  const savePrice = async () => {
    setSaving(true);
    try {
      await fetch(`/api/pricing/${productId}/final`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ final_price: finalPrice }),
      });
      toast.success("âœ”ï¸ ØªÙ…Øª Ø­ÙØ¸ Ø§Ù„Ø³Ø¹Ø±");
    } catch (e) {
      toast.error("âŒ ÙØ´Ù„ Ø­ÙØ¸ Ø§Ù„Ø³Ø¹Ø±");
    }
    setSaving(false);
  };

  // ----------------------------------------------------------------------------
  // APPLY AI PRICE (automatic)
  // ----------------------------------------------------------------------------
  const applyAIPrice = async () => {
    if (!data) return;

    const aiPrice = data.ai_suggested_price;
    setFinalPrice(aiPrice);
    setApplying(true);

    try {
      // Send update to product price backend
      const res = await fetch(`/api/product/${productId}/update-price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: aiPrice }),
      });

      if (res.ok) {
        toast.success("ðŸ¤– ØªÙ… ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…Ù‚ØªØ±Ø­ Ø¨Ù†Ø¬Ø§Ø­");
        // Refresh local pricing panel
        loadPricing();
      } else {
        toast.error("âŒ ÙØ´Ù„ ØªØ·Ø¨ÙŠÙ‚ Ø³Ø¹Ø± Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ");
      }
    } catch (e) {
      toast.error("âŒ Ù„Ø§ ÙŠÙ…ÙƒÙ† Ø§Ù„Ø§ØªØµØ§Ù„ Ø¨Ø§Ù„Ø®Ø§Ø¯Ù…");
    }

    setApplying(false);
  };

  if (!data)
    return <div className="text-gray-400 mt-4">Loading unified pricingâ€¦</div>;

  return (
    <div className="bg-white shadow-lg border rounded-2xl p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-green-700">
          Unified Pricing Engine
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium
            ${
              data.confidence === "High"
                ? "bg-green-100 text-green-700"
                : data.confidence === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {data.confidence} Confidence
        </span>
      </div>

      {/* AI Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Block label="AI Suggested Price" value={`${data.ai_suggested_price} SAR`} />
        <Block label="Recommended Range" value={`${data.min_price} - ${data.max_price} SAR`} />
        <Block label="Merchant Previous Price" value={`${data.last_price} SAR`} />
        <Block label="Market Benchmark" value={`${data.market_price} SAR`} />
      </div>

      {/* Revenue Projection */}
      <Section title="Revenue Projection">
        <ListItem k="Estimated Conversions" v={`${data.conversions_min} â€“ ${data.conversions_max}`} />
        <ListItem k="Expected Revenue" v={`${data.expected_revenue} SAR`} />
        <ListItem k="Core4.AI Fee" v={`${data.fee} SAR`} />
        <ListItem k="Net to Merchant" v={`${data.net_revenue} SAR`} />
      </Section>

      {/* Sensitivity */}
      <Section title="Sensitivity Analysis">
        <p className="text-sm text-gray-600">
          Price â†“ 10% â†’ Conversions â†‘ {data.sensitivity_down}%
        </p>
        <p className="text-sm text-gray-600">
          Price â†‘ 10% â†’ Conversions â†“ {data.sensitivity_up}%
        </p>
      </Section>

      {/* Final Price Input */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-600">Final Price</label>
        <input
          type="number"
          value={finalPrice}
          onChange={(e) => setFinalPrice(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {/* APPLY AI PRICE */}
        <button
          onClick={applyAIPrice}
          disabled={applying}
          className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          {applying ? "Applyingâ€¦" : "Apply AI Price ðŸ¤–"}
        </button>

        {/* USE AI FEBRUARY */}
        <button
          onClick={() => setFinalPrice(data.ai_suggested_price)}
          className="px-5 py-3 rounded-xl bg-green-100 text-green-700 font-semibold"
        >
          Use AI Suggestion
        </button>

        {/* SAVE MANUAL PRICE */}
        <button
          onClick={savePrice}
          className="px-5 py-3 rounded-xl bg-green-600 text-white font-semibold"
          disabled={saving}
        >
          {saving ? "Savingâ€¦" : "Save Price"}
        </button>
      </div>
    </div>
  );
}

// ---- Small Components ---------------------------------------

function Block({ label, value }) {
  return (
    <div className="p-4 bg-gray-50 border rounded-xl">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="p-4 bg-gray-50 rounded-xl">
      <h3 className="font-semibold mb-3 text-gray-700">{title}</h3>
      {children}
    </div>
  );
}

function ListItem({ k, v }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">{k}</span>
      <span className="font-semibold text-gray-800">{v}</span>
    </div>
  );
}
