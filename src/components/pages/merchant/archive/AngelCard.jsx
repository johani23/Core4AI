// ============================================================================
// ðŸ’š AngleCard.jsx (v2.0 CLEAN)
// ----------------------------------------------------------------------------
// â€¢ Visual badge for selling angles
// â€¢ Used in CreativeHub.jsx
// ============================================================================

import React from "react";

export default function AngleCard({ angle }) {
  return (
    <div className="px-4 py-2 bg-[#F0FDF4] border border-[#006C35]/20 text-[#006C35] 
                    rounded-full text-sm font-medium shadow-sm hover:bg-[#E8F9EC]">
      {angle}
    </div>
  );
}
