// ============================================================================
// ðŸ’š EmptyCreativeState.jsx (v1.0)
// ----------------------------------------------------------------------------
// â€¢ Shown when no creative package is loaded yet
// ============================================================================

import React from "react";

export default function EmptyCreativeState() {
  return (
    <div className="p-10 bg-gray-50 border border-dashed rounded-xl text-center">
      <p className="text-gray-700 font-medium">
        Ù„Ù… ÙŠØªÙ… ØªÙˆÙ„ÙŠØ¯ Ø­Ø²Ù…Ø© Ø¥Ø¨Ø¯Ø§Ø¹ÙŠØ© Ø¨Ø¹Ø¯.
      </p>
      <p className="text-sm text-gray-500 mt-1">
        Ø§Ø¶ØºØ· Ø¹Ù„Ù‰ Ø²Ø± â€œGenerate Creativesâ€ Ø¯Ø§Ø®Ù„ Ø§Ù„Ù€ Campaign Builder.
      </p>
    </div>
  );
}
