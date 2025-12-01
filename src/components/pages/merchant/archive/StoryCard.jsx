// ============================================================================
// ðŸ’š StoryCard.jsx (v3.0 CLEAN)
// ----------------------------------------------------------------------------
// â€¢ Displays a single storyboard scene
// â€¢ Used inside CreativeHub.jsx
// â€¢ Designed to match Beta UI standards
// ============================================================================

import React from "react";

export default function StoryCard({ scene }) {
  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-[#006C35]">
          ðŸŽ¬ Scene {scene.scene}
        </span>
        <span className="text-xs text-gray-500">{scene.shot}</span>
      </div>

      <p className="text-gray-800 font-medium">{scene.description}</p>

      <div className="mt-3">
        <p className="text-sm text-gray-600 leading-relaxed">{scene.script}</p>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        <p>ðŸŽ§ Audio: {scene.audio}</p>
        <p>ðŸ“· Camera: {scene.camera}</p>
      </div>
    </div>
  );
}
