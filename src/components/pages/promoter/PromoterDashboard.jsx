// ============================================================================
// ðŸ’¼ Core4.AI â€“ PromoterDashboard.jsx (v3.0 â€œSaudi-Tech A3 Editionâ€)
// ============================================================================
// â€¢ Full UI rebuild using Saudi-Tech hybrid identity (Dark + Green + Gold)
// â€¢ CorePanel, CoreButton, CoreHeader integration
// â€¢ Clean and premium layout
// â€¢ SubTribe + Commission panels refined
// ============================================================================

import React, { useState } from "react";
import CorePanel from "@/components/ui/CorePanel";
import CoreButton from "@/components/ui/CoreButton";
import CoreHeader from "@/components/ui/CoreHeader";
import PromoterCommissionPanel from "./PromoterCommissionPanel";
import SubTribeCommission from "./SubTribeCommission";
import SubTribePanel from "@/components/SubTribePanel";

export default function PromoterDashboard() {
  const API = "http://127.0.0.1:8000";

  const [campaignId, setCampaignId] = useState("");
  const [variant, setVariant] = useState("");
  const [amount, setAmount] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [notice, setNotice] = useState("");

  // ------------------------------------------------------------
  // API Calls
  // ------------------------------------------------------------
  const placeOrder = async () => {
    if (!campaignId) {
      setNotice("âš ï¸ Please enter a campaign ID first");
      return;
    }

    try {
      const res = await fetch(`${API}/order/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "U101",
          campaign_id: campaignId,
          variant_size: variant,
          amount: parseFloat(amount),
          compatibility_score: 0.9,
        }),
      });

      const data = await res.json();
      setOrderId(data.order_id || "");
      setNotice(`âœ… Order placed successfully.`);
    } catch {
      setNotice("âŒ Failed to place order");
    }
  };

  const returnOrder = async () => {
    if (!orderId) {
      setNotice("âš ï¸ No order to return");
      return;
    }

    try {
      await fetch(`${API}/order/return`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId }),
      });
      setNotice("â†©ï¸ Order returned â€“ commission reversed");
    } catch {
      setNotice("âŒ Return failed");
    }
  };

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0A0F12] text-white p-8 space-y-10">

      {/* HEADER */}
      <CoreHeader
        title="Promoter Dashboard"
        subtitle="Manage orders, commissions, and your Sub-Tribe performance"
        icon="ðŸ’¼"
      />

      {/* ============================
          ORDER SIMULATION PANEL
      ============================= */}
      <CorePanel>
        <h2 className="text-2xl font-semibold text-[#CBA65C] mb-4 flex items-center gap-2">
          ðŸŽ¯ Simulate Order
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <input
            className="p-3 bg-[#11161A] border border-[#1F8C4D]/30 text-white rounded-xl"
            placeholder="Campaign ID"
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
          />
          <input
            className="p-3 bg-[#11161A] border border-[#1F8C4D]/30 text-white rounded-xl"
            placeholder="Variant Size"
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
          />
          <input
            className="p-3 bg-[#11161A] border border-[#1F8C4D]/30 text-white rounded-xl"
            placeholder="Amount (SAR)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex gap-4 mt-6">
          <CoreButton label="Place Order" variant="primary" onClick={placeOrder} />
          <CoreButton label="Return Order" variant="danger" onClick={returnOrder} />
        </div>

        {notice && (
          <p className="text-sm text-gray-300 mt-4">{notice}</p>
        )}
      </CorePanel>

      {/* ============================
          SUB-TRIBE MANAGEMENT PANEL
      ============================= */}
      <CorePanel>
        <h2 className="text-2xl font-semibold text-[#CBA65C] mb-4 flex items-center gap-2">
          ðŸ¤ Sub-Tribe Management
        </h2>

        <SubTribePanel userId="U101" />
      </CorePanel>

      {/* ============================
          COMMISSIONS PANEL
      ============================= */}
      <div className="grid grid-cols-2 gap-6 pt-4">
        <CorePanel>
          <PromoterCommissionPanel />
        </CorePanel>

        <CorePanel>
          <SubTribeCommission />
        </CorePanel>
      </div>

    </div>
  );
}
