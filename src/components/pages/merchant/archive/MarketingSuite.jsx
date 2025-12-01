// ============================================================
// ðŸ’š MarketingSuite.jsx â€” Saudi Edition (v4.0 â€œBeta Alignedâ€)
// ------------------------------------------------------------
// â€¢ Receives ProductIQ
// â€¢ Generates marketing plan
// â€¢ Bundles full payload â†’ CampaignBuilder
// â€¢ Fully aligned with backend v205.3
// ============================================================

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function MarketingSuite() {
  const location = useLocation();
  const navigate = useNavigate();

  const iq = location.state || null;

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [objective, setObjective] = useState("");
  const [message, setMessage] = useState("");

  const [plan, setPlan] = useState(null);
  const [influencers, setInfluencers] = useState([]);
  const [audience, setAudience] = useState([]);

  useEffect(() => {
    if (iq?.fromProductIQ) {
      setProductId(iq.product_id);
      setProductName(iq.product_name);
      setMessage(`AI: ${iq.ai_recommendations?.[0] || ""}`);
    }
  }, [iq]);

  async function generatePlan() {
    const res1 = await axios.post("http://127.0.0.1:8000/api/merchant/marketing_plan", {
      product_name: productName,
      objective,
      message,
    });

    const res2 = await axios.get(
      `http://127.0.0.1:8000/api/merchant/suggest_influencers/${productName}`
    );

    const res3 = await axios.get(
      `http://127.0.0.1:8000/api/merchant/audience_clusters/${productName}`
    );

    setPlan(res1.data.ai_marketing_plan);
    setInfluencers(res2.data.recommended_influencers);
    setAudience(res3.data.audience_segments);
  }

  const launchCampaignBuilder = () => {
    navigate(`/merchant/campaign-builder`, {
      state: {
        productId,
        productName,
        objective,
        message,
        plan,
        influencers,
        audience,
        productIQ: iq,
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

      <h1 className="text-2xl font-extrabold text-[#006C35] mb-6">
        Saudi Marketing Suite â€” Ø¨ÙˆØ§Ø¨Ø© Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„ØªØ³ÙˆÙŠÙ‚ÙŠ
      </h1>

      {iq?.fromProductIQ && (
        <div className="bg-green-50 border border-green-300 p-4 rounded mb-6 text-green-700">
          <p>ðŸ”— <strong>Connected to ProductIQ</strong></p>
          <p>â€¢ Category: {iq.category}</p>
          <p>â€¢ Best Tribe: {iq.best_tribe}</p>
          <p>â€¢ Expected Conversion: {iq.expected_conversion_rate}</p>
        </div>
      )}

      <div className="space-y-4">
        <input
          className="w-full border p-3 rounded"
          placeholder="Ø§Ø³Ù… Ø§Ù„Ù…Ù†ØªØ¬"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <select
          className="w-full border p-3 rounded"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
        >
          <option value="">Ù‡Ø¯Ù Ø§Ù„ØªØ³ÙˆÙŠÙ‚</option>
          <option value="new">Ø¥Ø·Ù„Ø§Ù‚ Ù…Ù†ØªØ¬ Ø¬Ø¯ÙŠØ¯</option>
          <option value="launch">Ø­Ù…Ù„Ø© Ø¥Ø·Ù„Ø§Ù‚</option>
          <option value="brand_reinforce">ØªØ¹Ø²ÙŠØ² Ø§Ù„Ø¹Ù„Ø§Ù…Ø© Ø§Ù„ØªØ¬Ø§Ø±ÙŠØ©</option>
        </select>

        <textarea
          className="w-full border p-3 rounded"
          placeholder="Ø§Ù„Ø±Ø³Ø§Ù„Ø© Ø§Ù„ØªØ³ÙˆÙŠÙ‚ÙŠØ©"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button
        onClick={generatePlan}
        className="mt-6 w-full py-3 bg-[#006C35] text-white font-bold rounded-lg"
      >
        âš¡ ØªÙˆÙ„ÙŠØ¯ Ø§Ù„Ø®Ø·Ø© Ø§Ù„ØªØ³ÙˆÙŠÙ‚ÙŠØ©
      </button>

      {plan && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          
          <h2 className="text-xl font-bold mb-4">Ø®Ø·Ø© Ø§Ù„ØªØ³ÙˆÙŠÙ‚ Ø§Ù„Ø°ÙƒÙŠØ©</h2>

          <p><strong>Ù†ÙˆØ¹ Ø§Ù„Ù…Ø­ØªÙˆÙ‰:</strong> {plan.content_types.join(", ")}</p>
          <p><strong>Ø£ÙˆÙ‚Ø§Øª Ø§Ù„Ù†Ø´Ø±:</strong> {plan.ideal_posting_times.join(", ")}</p>
          <p><strong>Ø§Ù„Ù‚Ø¨Ø§Ø¦Ù„:</strong> {plan.target_tribes.join(", ")}</p>
          <p><strong>Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ†:</strong> {plan.creator_level}</p>
          <p><strong>Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ©:</strong> {plan.budget_estimate}</p>

          <button
            onClick={launchCampaignBuilder}
            className="mt-8 w-full py-3 bg-black text-white rounded-lg font-bold"
          >
            ðŸš€ Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ø¥Ù„Ù‰ Ø¨Ù†Ø§Ø¡ Ø§Ù„Ø­Ù…Ù„Ø©
          </button>
        </div>
      )}
    </div>
  );
}
