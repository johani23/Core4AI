// ============================================================================
// ðŸ’š VariationCard.jsx (v3.0 CLEAN)
// ----------------------------------------------------------------------------
// â€¢ One of the 30 ad variations
// â€¢ Lightweight & optimized for scrolling
// ============================================================================

import React from "react";

export default function VariationCard({ ad }) {
  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition">
      
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-[#006C35]">
          ðŸŽ¥ {ad.platform}
        </span>
        <span className="text-xs text-gray-500">#{ad.id}</span>
      </div>

      <p className="font-semibold text-gray-900">{ad.angle}</p>

      <div className="mt-2 text-gray-700 text-sm">
        <p><strong>Hook:</strong> {ad.hook}</p>
        <p className="mt-1"><strong>Scene:</strong> {ad.scene}</p>
      </div>

      <div className="mt-3">
        <span className="text-[#006C35] font-semibold text-sm">
          CTA: {ad.cta}
        </span>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        {ad.hashtags.join("  â€¢  ")}
      </div>
    </div>
  );
}
