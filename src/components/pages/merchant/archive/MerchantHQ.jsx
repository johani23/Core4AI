// ===================================================================
// ðŸ’š Core4.AI â€“ MerchantHQ.jsx (Saudi Edition â€“ Unified Control Center)
// -------------------------------------------------------------------
// â€¢ Multi-tab Saudi-styled HQ for merchants
// â€¢ Connected to product endpoints + intel + campaigns + creators
// ===================================================================

import React, { useState, useEffect } from "react";
import {
  FiBox,
  FiBarChart,
  FiTrendingUp,
  FiUsers,
  FiTarget,
  FiSettings,
  FiZap,
  FiRefreshCcw,
} from "react-icons/fi";

import MerchantOverview from "./MerchantOverview";
import MerchantProducts from "./MerchantProducts";
import MerchantCampaigns from "./MerchantCampaigns";
import MerchantAIAdvisor from "./MerchantAIAdvisor";
import MerchantCreatorMatch from "./MerchantCreatorMatch";
import MerchantOrders from "./MerchantOrders";
import MerchantTribeTargeting from "./MerchantTribeTargeting";
import MerchantSettings from "./MerchantSettings";

export default function MerchantHQ() {
  const [tab, setTab] = useState("overview");

  const tabs = [
    { id: "overview", icon: <FiBarChart />, label: "Ù†Ø¸Ø±Ø© Ø¹Ø§Ù…Ø©" },
    { id: "products", icon: <FiBox />, label: "Ù…Ù†ØªØ¬Ø§ØªÙŠ" },
    { id: "campaigns", icon: <FiTrendingUp />, label: "Ø§Ù„Ø­Ù…Ù„Ø§Øª" },
    { id: "advisor", icon: <FiZap />, label: "Ø§Ù„Ù…Ø³ØªØ´Ø§Ø± Ø§Ù„Ø°ÙƒÙŠ" },
    { id: "creators", icon: <FiUsers />, label: "Ø§Ù‚ØªØ±Ø§Ø­ Ù…Ø¤Ø«Ø±ÙŠÙ†" },
    { id: "tribes", icon: <FiTarget />, label: "Ø§Ø³ØªÙ‡Ø¯Ø§Ù Ø§Ù„Ù‚Ø¨Ø§Ø¦Ù„" },
    { id: "orders", icon: <FiRefreshCcw />, label: "Ø§Ù„Ø·Ù„Ø¨Ø§Øª" },
    { id: "settings", icon: <FiSettings />, label: "Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª" },
  ];

  return (
    <div className="min-h-screen bg-[#002b16] text-white p-8">

      <h1 className="text-3xl font-extrabold text-[#4cff9b] mb-6">
        ðŸ¬ Ù…Ø±ÙƒØ² Ø§Ù„ØªØ§Ø¬Ø± â€“ Core4.AI
      </h1>

      {/* ---------------- Tabs ---------------- */}
      <div className="flex gap-4 mb-6 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-bold
              ${
                tab === t.id
                  ? "bg-[#4cff9b] text-[#002b16]"
                  : "bg-[#01341c] text-gray-300 border border-[#1d6642]"
              }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* --------------- Render Tab --------------- */}
      <div className="mt-6">
        {tab === "overview" && <MerchantOverview />}
        {tab === "products" && <MerchantProducts />}
        {tab === "campaigns" && <MerchantCampaigns />}
        {tab === "advisor" && <MerchantAIAdvisor />}
        {tab === "creators" && <MerchantCreatorMatch />}
        {tab === "tribes" && <MerchantTribeTargeting />}
        {tab === "orders" && <MerchantOrders />}
        {tab === "settings" && <MerchantSettings />}
      </div>

    </div>
  );
}
