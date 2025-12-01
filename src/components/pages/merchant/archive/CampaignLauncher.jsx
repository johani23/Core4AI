// ============================================================================
// ðŸ’š Core4.AI â€“ CampaignLauncher.jsx (E13 â€œAuto Campaign + QR Trackingâ€)
// ----------------------------------------------------------------------------
// â€¢ Auto Campaign Creation
// â€¢ QR Tracking per Influencer
// â€¢ Creator Reward Integration
// â€¢ Campaign Modes: Standard / Events / Seeding
// ============================================================================

import React, { useState } from "react";
import {
  FiPlayCircle,
  FiUsers,
  FiLink,
  FiCamera,
  FiGift,
  FiMapPin,
  FiSend,
  FiTrendingUp,
} from "react-icons/fi";
import QRCode from "react-qr-code";

export default function CampaignLauncher() {
  const [productName, setProductName] = useState("");
  const [tribe, setTribe] = useState("");
  const [mode, setMode] = useState("standard");
  const [campaign, setCampaign] = useState(null);

  const TRIBE_INFLUENCERS = {
    Techy: ["@TechFahd", "@AIReviewers", "@SaudiGamerX"],
    Fashionists: ["@LamaStyle", "@NoorBeauty", "@MahaTrends"],
    EventGoers: ["@SnapCity", "@ConcertGCC", "@FOMO_King"],
    Adventurers: ["@SaudiHikers", "@CampWithMe", "@DesertNomad"],
  };

  const launchCampaign = () => {
    if (!productName || !tribe) return;

    const id = "CAMP-" + Math.random().toString(36).substr(2, 6).toUpperCase();

    const influencers = TRIBE_INFLUENCERS[tribe] || [];

    const influencerLinks = influencers.map((inf) => ({
      influencer: inf,
      track_url: `https://core4.ai/t/${id}/${inf.replace("@", "")}`,
      qr_data: `core4.ai/t/${id}/${inf.replace("@", "")}`,
      reward_per_sale: Math.floor(Math.random() * 18 + 7) + " SAR",
    }));

    setCampaign({
      id,
      product: productName,
      tribe,
      mode,
      influencers: influencerLinks,
      global_qr: `core4.ai/t/${id}/public`,
      created_at: new Date().toLocaleString(),
    });
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <h1 className="text-3xl font-extrabold text-[#4cff9b] flex items-center gap-3">
        <FiPlayCircle /> E13 â€” Auto Campaign Launcher
      </h1>

      <p className="text-gray-300">
        Ø§Ù„Ù†Ø¸Ø§Ù… ÙŠÙ†Ø´Ø¦ Ø­Ù…Ù„Ø© ÙƒØ§Ù…Ù„Ø©: Ø±ÙˆØ§Ø¨Ø· + QR + ØªÙˆØ²ÙŠØ¹ Ù…Ø¤Ø«Ø±ÙŠÙ† + Ù…ÙƒØ§ÙØ¢Øª Ù…Ø¨ÙŠØ¹Ø§Øª.
      </p>

      {/* Form */}
      <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl space-y-5">
        <input
          placeholder="Ø§Ø³Ù… Ø§Ù„Ù…Ù†ØªØ¬"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full px-4 py-3 bg-[#002015] border border-[#145536] text-white rounded-lg"
        />

        <select
          value={tribe}
          onChange={(e) => setTribe(e.target.value)}
          className="w-full px-4 py-3 bg-[#002015] border border-[#145536] text-white rounded-lg"
        >
          <option value="">Ø§Ø®ØªØ± Ø§Ù„Ù‚Ø¨ÙŠÙ„Ø©</option>
          <option value="Techy">Techy</option>
          <option value="Fashionists">Fashionists</option>
          <option value="EventGoers">EventGoers</option>
          <option value="Adventurers">Adventurers</option>
        </select>

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="w-full px-4 py-3 bg-[#002015] border border-[#145536] text-white rounded-lg"
        >
          <option value="standard">Standard Campaign</option>
          <option value="events">Events Mode (ÙØ¹Ø§Ù„ÙŠØ§Øª)</option>
          <option value="seeding">Seeding Mode (Ù‡Ø¯Ø§ÙŠØ§)</option>
        </select>

        <button
          onClick={launchCampaign}
          className="w-full py-3 bg-[#4cff9b] text-black font-extrabold rounded-lg flex items-center justify-center gap-2"
        >
          Ø¥Ø·Ù„Ø§Ù‚ Ø§Ù„Ø­Ù…Ù„Ø©
        </button>
      </div>

      {/* Campaign Results */}
      {campaign && (
        <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl space-y-10">

          {/* Basic Info */}
          <h2 className="text-2xl font-bold text-[#4cff9b]">
            ØªÙ… Ø¥Ù†Ø´Ø§Ø¡ Ø§Ù„Ø­Ù…Ù„Ø© Ø¨Ù†Ø¬Ø§Ø­ ðŸŽ‰
          </h2>

          <p className="text-gray-300">Ø±Ù‚Ù… Ø§Ù„Ø­Ù…Ù„Ø©: {campaign.id}</p>
          <p className="text-gray-300">Ø§Ù„Ù…Ù†ØªØ¬: {campaign.product}</p>
          <p className="text-gray-300">Ø§Ù„Ù‚Ø¨ÙŠÙ„Ø©: {campaign.tribe}</p>
          <p className="text-gray-300">Ø§Ù„ÙˆØ¶Ø¹: {campaign.mode}</p>

          <hr className="border-[#1b6647]" />

          {/* Global QR */}
          <div>
            <h3 className="text-xl font-bold text-[#4cff9b] flex items-center gap-2">
              <FiLink /> QR Ø¹Ø§Ù… Ù„Ù„Ø­Ù…Ù„Ø©
            </h3>
            <div className="mt-3 bg-white p-4 inline-block rounded-lg">
              <QRCode value={campaign.global_qr} size={150} />
            </div>
            <p className="text-gray-400 text-sm mt-2">{campaign.global_qr}</p>
          </div>

          {/* Influencers */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-[#4cff9b] flex items-center gap-2">
              <FiUsers /> Ø±ÙˆØ§Ø¨Ø· Ø§Ù„ØªØªØ¨Ø¹ + QR Ù„ÙƒÙ„ Ù…Ø¤Ø«Ø±
            </h3>

            {campaign.influencers.map((inf, idx) => (
              <div
                key={idx}
                className="bg-[#002015] border border-[#145536] p-5 rounded-lg"
              >
                <h4 className="text-[#4cff9b] font-bold">{inf.influencer}</h4>
                <p className="text-gray-300 mt-1">{inf.track_url}</p>
                <p className="text-gray-500 text-sm">
                  Reward: {inf.reward_per_sale}
                </p>

                <div className="bg-white p-3 inline-block mt-3 rounded-lg">
                  <QRCode value={inf.qr_data} size={120} />
                </div>
              </div>
            ))}
          </div>

          {/* Rewards Logic */}
          <div>
            <h3 className="text-xl font-bold text-[#4cff9b] flex items-center gap-2">
              <FiTrendingUp /> Ù†Ø¸Ø§Ù… Ø§Ù„Ù…ÙƒØ§ÙØ¢Øª
            </h3>

            <ul className="text-gray-300 mt-3 space-y-2">
              <li>â€¢ ÙƒÙ„ Ø¹Ù…Ù„ÙŠØ© Ø´Ø±Ø§Ø¡ â†” Ù…ÙƒØ§ÙØ£Ø© Ù…Ø¨Ø§Ø´Ø±Ø© Ù„Ù„Ù…Ø¤Ø«Ø±</li>
              <li>â€¢ Ø±ÙØ¹ Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ù‚Ø¨ÙŠÙ„Ø© (dopamine + token)</li>
              <li>â€¢ ØªØ­Ø³ÙŠÙ† D-Index</li>
              <li>â€¢ Ø¯Ø¹Ù… ØªØ±Ø´ÙŠØ­ Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ† Ù„Ù„Ø­Ù…Ù„Ø§Øª Ø§Ù„Ù‚Ø§Ø¯Ù…Ø©</li>
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}
