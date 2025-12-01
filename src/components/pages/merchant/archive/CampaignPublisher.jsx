// ============================================================================
// ðŸ’š Core4.AI â€“ CampaignPublisher.jsx (v5.0 â€œSmart Save + Publish Editionâ€)
// -----------------------------------------------------------------------------
// â€¢ Receives full campaign object from CampaignBuilder
// â€¢ Zero input â€” user just reviews + clicks Publish
// â€¢ Clean summary view + Save Draft + Publish
// â€¢ Fully integrated with Smart Context Architecture
// ============================================================================

import React, { useState } from "react";
import toast from "react-hot-toast";

export default function CampaignPublisher({ campaign }) {
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingPublish, setLoadingPublish] = useState(false);

  if (!campaign) {
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-10 text-center text-gray-500">
        Ù„Ø§ ØªÙˆØ¬Ø¯ Ø­Ù…Ù„Ø© Ø¬Ø§Ù‡Ø²Ø© Ù„Ù„Ù†Ø´Ø± â€” Ø£ÙƒÙ…Ù„ Ø¨Ù†Ø§Ø¡ Ø§Ù„Ø­Ù…Ù„Ø© Ø£ÙˆÙ„Ù‹Ø§.
      </div>
    );
  }

  const {
    product,
    creative,
    marketingPlan,
    productIQ,
    merchantIntel,
  } = campaign;

  // ---------------------------------------------------------------------------
  // SAVE DRAFT
  // ---------------------------------------------------------------------------
  const saveDraft = async () => {
    setLoadingSave(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/merchant/campaign/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchant_id: "merchant_001",
          product_name: product?.name,
          objective: marketingPlan?.objective || "",
          message: marketingPlan?.message || "",
          plan: marketingPlan || {},
          influencers: creative?.ads || [],
          audience: merchantIntel?.audience_segments || [],
          productIQ: productIQ || {},
        }),
      });

      const data = await res.json();

      toast.success("ðŸ’¾ ØªÙ… Ø­ÙØ¸ Ø§Ù„Ø­Ù…Ù„Ø© ÙƒÙ…Ø³ÙˆØ¯Ø©");
    } catch (err) {
      console.error(err);
      toast.error("âŒ ÙØ´Ù„ Ø­ÙØ¸ Ø§Ù„Ù…Ø³ÙˆØ¯Ø©");
    }

    setLoadingSave(false);
  };

  // ---------------------------------------------------------------------------
  // PUBLISH
  // ---------------------------------------------------------------------------
  const publishCampaign = async () => {
    setLoadingPublish(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/merchant/campaign/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchant_id: "merchant_001",
          campaign_id: `cmp_${Date.now()}`,
          product: product,
          creative,
          marketingPlan,
          productIQ,
          merchantIntel,
        }),
      });

      const data = await res.json();

      toast.success("ðŸš€ ØªÙ… Ù†Ø´Ø± Ø§Ù„Ø­Ù…Ù„Ø© Ø¨Ù†Ø¬Ø§Ø­!");
    } catch (err) {
      console.error(err);
      toast.error("âŒ ÙØ´Ù„ Ù†Ø´Ø± Ø§Ù„Ø­Ù…Ù„Ø©");
    }

    setLoadingPublish(false);
  };

  // ---------------------------------------------------------------------------
  // RENDER SUMMARY
  // ---------------------------------------------------------------------------
  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white p-6 rounded-xl border shadow">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        ðŸ“¤ Ù†Ø´Ø± Ø§Ù„Ø­Ù…Ù„Ø© Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†ÙŠØ©
      </h2>

      {/* SUMMARY CARD */}
      <div className="space-y-6">

        {/* PRODUCT INFO */}
        <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
          <h3 className="font-bold text-gray-800 mb-2">ðŸ“¦ Ø§Ù„Ù…Ù†ØªØ¬</h3>
          <p className="text-gray-700">
            <span className="font-semibold">{product?.name}</span> â€” {product?.price} Ø±.Ø³
          </p>
        </div>

        {/* CREATIVE INFO */}
        <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
          <h3 className="font-bold text-gray-800 mb-2">ðŸŽ¬ Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ø¥Ø¨Ø¯Ø§Ø¹ÙŠ</h3>
          <p className="text-sm text-gray-700">
            {creative?.ads?.length || 0} Ø¥Ø¹Ù„Ø§Ù†Ø§Øª Ø¬Ø§Ù‡Ø²Ø© + Storyboard ØªÙ„Ù‚Ø§Ø¦ÙŠ
          </p>
        </div>

        {/* PRODUCT IQ */}
        <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
          <h3 className="font-bold text-gray-800 mb-2">ðŸ’Ž ProductIQ</h3>
          <p className="text-sm text-gray-700">
            Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…ÙˆØµÙ‰ Ø¨Ù‡:{" "}
            <span className="font-semibold">{productIQ?.recommended_price} Ø±.Ø³</span>
          </p>
        </div>

        {/* MARKET INTEL */}
        <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
          <h3 className="font-bold text-gray-800 mb-2">ðŸŒ Market Intel</h3>
          <p className="text-sm text-gray-700">
            Ù†Ù‚Ø§Ø· Ø§Ù„Ø¶Ø¹Ù: {merchantIntel?.competitor_weak_spots?.length || 0}
          </p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={saveDraft}
          disabled={loadingSave}
          className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 disabled:opacity-60"
        >
          {loadingSave ? "â³" : "ðŸ’¾ Ø­ÙØ¸ Ø§Ù„Ù…Ø³ÙˆØ¯Ø©"}
        </button>

        <button
          onClick={publishCampaign}
          disabled={loadingPublish}
          className="px-5 py-2 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 disabled:opacity-60"
        >
          {loadingPublish ? "â³" : "ðŸš€ Ù†Ø´Ø± Ø§Ù„Ø­Ù…Ù„Ø©"}
        </button>
      </div>
    </div>
  );
}
