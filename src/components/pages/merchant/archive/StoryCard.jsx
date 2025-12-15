// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ StoryCard.jsx (v3.0 CLEAN)
// ----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Displays a single storyboard scene
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Used inside CreativeHub.jsx
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Designed to match Beta UI standards
// ============================================================================


export default function StoryCard({ scene }) {
  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-[#006C35]">
          ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬ Scene {scene.scene}
        </span>
        <span className="text-xs text-gray-500">{scene.shot}</span>
      </div>

      <p className="text-gray-800 font-medium">{scene.description}</p>

      <div className="mt-3">
        <p className="text-sm text-gray-600 leading-relaxed">{scene.script}</p>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        <p>ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â§ Audio: {scene.audio}</p>
        <p>ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â· Camera: {scene.camera}</p>
      </div>
    </div>
  );
}


