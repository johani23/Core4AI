// =============================================================
// ðŸ’¼ Core4.AI â€“ Promoter.jsx (v7 Unified Flywheel Pre-Beta)
// -------------------------------------------------------------
// - Simulate/Return Order
// - Creator Content Linking
// - Sub-Tribe Management
// - Real-time Order Stream (WebSocket)
// - Earnings Summary
// =============================================================

import React, { useState, useEffect } from "react";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function Promoter() {
  const { wsData } = useCoreSync();

  const [campaignId, setCampaignId] = useState("");
  const [variantSize, setVariantSize] = useState("");
  const [orderValue, setOrderValue] = useState("");

  const [subTribeName, setSubTribeName] = useState("");
  const [subTribeCampaign, setSubTribeCampaign] = useState("");
  const [commissionSplit, setCommissionSplit] = useState("");

  const [creatorId, setCreatorId] = useState("");
  const [contentId, setContentId] = useState("");

  const [orderStream, setOrderStream] = useState([]);
  const [earnings, setEarnings] = useState(0);

  // Listen to WebSocket data for new orders
  useEffect(() => {
    if (!wsData) return;

    if (wsData.type === "order_event") {
      setOrderStream((prev) => [wsData, ...prev.slice(0, 15)]);
      setEarnings((prev) => prev + (wsData.promoter_commission || 0));
    }
  }, [wsData]);

  const simulateOrder = async () => {
    await fetch("/api/promoter/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        campaign_id: campaignId,
        variant_size: variantSize,
        amount: orderValue,
      }),
    });
  };

  const returnOrder = async () => {
    await fetch("/api/promoter/return", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        campaign_id: campaignId,
        variant_size: variantSize,
      }),
    });
  };

  const createSubTribe = async () => {
    await fetch("/api/promoter/sub-tribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: subTribeName,
        campaign_id: subTribeCampaign,
        split: commissionSplit,
      }),
    });
  };

  const linkCreatorContent = async () => {
    await fetch("/api/promoter/link-creator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creator_id: creatorId,
        content_id: contentId,
        campaign_id: campaignId,
      }),
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-pink-200 mb-8">
        ðŸ’¼ Promoter Dashboard
      </h1>

      {/* Simulate Order */}
      <div className="bg-gray-900 p-6 rounded-2xl mb-8">
        <h2 className="text-xl text-white mb-4">ðŸŽ¯ Simulate Order</h2>

        <div className="grid grid-cols-3 gap-4">
          <input
            className="bg-gray-800 p-3 rounded-lg text-white"
            placeholder="Campaign ID"
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
          />

          <input
            className="bg-gray-800 p-3 rounded-lg text-white"
            placeholder="Variant Size"
            value={variantSize}
            onChange={(e) => setVariantSize(e.target.value)}
          />

          <input
            className="bg-gray-800 p-3 rounded-lg text-white"
            placeholder="Order Amount"
            value={orderValue}
            onChange={(e) => setOrderValue(e.target.value)}
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={simulateOrder}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white"
          >
            Place Order
          </button>

          <button
            onClick={returnOrder}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white"
          >
            Return Order
          </button>
        </div>
      </div>

      {/* Creator Content Linking */}
      <div className="bg-gray-900 p-6 rounded-2xl mb-8">
        <h2 className="text-xl text-white mb-4">ðŸ”— Link Creator Content</h2>

        <div className="grid grid-cols-3 gap-4">
          <input
            className="bg-gray-800 p-3 rounded-lg text-white"
            placeholder="Creator ID"
            value={creatorId}
            onChange={(e) => setCreatorId(e.target.value)}
          />
          <input
            className="bg-gray-800 p-3 rounded-lg text-white"
            placeholder="Content ID"
            value={contentId}
            onChange={(e) => setContentId(e.target.value)}
          />
          <button
            onClick={linkCreatorContent}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-white"
          >
            Link
          </button>
        </div>
      </div>

      {/* Sub-Tribe */}
      <div className="bg-gray-900 p-6 rounded-2xl mb-8">
        <h2 className="text-xl text-white mb-4">ðŸ¤ Sub-Tribe Management</h2>

        <div className="grid grid-cols-3 gap-4">
          <input
            className="bg-gray-800 p-3 rounded-lg text-white"
            placeholder="Sub-Tribe Name"
            value={subTribeName}
            onChange={(e) => setSubTribeName(e.target.value)}
          />

          <input
            className="bg-gray-800 p-3 rounded-lg text-white"
            placeholder="Campaign ID"
            value={subTribeCampaign}
            onChange={(e) => setSubTribeCampaign(e.target.value)}
          />

          <input
            className="bg-gray-800 p-3 rounded-lg text-white"
            placeholder="Commission Split %"
            value={commissionSplit}
            onChange={(e) => setCommissionSplit(e.target.value)}
          />
        </div>

        <button
          onClick={createSubTribe}
          className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg text-white mt-4"
        >
          Create Sub-Tribe
        </button>
      </div>

      {/* Real-Time Order Stream */}
      <div className="bg-gray-900 p-6 rounded-2xl mb-8">
        <h2 className="text-xl text-white mb-4">ðŸ“¡ Real-Time Orders</h2>

        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {orderStream.map((o, i) => (
            <div
              key={i}
              className="bg-gray-800 p-3 rounded-lg text-gray-200 text-sm"
            >
              <strong>Order:</strong> {o.amount} SAR  
              <br />
              <strong>Creator:</strong> {o.creator_id}  
              <br />
              <strong>Campaign:</strong> {o.campaign_id}  
              <br />
              <strong>Commission:</strong> {o.promoter_commission}  
            </div>
          ))}
        </div>
      </div>

      {/* Earnings */}
      <div className="bg-gray-800 p-6 rounded-2xl text-center text-white text-xl">
        ðŸ’° Total Promoter Earnings:{" "}
        <span className="text-green-400 font-bold">{earnings.toFixed(2)} SAR</span>
      </div>
    </div>
  );
}
