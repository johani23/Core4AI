import React from "react";

export default function DebugPanel() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-red-700 mb-4">
        ðŸž Debug Panel â€” Ù„ÙˆØ­Ø© ØªØµØ­ÙŠØ­ Ø§Ù„Ø£Ø®Ø·Ø§Ø¡
      </h1>

      <p className="text-gray-600 mb-6">
        Ø£Ø¯Ø§Ø© Ø¯Ø§Ø®Ù„ÙŠØ© Ù„ØªØ´Ø®ÙŠØµ Ø§Ù„Ù…Ø´Ø§ÙƒÙ„ØŒ Ù…Ø±Ø§Ù‚Ø¨Ø© logsØŒ ÙˆØªØªØ¨Ø¹ Ø§Ù„Ø£Ø­Ø¯Ø§Ø« Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…Ù†ØµØ©.
      </p>

      <div className="space-y-6">
        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="font-bold">ðŸ“œ System Logs</h2>
          <p className="text-gray-500">Ø¹Ø±Ø¶ Ø¢Ø®Ø± Ø§Ù„Ø£Ø­Ø¯Ø§Ø« ÙÙŠ Ø§Ù„Ù…Ù†ØµØ©.</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="font-bold">ðŸ“¡ Live WebSocket Monitor</h2>
          <p className="text-gray-500">Ù…Ø±Ø§Ù‚Ø¨Ø© Ø±Ø³Ø§Ø¦Ù„ Ø§Ù„Ù€ Synaptic Stream.</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="font-bold">ðŸ§© Component Checker</h2>
          <p className="text-gray-500">ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ø£ÙƒÙˆØ§Ø¯ Ø§Ù„Ù…ÙÙ‚ÙˆØ¯Ø© Ø£Ùˆ Ø§Ù„ØªØ§Ù„ÙØ©.</p>
        </div>
      </div>
    </div>
  );
}
