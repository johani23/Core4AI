// ============================================================================
// ðŸ’š Core4.AI â€“ CreativeHub.jsx (v4.1 â€œDeep Creative Suiteâ€)
// ----------------------------------------------------------------------------
// â€¢ Central Creative Hub for Campaign Builder
// â€¢ Displays creative package from backend (v2.5)
// â€¢ Includes: Storyboard, Ad Variations, Angles, Emotional Triggers,
//   Budget Split, Audio Style, Hashtags, Enhancement Tips
// â€¢ Fully compatible with CampaignBuilder v12.4
// â€¢ Inline comments for Beta developers (clean + clear)
// ============================================================================

import React from "react";
import StoryCard from "./StoryCard";
import VariationCard from "./VariationCard";
import AngleCard from "./AngleCard";
import LoadingSpinner from "./LoadingSpinner";
import EmptyCreativeState from "./EmptyCreativeState";

// ----------------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------------
export default function CreativeHub({ creative, loading }) {
  // creative = full object returned from backend
  // loading = boolean (spinner during API generation)

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner label="Ø¬Ø§Ø±Ù ØªÙˆÙ„ÙŠØ¯ Ø§Ù„Ø­Ø²Ù…Ø© Ø§Ù„Ø¥Ø¨Ø¯Ø§Ø¹ÙŠØ©â€¦" />
      </div>
    );
  }

  if (!creative) {
    return <EmptyCreativeState />;
  }

  return (
    <div className="space-y-10">

      {/* ======================
         ðŸŽ¬ STORYBOARD SECTION
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ðŸŽ¬ Storyboard â€“ Ø³Øª Ù…Ø´Ø§Ù‡Ø¯ Ø¬Ø§Ù‡Ø²Ø©
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {creative.storyboard.map((scene, idx) => (
            <StoryCard key={idx} scene={scene} />
          ))}
        </div>
      </section>

      {/* ======================
         ðŸŽ¥ AD VARIATIONS (30)
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ðŸŽ¥ 30 Ad Variations â€“ Ø¥Ø¹Ù„Ø§Ù†Ø§Øª Ø¬Ø§Ù‡Ø²Ø© Ù„Ù„Ù†Ø´Ø±
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {creative.ad_variations.map((ad, idx) => (
            <VariationCard key={idx} ad={ad} />
          ))}
        </div>
      </section>

      {/* ======================
         ðŸ”¥ SELLING ANGLES
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ðŸ”¥ Selling Angles â€“ Ø²ÙˆØ§ÙŠØ§ Ø§Ù„Ø¨ÙŠØ¹
        </h2>

        <div className="flex flex-wrap gap-3">
          {creative.selling_angles.map((angle, idx) => (
            <AngleCard key={idx} angle={angle} />
          ))}
        </div>
      </section>

      {/* ======================
         ðŸ‘¥ TRIBE SCORES
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ðŸ‘¥ Tribe Match Scores â€“ Ø£ÙØ¶Ù„ Ù‚Ø¨ÙŠÙ„Ø© Ù…Ø³ØªÙ‡Ø¯ÙØ©
        </h2>

        <div className="space-y-3">
          {creative.tribe_scores.map((t, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center"
            >
              <span className="font-semibold text-gray-800">{t.tribe}</span>
              <span className="text-[#006C35] font-bold">{t.score}Ùª</span>
            </div>
          ))}
        </div>
      </section>

      {/* ======================
         â¤ï¸ EMOTIONAL TRIGGERS
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          â¤ï¸ Emotional Triggers â€“ Ù…Ø­Ø±ÙƒØ§Øª Ø§Ù„Ù…Ø´Ø§Ø¹Ø±
        </h2>

        <ul className="list-disc pl-5 space-y-2">
          {Object.entries(creative.emotional_triggers).map(([k, v], idx) => (
            <li key={idx} className="text-gray-700">
              <strong className="capitalize">{k}:</strong> {v}
            </li>
          ))}
        </ul>
      </section>

      {/* ======================
         ðŸ“Š BUDGET SPLIT
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ðŸ’° Budget Split â€“ ØªÙ‚Ø³ÙŠÙ… Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ©
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {creative.budget_split.map((b, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-xl bg-white shadow-sm"
            >
              <h3 className="font-bold">{b.tier}</h3>
              <p className="text-green-700 mt-1 font-semibold">
                {b.percentage}%
              </p>
              <p className="text-sm text-gray-600">{b.reason}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================
         ðŸŽ§ AUDIO STYLE
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ðŸŽ§ Audio Style â€“ Ø£Ø³Ù„ÙˆØ¨ Ø§Ù„ØµÙˆØª
        </h2>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p>
            <strong>Ø§Ù„Ù†Ø¨Ø±Ø©:</strong> {creative.audio_style.tone}
          </p>
          <p>
            <strong>Ø§Ù„Ù…ÙˆØ³ÙŠÙ‚Ù‰:</strong> {creative.audio_style.audio}
          </p>
          <p>
            <strong>SFX:</strong> {creative.audio_style.sfx.join(", ")}
          </p>
        </div>
      </section>

      {/* ======================
         #ï¸âƒ£ HASHTAGS
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">#ï¸âƒ£ Hashtags</h2>

        <div className="space-y-2">
          {Object.entries(creative.hashtags).map(([k, v], idx) => (
            <div key={idx}>
              <p className="font-semibold text-gray-800">{k}:</p>
              <p className="text-sm text-[#006C35]">{v.join(" â€¢ ")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================
         âœ¨ ENHANCEMENT TIPS
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          âœ¨ Enhancement Tips â€“ ØªØ­Ø³ÙŠÙ†Ø§Øª
        </h2>

        <ul className="list-disc pl-5 space-y-1">
          {creative.enhancement_tips.map((tip, idx) => (
            <li key={idx} className="text-gray-700">
              {tip}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
