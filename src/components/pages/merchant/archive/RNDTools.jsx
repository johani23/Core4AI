import React from "react";

export default function RNDTools() {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        ðŸ§ª R&D Tools â€” Ø£Ø¯ÙˆØ§Øª Ø§Ù„ØªØ·ÙˆÙŠØ±
      </h1>

      <p className="text-gray-600 mb-6">
        Ø£Ø¯ÙˆØ§Øª Ø®Ø§ØµØ© Ø¨ÙØ±ÙŠÙ‚ Ø§Ù„ØªØ·ÙˆÙŠØ± Ù„ØªØ¬Ø±Ø¨Ø© Ø§Ù„Ù…Ø²Ø§ÙŠØ§ØŒ Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§ØªØŒ ÙˆØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø£Ù†Ø¸Ù…Ø© Ù‚Ø¨Ù„
        Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="font-bold">âš™ï¸ API Tester</h2>
          <p className="text-gray-500">ØªØ¬Ø±Ø¨Ø© ÙˆØ§Ø³ØªØ¯Ø¹Ø§Ø¡ Ø§Ù„Ù€ APIs.</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="font-bold">ðŸŽ› Simulation Controls</h2>
          <p className="text-gray-500">Ø£Ø¯ÙˆØ§Øª Ù„ØªÙˆÙ„ÙŠØ¯ Ø¨ÙŠØ§Ù†Ø§Øª ØªØ¬Ø±ÙŠØ¨ÙŠØ©.</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="font-bold">ðŸ“š Model Playground</h2>
          <p className="text-gray-500">Ø§Ø®ØªØ¨Ø§Ø± Ø§Ù„Ù†Ù…Ø§Ø°Ø¬ Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠØ©.</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="font-bold">ðŸ§  AI Debugging</h2>
          <p className="text-gray-500">
            Ù…Ø±Ø§Ù‚Ø¨Ø© Ù‚Ø±Ø§Ø±Ø§Øª Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ÙˆÙˆØ²Ù† Ø§Ù„Ù…Ø¤Ø´Ø±Ø§Øª.
          </p>
        </div>
      </div>
    </div>
  );
}
