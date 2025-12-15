// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ VariationCard.jsx (v3.0 CLEAN)
// ----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ One of the 30 ad variations
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Lightweight & optimized for scrolling
// ============================================================================


export default function VariationCard({ ad }) {
  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition">
      
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-[#006C35]">
          ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¥ {ad.platform}
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
        {ad.hashtags.join("  ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢  ")}
      </div>
    </div>
  );
}


