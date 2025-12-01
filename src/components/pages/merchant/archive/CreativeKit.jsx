// ============================================================================
// ðŸ’š Core4.AI â€“ CreativeKit.jsx (Ultra Edition v2 UI)
// ----------------------------------------------------------------------------
// â€¢ Receives creative pack from CampaignBuilder
// â€¢ Displays Storyboard, Variations, KPIs, Audio, Shot List
// â€¢ Clean cinematic UI for creators & merchants
// ============================================================================

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CreativeKit() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.creatives) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          âš ï¸ Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù…Ø­ØªÙˆÙ‰ Ø¥Ø¨Ø¯Ø§Ø¹ÙŠ Ù…ÙˆÙ„Ù‘Ø¯
        </h1>
        <button
          className="mt-6 bg-[#006C35] px-6 py-3 text-white rounded-xl"
          onClick={() => navigate("/merchant/campaign-builder")}
        >
          Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù…Ù†Ø´Ø¦ Ø§Ù„Ø­Ù…Ù„Ø©
        </button>
      </div>
    );
  }

  const c = state.creatives;

  return (
    <div className="min-h-screen p-10 bg-gray-50 text-gray-900">

      <h1 className="text-3xl font-extrabold text-[#006C35] mb-6">
        ðŸŽ¬ Creative Kit â€“ Ø§Ù„Ø­Ø²Ù…Ø© Ø§Ù„Ø¥Ø¨Ø¯Ø§Ø¹ÙŠØ© Ø§Ù„ÙƒØ§Ù…Ù„Ø©
      </h1>

      {/* Storyboard */}
      <section className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">ðŸŽžï¸ Storyboard</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {c.storyboard.map((sc, i) => (
            <div key={i} className="border rounded-xl p-4 bg-gray-50">
              <h3 className="font-bold text-lg">Scene {sc.scene}: {sc.title}</h3>
              <p>â± {sc.duration}</p>
              <p>ðŸŽ­ Emotion: {sc.emotion_arc}</p>
              <p>ðŸŽ¥ Camera: {sc.camera_movement}</p>
              <p className="mt-2 text-sm text-gray-700">{sc.script}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Variations */}
      <section className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">ðŸŽ¥ 50 Ad Variations</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {c.ad_variations.slice(0, 20).map((ad, i) => (
            <div key={i} className="p-4 border rounded-xl bg-gray-50">
              <h3 className="font-bold text-lg">Ad #{ad.id}</h3>
              <p>ðŸŽ¬ Hook: {ad.hook}</p>
              <p>ðŸŽ¯ Angle: {ad.angle}</p>
              <p>ðŸ“± Platform: {ad.platform}</p>
              <p>â± Duration: {ad.duration}</p>
              <p className="text-sm text-gray-600 mt-2">CTA: {ad.cta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Voiceover */}
      <section className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">ðŸŽ¤ Voiceover Script</h2>
        {c.voiceover.lines.map((line, i) => (
          <p key={i} className="text-lg mb-2">â€¢ {line}</p>
        ))}
      </section>

      {/* KPIs */}
      <section className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">ðŸ“ˆ KPI Predictions</h2>
        <p>CTR: {c.kpi_predictions.ctr}</p>
        <p>3s Retention: {c.kpi_predictions.retention_3s}</p>
        <p>8s Retention: {c.kpi_predictions.retention_8s}</p>
        <p>Conversion: {c.kpi_predictions.conversion_estimate}</p>
      </section>

    </div>
  );
}
