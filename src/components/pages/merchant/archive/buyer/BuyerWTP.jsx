// ============================================================================
// ðŸ’š BuyerWTP.jsx (Phase 5 â€“ Buyer Pricing Input Screen)
// ============================================================================

import React, { useState } from "react";

export default function BuyerWTP() {
  const [feature, setFeature] = useState("");
  const [value, setValue] = useState("");
  const [avg, setAvg] = useState(null);

  const submit = async () => {
    const res = await fetch("/api/wtp/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feature,
        value: parseFloat(value)
      })
    });

    const data = await res.json();
    setAvg(data.avg);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border rounded-xl shadow">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ðŸ’µ ÙƒÙ… ØªØ¯ÙØ¹ Ù…Ù‚Ø§Ø¨Ù„ Ù‡Ø°Ù‡ Ø§Ù„Ù…ÙŠØ²Ø©ØŸ
      </h2>

      <input
        type="text"
        placeholder="Ù…Ø«Ø§Ù„: inverter / silent"
        value={feature}
        onChange={e => setFeature(e.target.value)}
        className="w-full p-3 border rounded mb-3"
      />

      <input
        type="number"
        placeholder="ÙƒÙ… ØªØ³ØªØ­Ù‚ Ù‡Ø°Ù‡ Ø§Ù„Ù…ÙŠØ²Ø©ØŸ"
        value={value}
        onChange={e => setValue(e.target.value)}
        className="w-full p-3 border rounded mb-3"
      />

      <button
        onClick={submit}
        className="w-full bg-green-700 text-white py-3 rounded-lg"
      >
        Ø¥Ø±Ø³Ø§Ù„
      </button>

      {avg !== null && (
        <p className="mt-4 text-center font-bold text-green-800">
          Ù…ØªÙˆØ³Ø· Ù…Ø§ ÙŠØ¯ÙØ¹Ù‡ Ø§Ù„Ù…Ø´ØªØ±ÙˆÙ† Ù„Ù‡Ø°Ù‡ Ø§Ù„Ù…ÙŠØ²Ø©: {avg} Ø±.Ø³
        </p>
      )}
    </div>
  );
}
