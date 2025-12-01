// ============================================================================
// ðŸ’š Core4.AI â€“ CreativePreview.jsx (v13 PRO)
// ----------------------------------------------------------------------------
// â€¢ Interactive viewer for storyboard, ads, and creative elements
// â€¢ Works with /api/creative/generate output
// â€¢ Used inside CampaignBuilder v13 and above
// ============================================================================

import React from "react";

export default function CreativePreview({ kit }) {
  if (!kit) {
    return (
      <div className="p-6 text-center bg-white border rounded-xl">
        <p className="text-gray-500">No creative kit loaded yet...</p>
      </div>
    );
  }

  const {
    storyboard,
    ad_variations,
    hashtags,
    audio_style,
    emotional_triggers,
    selling_angles,
    enhancement_tips,
  } = kit;

  return (
    <div className="bg-white border shadow-lg rounded-xl p-8 mb-10">
      <h2 className="text-3xl font-extrabold text-[#006C35] mb-6">
        ðŸŽ¨ Creative Preview
      </h2>

      {/* ====================== STORYBOARD ====================== */}
      <section className="mb-10">
        <h3 className="text-2xl font-bold text-purple-700 mb-4">
          ðŸŽ¬ Storyboard (6 Scenes)
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {storyboard.map((scene, idx) => (
            <div key={idx} className="p-5 border rounded-xl bg-gray-50">
              <p className="text-lg font-bold mb-1">
                Scene {scene.scene}: {scene.shot}
              </p>
              <p className="text-gray-700">{scene.description}</p>

              <p className="mt-3 text-sm font-semibold text-gray-800">
                ðŸŽ¤ Audio: <span className="font-normal">{scene.audio}</span>
              </p>

              <p className="mt-2 p-2 bg-white rounded-lg border text-sm italic">
                "{scene.script}"
              </p>

              <p className="text-xs text-gray-500 mt-1">
                ðŸ“· Camera: {scene.camera}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ====================== AD VARIATIONS ====================== */}
      <section className="mb-10">
        <h3 className="text-2xl font-bold text-green-700 mb-4">
          ðŸ“£ Ad Variations (30 Concepts)
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {ad_variations.slice(0, 12).map((ad) => (
            <div key={ad.id} className="p-4 border rounded-xl bg-gray-50">
              <p className="font-bold text-lg">{ad.platform}</p>
              <p className="text-sm text-purple-700 mb-1">{ad.angle}</p>

              <p className="text-sm">
                <strong>Hook:</strong> {ad.hook}
              </p>

              <p className="text-sm mt-1">
                <strong>Scene:</strong> {ad.scene}
              </p>

              <p className="text-sm mt-1">
                <strong>CTA:</strong> {ad.cta}
              </p>

              <p className="text-xs text-gray-500 mt-2">
                {ad.hashtags.join(" ")}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-3 text-sm text-gray-500">
          Showing 12 of {ad_variations.length} total concepts.
        </p>
      </section>

      {/* ====================== AUDIO & SFX ====================== */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-yellow-700 mb-3">ðŸŽ§ Audio Style</h3>

        <div className="p-4 border rounded-xl bg-gray-50">
          <p><strong>Tone:</strong> {audio_style.tone}</p>
          <p><strong>Music:</strong> {audio_style.audio}</p>
          <p><strong>SFX:</strong> {audio_style.sfx.join(", ")}</p>
        </div>
      </section>

      {/* ====================== HASHTAGS ====================== */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-blue-700 mb-3">#ï¸âƒ£ Hashtags</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 border rounded">
            <h4 className="font-bold text-sm mb-1">Reach</h4>
            <p className="text-xs">{hashtags.reach.join(" ")}</p>
          </div>
          <div className="bg-gray-50 p-3 border rounded">
            <h4 className="font-bold text-sm mb-1">Niche</h4>
            <p className="text-xs">{hashtags.niche.join(" ")}</p>
          </div>
          <div className="bg-gray-50 p-3 border rounded">
            <h4 className="font-bold text-sm mb-1">Conversion</h4>
            <p className="text-xs">{hashtags.conversion.join(" ")}</p>
          </div>
        </div>
      </section>

      {/* ====================== EMOTIONAL TRIGGERS ====================== */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-red-700 mb-3">
          â¤ï¸ Emotional Triggers
        </h3>

        <ul className="list-disc ml-5 text-sm text-gray-600">
          {Object.entries(emotional_triggers).map(([k, v], idx) => (
            <li key={idx}>
              <strong>{k}:</strong> {v}
            </li>
          ))}
        </ul>
      </section>

      {/* ====================== SELLING ANGLES ====================== */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-black mb-3">ðŸ”¥ Selling Angles</h3>
        <p className="text-sm text-gray-700">{selling_angles.join(", ")}</p>
      </section>

      {/* ====================== TIPS ====================== */}
      <section>
        <h3 className="text-xl font-bold text-green-700 mb-3">âœ¨ Enhancement Tips</h3>

        <ul className="list-disc ml-5 text-sm text-gray-600">
          {enhancement_tips.map((t, idx) => (
            <li key={idx}>{t}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
