// ============================================================
// ðŸ§® AdPricingCalculator.jsx â€” (v1.0 FINAL)
// ------------------------------------------------------------
// â€¢ Smart Ad Pricing Calculator for Merchants
// â€¢ Estimates clicks, conversions & revenue
// â€¢ Uses /api/merchant/ad_pricing backend
// ============================================================

import React, { useState } from "react";
import axios from "axios";

export default function AdPricingCalculator({ onClose }) {
  const [budget, setBudget] = useState("");
  const [cpc, setCpc] = useState("");
  const [conversionRate, setConversionRate] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/merchant/ad_pricing", {
        budget: parseFloat(budget),
        cpc: parseFloat(cpc),
        conversion_rate: parseFloat(conversionRate),
      });

      setResult(res.data);
    } catch (err) {
      console.error("Ad Calculator Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">

        {/* Header */}
        <h2 className="text-2xl font-bold mb-4 text-[#006C35]">
          ðŸ§® Ø­Ø§Ø³Ø¨Ø© Ø§Ù„Ø¥Ø¹Ù„Ø§Ù† Ø§Ù„Ø°ÙƒÙŠØ©
        </h2>

        {/* Budget */}
        <label className="block font-semibold mt-3">ðŸ’° Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ© (SAR)</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full border p-2 rounded mt-1"
          placeholder="Ù…Ø«Ù„: 1000"
        />

        {/* CPC */}
        <label className="block font-semibold mt-3">
          ðŸ’¸ Ù…ØªÙˆØ³Ø· Ø§Ù„ØªÙƒÙ„ÙØ© Ù„ÙƒÙ„ Ù†Ù‚Ø±Ø© (CPC)
        </label>
        <input
          type="number"
          value={cpc}
          onChange={(e) => setCpc(e.target.value)}
          className="w-full border p-2 rounded mt-1"
          placeholder="Ù…Ø«Ù„: 1.25"
        />

        {/* Conversion */}
        <label className="block font-semibold mt-3">
          ðŸŽ¯ Ù†Ø³Ø¨Ø© Ø§Ù„ØªØ­ÙˆÙŠÙ„ Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø© (%)
        </label>
        <input
          type="number"
          value={conversionRate}
          onChange={(e) => setConversionRate(e.target.value)}
          className="w-full border p-2 rounded mt-1"
          placeholder="Ù…Ø«Ù„: 3.2"
        />

        {/* Button */}
        <button
          onClick={calculate}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg shadow mt-5 hover:bg-green-700"
        >
          Ø§Ø­Ø³Ø¨ Ø§Ù„Ø¢Ù†
        </button>

        {/* Results */}
        {result && (
          <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
            <h3 className="font-bold text-lg text-gray-800 mb-3">
              ðŸ“Š Ø§Ù„Ù†ØªØ§Ø¦Ø¬ Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø©
            </h3>

            <p>ðŸ‘€ Ø§Ù„Ù†Ù‚Ø±Ø§Øª Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø©: {result.clicks_estimate}</p>
            <p>ðŸ›’ Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø©: {result.conversion_estimate}</p>
            <p>ðŸ’° Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø©: {result.expected_revenue} SAR</p>
          </div>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          className="w-full bg-gray-200 text-gray-700 mt-6 py-2 rounded-lg hover:bg-gray-300"
        >
          Ø¥ØºÙ„Ø§Ù‚
        </button>
      </div>
    </div>
  );
}
