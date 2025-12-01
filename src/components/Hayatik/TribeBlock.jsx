// ============================================================================
// 💚 Core4 حياتك – TribeBlock.jsx (v2 — Tribe Colors + Badge + Personality)
// ============================================================================

import React from "react";

export default function TribeBlock({ tribes }) {
  if (!tribes) return null;

  return (
    <div className="mt-14">

      <h2 className="text-xl font-medium mb-6 text-[#2A2F32]">
        قبيلتك وهويتك
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* PRIMARY TRIBE */}
        <div className="p-6 bg-[#F7F8F9] rounded-2xl shadow-sm border border-[#e5e7eb]">
          
          {/* Badge */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full shadow"
              style={{ backgroundColor: tribes.primaryColor }}
            ></div>

            <h3 className="text-lg font-semibold text-[#4CAF9B]">
              {tribes.primary}
            </h3>
          </div>

          {/* Personality Sentence */}
          <p className="text-gray-700 mt-3 text-sm leading-relaxed">
            {tribes.primaryPersonality}
          </p>

          {/* Influencers */}
          <h4 className="mt-5 font-medium text-[#2A2F32] text-sm">
            مؤثرين يشبهونك:
          </h4>

          <ul className="list-disc list-inside text-gray-600 mt-1 text-sm">
            {tribes.primaryInfluencers.map((inf, i) => (
              <li key={i}>{inf}</li>
            ))}
          </ul>
        </div>

        {/* SECONDARY TRIBE */}
        <div className="p-6 bg-[#F7F8F9] rounded-2xl shadow-sm border border-[#e5e7eb]">

          {/* Badge */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full shadow"
              style={{ backgroundColor: tribes.secondaryColor }}
            ></div>

            <h3 className="text-lg font-semibold text-[#4CAF9B]">
              {tribes.secondary}
            </h3>
          </div>

          {/* Personality */}
          <p className="text-gray-700 mt-3 text-sm leading-relaxed">
            {tribes.secondaryPersonality}
          </p>

          {/* Influencers */}
          <h4 className="mt-5 font-medium text-[#2A2F32] text-sm">
            مؤثرين مناسبين لك:
          </h4>

          <ul className="list-disc list-inside text-gray-600 mt-1 text-sm">
            {tribes.secondaryInfluencers.map((inf, i) => (
              <li key={i}>{inf}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
