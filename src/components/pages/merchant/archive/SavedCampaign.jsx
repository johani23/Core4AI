// ============================================================================
// ðŸ’š Core4.AI â€” CampaignPublisher.jsx (v13 PRO)
// ----------------------------------------------------------------------------
// â€¢ Save Draft
// â€¢ Publish to Creators (Auto-selected from AI plan)
// â€¢ Review Summary (Product + Plan + Pricing + Creative Kit)
// â€¢ Full backend integration
// ============================================================================

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function CampaignPublisher() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">âš ï¸ No campaign data</h2>
        <button
          onClick={() => navigate("/merchant")}
          className="px-6 py-3 bg-[#006C35] text-white rounded-lg"
        >
          Ø§Ù„Ø¹ÙˆØ¯Ø© Ø¥Ù„Ù‰ Merchant Hub
        </button>
      </div>
    );
  }

  // ----------------------------------------------
  // Extract state passed from CampaignBuilder
  // ----------------------------------------------
  const {
    merchantId,
    productId,
    productName,
    objective,
    message,
    aiPlan,
    influencers,
    audiences,
    creativeKit,
    productIQ,
  } = state;

  const [selectedCreators, setSelectedCreators] = useState(
    influencers.map((i) => i.name)
  );

  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedCampaignId, setSavedCampaignId] = useState(null);

  // ----------------------------------------------
  // Save as Draft
  // ----------------------------------------------
  const saveDraft = async () => {
    setSaving(true);

    try {
      const res = await fetch("/api/merchant/campaign/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaign_id: savedCampaignId,
          merchant_id: merchantId,
          product_name: productName,
          objective,
          message,
          plan: aiPlan,
          influencers,
          audience: audiences,
          productIQ,
        }),
      });

      const data = await res.json();
      setSavedCampaignId(data.campaign.id);

      toast.success("ØªÙ… Ø­ÙØ¸ Ø§Ù„Ø­Ù…Ù„Ø© ÙƒÙ…Ø³ÙˆØ¯Ø©!");

    } catch (err) {
      toast.error("Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø­ÙØ¸ Ø§Ù„Ø­Ù…Ù„Ø©");
    }

    setSaving(false);
  };

  // ----------------------------------------------
  // Publish Campaign
  // ----------------------------------------------
  const publishCampaign = async () => {
    if (!savedCampaignId) {
      toast.error("ÙŠØ¬Ø¨ Ø­ÙØ¸ Ø§Ù„Ø­Ù…Ù„Ø© Ù‚Ø¨Ù„ Ù†Ø´Ø±Ù‡Ø§");
      return;
    }

    setPublishing(true);

    try {
      const res = await fetch("/api/merchant/campaign/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaign_id: savedCampaignId,
          creators: selectedCreators,
        }),
      });

      const data = await res.json();

      toast.success("ðŸš€ ØªÙ… Ù†Ø´Ø± Ø§Ù„Ø­Ù…Ù„Ø© Ø¥Ù„Ù‰ Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ†!");

      navigate("/merchant/campaigns", {
        state: { published: true, data },
      });

    } catch (err) {
      toast.error("Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ù†Ø´Ø± Ø§Ù„Ø­Ù…Ù„Ø©");
    }

    setPublishing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 text-gray-900">

      <h1 className="text-3xl font-extrabold text-[#006C35] mb-6">
        ðŸ“¤ Publish Marketing Campaign
      </h1>

      {/* ================================
          SECTION 1 â€” Review Summary
      ================================== */}
      <div className="bg-white p-6 rounded-xl mb-10 shadow-lg border">

        <h2 className="text-2xl font-bold mb-4">ðŸ“¦ Product Summary</h2>

        <p><strong>Product:</strong> {productName}</p>
        <p><strong>Objective:</strong> {objective}</p>
        <p><strong>Message:</strong> {message}</p>

        <hr className="my-4" />

        <h3 className="text-xl font-bold text-[#006C35] mb-2">ðŸŽ¯ Marketing Plan</h3>
        <p><strong>Content Types:</strong> {aiPlan.content_types.join(", ")}</p>
        <p><strong>Best Times:</strong> {aiPlan.ideal_posting_times.join(", ")}</p>
        <p><strong>Target Tribes:</strong> {aiPlan.target_tribes.join(", ")}</p>

        {productIQ && (
          <>
            <hr className="my-4" />
            <h3 className="text-xl font-bold text-purple-700">ðŸ§  Product Intelligence</h3>
            <p><strong>AI Price:</strong> {productIQ.ai_proposed_price} SAR</p>
            <p><strong>Commission:</strong> {productIQ.commission_rate}%</p>
            <p className="text-sm text-gray-600">{productIQ.pricing_explanation}</p>
          </>
        )}
      </div>

      {/* ================================
          SECTION 2 â€” Select Creators
      ================================== */}
      <div className="bg-white p-6 rounded-xl mb-10 shadow border">

        <h2 className="text-2xl font-bold text-[#006C35] mb-4">ðŸ‘‘ Select Creators</h2>

        <div className="space-y-3">
          {influencers.map((inf, idx) => (
            <label key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border">
              <input
                type="checkbox"
                checked={selectedCreators.includes(inf.name)}
                onChange={() => {
                  setSelectedCreators((prev) =>
                    prev.includes(inf.name)
                      ? prev.filter((x) => x !== inf.name)
                      : [...prev, inf.name]
                  );
                }}
              />
              <div>
                <p className="font-bold">{inf.name}</p>
                <p className="text-sm text-gray-600">
                  Tribe: {inf.tribe} | Score: {inf.score}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* ================================
          SECTION 3 â€” Publishing Actions
      ================================== */}
      <div className="flex gap-6">

        <button
          onClick={saveDraft}
          disabled={saving}
          className="flex-1 py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-black"
        >
          {saving ? "Savingâ€¦" : "ðŸ’¾ Save Draft"}
        </button>

        <button
          onClick={publishCampaign}
          disabled={publishing}
          className="flex-1 py-4 bg-[#006C35] text-white rounded-xl font-bold hover:bg-green-800"
        >
          {publishing ? "Publishingâ€¦" : "ðŸš€ Publish"}
        </button>
      </div>

    </div>
  );
}
