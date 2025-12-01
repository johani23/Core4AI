import React from "react";

export default function CouncilInsights() {
  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        ðŸ§­ Council Insights â€” ØªØ­Ù„ÙŠÙ„Ø§Øª Ø§Ù„Ù…Ø¬Ù„Ø³
      </h1>

      <p className="text-gray-600 mb-6">
        Ù„ÙˆØ­Ø© Ù…Ø±Ø§Ù‚Ø¨Ø© Ø°ÙƒÙŠØ© ØªÙ‚Ø¯Ù… Ø±Ø¤ÙŠØ© Ù…Ø¹Ù…Ù‘Ù‚Ø© Ø­ÙˆÙ„ ØªÙˆØ§Ø²Ù† Ø§Ù„Ù‚ÙˆÙ‰ØŒ Ø§Ù„Ø§Ù†Ø­ÙŠØ§Ø²Ø§ØªØŒ ÙˆØ§Ù„Ù…Ø®Ø§Ø·Ø±
        Ø¯Ø§Ø®Ù„ Ø´Ø¨ÙƒØ© Core4.AI.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-lg font-bold">ðŸŒ€ Bias Radar</h2>
          <p className="text-gray-500">ÙƒØ´Ù ÙˆØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø£Ù†Ù…Ø§Ø· Ø§Ù„Ù…Ù†Ø­Ø§Ø²Ø©.</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-lg font-bold">ðŸ”¥ Influence Drift</h2>
          <p className="text-gray-500">
            Ù…Ø±Ø§Ù‚Ø¨Ø© ØªØºÙŠÙ‘Ø± Ù…ÙˆØ§Ø²ÙŠÙ† Ø§Ù„ØªØ£Ø«ÙŠØ± Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…Ù†ØµØ©.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-lg font-bold">ðŸ“Š Network Pulse</h2>
          <p className="text-gray-500">
            Ø¥ÙŠÙ‚Ø§Ø¹ Ø§Ù„Ù…Ù†ØµØ©ØŒ Ù…Ø¹Ø¯Ù„ Ø§Ù„Ù†Ù…ÙˆØŒ ÙˆÙ…Ø¤Ø´Ø±Ø§Øª Ø§Ù„ØµØ­Ø© Ø§Ù„Ø¹Ø§Ù…Ø©.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-lg font-bold">ðŸ“¡ Cohesion Monitor</h2>
          <p className="text-gray-500">Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ø§Ù†Ø³Ø¬Ø§Ù… Ø§Ù„Ù…Ø¬ØªÙ…Ø¹ÙŠ.</p>
        </div>
      </div>
    </div>
  );
}
