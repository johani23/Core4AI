// ============================================================================
// 💚 Core4 حياتك – HayatikSuggestions.jsx (v1 Minimal Luxury UI)
// ============================================================================

import React from "react";

export default function HayatikSuggestions({ data }) {
  if (!data) {
    return (
      <div className="text-gray-400 text-center py-6">
        ...يتم التحميل
      </div>
    );
  }

  return (
    <div className="mt-10">
      {/* Title */}
      <h2 className="text-xl font-medium mb-4 text-[#2A2F32]">
        اقتراحات ذكية لك
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Products */}
        <div className="p-5 bg-[#F7F8F9] rounded-xl shadow-sm">
          <h3 className="font-semibold text-[#4CAF9B] mb-2">
            منتجات مناسبة
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            اخترنا لك منتجات تناسب حياتك اليومية.
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
            مؤثرين يشبهونك
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            ناس قريبين من ستايلك واهتماماتك.
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
            خدمات وتجّار حول أسلوب حياتك
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            عروض وخدمات تناسب نمط يومك.
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
            أشياء تساعدك ترتّب يومك وتسهّل حياتك.
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
