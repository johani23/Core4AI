// ============================================================================
// Ã°Å¸â€™Å¡ Core4 Ã˜Â­Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’ Ã¢â‚¬â€œ HayatikSuggestions.jsx (v1 Minimal Luxury UI)
// ============================================================================


export default function HayatikSuggestions({ data }) {
  if (!data) {
    return (
      <div className="text-gray-400 text-center py-6">
        ...Ã™Å Ã˜ÂªÃ™â€¦ Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â­Ã™â€¦Ã™Å Ã™â€ž
      </div>
    );
  }

  return (
    <div className="mt-10">
      {/* Title */}
      <h2 className="text-xl font-medium mb-4 text-[#2A2F32]">
        Ã˜Â§Ã™â€šÃ˜ÂªÃ˜Â±Ã˜Â§Ã˜Â­Ã˜Â§Ã˜Âª Ã˜Â°Ã™Æ’Ã™Å Ã˜Â© Ã™â€žÃ™Æ’
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Products */}
        <div className="p-5 bg-[#F7F8F9] rounded-xl shadow-sm">
          <h3 className="font-semibold text-[#4CAF9B] mb-2">
            Ã™â€¦Ã™â€ Ã˜ÂªÃ˜Â¬Ã˜Â§Ã˜Âª Ã™â€¦Ã™â€ Ã˜Â§Ã˜Â³Ã˜Â¨Ã˜Â©
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            Ã˜Â§Ã˜Â®Ã˜ÂªÃ˜Â±Ã™â€ Ã˜Â§ Ã™â€žÃ™Æ’ Ã™â€¦Ã™â€ Ã˜ÂªÃ˜Â¬Ã˜Â§Ã˜Âª Ã˜ÂªÃ™â€ Ã˜Â§Ã˜Â³Ã˜Â¨ Ã˜Â­Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’ Ã˜Â§Ã™â€žÃ™Å Ã™Ë†Ã™â€¦Ã™Å Ã˜Â©.
          </p>

          <ul className="space-y-1 text-gray-700 text-sm">
            {data.products?.map((p, i) => (
              <li key={i} className="border-b pb-1">
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Creators */}
        <div className="p-5 bg-[#F7F8F9] rounded-xl shadow-sm">
          <h3 className="font-semibold text-[#4CAF9B] mb-2">
            Ã™â€¦Ã˜Â¤Ã˜Â«Ã˜Â±Ã™Å Ã™â€  Ã™Å Ã˜Â´Ã˜Â¨Ã™â€¡Ã™Ë†Ã™â€ Ã™Æ’
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            Ã™â€ Ã˜Â§Ã˜Â³ Ã™â€šÃ˜Â±Ã™Å Ã˜Â¨Ã™Å Ã™â€  Ã™â€¦Ã™â€  Ã˜Â³Ã˜ÂªÃ˜Â§Ã™Å Ã™â€žÃ™Æ’ Ã™Ë†Ã˜Â§Ã™â€¡Ã˜ÂªÃ™â€¦Ã˜Â§Ã™â€¦Ã˜Â§Ã˜ÂªÃ™Æ’.
          </p>

          <ul className="space-y-1 text-gray-700 text-sm">
            {data.creators?.map((c, i) => (
              <li key={i} className="border-b pb-1">
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Merchants */}
        <div className="p-5 bg-[#F7F8F9] rounded-xl shadow-sm">
          <h3 className="font-semibold text-[#4CAF9B] mb-2">
            Ã˜Â®Ã˜Â¯Ã™â€¦Ã˜Â§Ã˜Âª Ã™Ë†Ã˜ÂªÃ˜Â¬Ã™â€˜Ã˜Â§Ã˜Â± Ã˜Â­Ã™Ë†Ã™â€ž Ã˜Â£Ã˜Â³Ã™â€žÃ™Ë†Ã˜Â¨ Ã˜Â­Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            Ã˜Â¹Ã˜Â±Ã™Ë†Ã˜Â¶ Ã™Ë†Ã˜Â®Ã˜Â¯Ã™â€¦Ã˜Â§Ã˜Âª Ã˜ÂªÃ™â€ Ã˜Â§Ã˜Â³Ã˜Â¨ Ã™â€ Ã™â€¦Ã˜Â· Ã™Å Ã™Ë†Ã™â€¦Ã™Æ’.
          </p>

          <ul className="space-y-1 text-gray-700 text-sm">
            {data.merchants?.map((m, i) => (
              <li key={i} className="border-b pb-1">
                {m}
              </li>
            ))}
          </ul>
        </div>

        {/* Lifestyle */}
        <div className="p-5 bg-[#F7F8F9] rounded-xl shadow-sm">
          <h3 className="font-semibold text-[#4CAF9B] mb-2">
            Lifestyle Picks
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            Ã˜Â£Ã˜Â´Ã™Å Ã˜Â§Ã˜Â¡ Ã˜ÂªÃ˜Â³Ã˜Â§Ã˜Â¹Ã˜Â¯Ã™Æ’ Ã˜ÂªÃ˜Â±Ã˜ÂªÃ™â€˜Ã˜Â¨ Ã™Å Ã™Ë†Ã™â€¦Ã™Æ’ Ã™Ë†Ã˜ÂªÃ˜Â³Ã™â€¡Ã™â€˜Ã™â€ž Ã˜Â­Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’.
          </p>

          <ul className="space-y-1 text-gray-700 text-sm">
            {data.lifestyle?.map((l, i) => (
              <li key={i} className="border-b pb-1">
                {l}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}


