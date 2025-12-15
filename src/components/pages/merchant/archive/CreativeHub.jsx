// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CreativeHub.jsx (v4.1 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œDeep Creative SuiteÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Central Creative Hub for Campaign Builder
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Displays creative package from backend (v2.5)
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Includes: Storyboard, Ad Variations, Angles, Emotional Triggers,
//   Budget Split, Audio Style, Hashtags, Enhancement Tips
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Fully compatible with CampaignBuilder v12.4
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Inline comments for Beta developers (clean + clear)
// ============================================================================

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
        <LoadingSpinner label="ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã‚Â ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­ÃƒËœÃ‚Â²Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â©ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦" />
      </div>
    );
  }

  if (!creative) {
    return <EmptyCreativeState />;
  }

  return (
    <div className="space-y-10">

      {/* ======================
         ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬ STORYBOARD SECTION
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬ Storyboard ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ÃƒËœÃ‚Â³ÃƒËœÃ‚Âª Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â´ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â²ÃƒËœÃ‚Â©
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {creative.storyboard.map((scene, idx) => (
            <StoryCard key={idx} scene={scene} />
          ))}
        </div>
      </section>

      {/* ======================
         ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¥ AD VARIATIONS (30)
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¥ 30 Ad Variations ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â²ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â±
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {creative.ad_variations.map((ad, idx) => (
            <VariationCard key={idx} ad={ad} />
          ))}
        </div>
      </section>

      {/* ======================
         ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ SELLING ANGLES
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Selling Angles ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ÃƒËœÃ‚Â²Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â§Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¹
        </h2>

        <div className="flex flex-wrap gap-3">
          {creative.selling_angles.map((angle, idx) => (
            <AngleCard key={idx} angle={angle} />
          ))}
        </div>
      </section>

      {/* ======================
         ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¥ TRIBE SCORES
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¥ Tribe Match Scores ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ÃƒËœÃ‚Â£Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¶Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â³ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â¯Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â©
        </h2>

        <div className="space-y-3">
          {creative.tribe_scores.map((t, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center"
            >
              <span className="font-semibold text-gray-800">{t.tribe}</span>
              <span className="text-[#006C35] font-bold">{t.score}Ãƒâ„¢Ã‚Âª</span>
            </div>
          ))}
        </div>
      </section>

      {/* ======================
         ÃƒÂ¢Ã‚ÂÃ‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â EMOTIONAL TRIGGERS
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ÃƒÂ¢Ã‚ÂÃ‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â Emotional Triggers ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â­ÃƒËœÃ‚Â±Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â´ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â±
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
         ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â  BUDGET SPLIT
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° Budget Split ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â³Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â©
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
         ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â§ AUDIO STYLE
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â§ Audio Style ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ÃƒËœÃ‚Â£ÃƒËœÃ‚Â³Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¨ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂµÃƒâ„¢Ã‹â€ ÃƒËœÃ‚Âª
        </h2>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p>
            <strong>ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â±ÃƒËœÃ‚Â©:</strong> {creative.audio_style.tone}
          </p>
          <p>
            <strong>ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â³Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã¢â‚¬Â°:</strong> {creative.audio_style.audio}
          </p>
          <p>
            <strong>SFX:</strong> {creative.audio_style.sfx.join(", ")}
          </p>
        </div>
      </section>

      {/* ======================
         #ÃƒÂ¯Ã‚Â¸Ã‚ÂÃƒÂ¢Ã†â€™Ã‚Â£ HASHTAGS
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">#ÃƒÂ¯Ã‚Â¸Ã‚ÂÃƒÂ¢Ã†â€™Ã‚Â£ Hashtags</h2>

        <div className="space-y-2">
          {Object.entries(creative.hashtags).map(([k, v], idx) => (
            <div key={idx}>
              <p className="font-semibold text-gray-800">{k}:</p>
              <p className="text-sm text-[#006C35]">{v.join(" ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ ")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================
         ÃƒÂ¢Ã…â€œÃ‚Â¨ ENHANCEMENT TIPS
         ====================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ÃƒÂ¢Ã…â€œÃ‚Â¨ Enhancement Tips ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­ÃƒËœÃ‚Â³Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª
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


