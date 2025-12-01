// ============================================================
// ðŸ’š Core4.AI â€“ BuyerRND.jsx (v1)
// "Willingness-To-Pay UX"
// ============================================================

import React, { useState, useEffect } from "react";

export default function BuyerRND({ feature }) {

  const [value, setValue] = useState(3);
  const [submitted, setSubmitted] = useState(false);

  const submit = async () => {
    const res = await fetch("/api/rnd/wtp/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        buyer_id: "buyer_001",
        feature_id: feature.feature_id,
        wtp_value: value,
      }),
    });

    if (res.ok) setSubmitted(true);
  };

  if (submitted)
    return (
      <div className="p-6 text-center text-green-600 font-bold">
        âœ”ï¸ Ø´ÙƒØ±Ø§Ù‹! ØªÙ… Ø¥Ø±Ø³Ø§Ù„ ØªÙ‚ÙŠÙŠÙ…Ùƒ Ù„Ù„Ù…ÙŠØ²Ø© Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø©.
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow">

      <h2 className="text-xl font-bold mb-3">{feature.title}</h2>
      <p className="text-gray-600 mb-4">{feature.description}</p>

      {feature.media_urls.map((url) => (
        <img key={url} src={url} className="rounded mb-4" />
      ))}

      <label className="block font-semibold mb-2">
        ÙƒÙ… ØªØ¹ØªÙ‚Ø¯ ÙŠØ³ØªØ­Ù‚ Ø³Ø¹Ø± Ù‡Ø°Ù‡ Ø§Ù„Ø¥Ø¶Ø§ÙØ©ØŸ
      </label>

      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full"
      />

      <div className="text-center text-lg font-semibold mt-2">
        ØªÙ‚ÙŠÙŠÙ…Ùƒ: <span className="text-green-700">{value}</span> / 5
      </div>

      <button
        onClick={submit}
        className="mt-5 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Ø¥Ø±Ø³Ø§Ù„
      </button>

    </div>
  );
}
