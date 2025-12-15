// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CreativeKit.jsx (Ultra Edition v2 UI)
// ----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Receives creative pack from CampaignBuilder
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Displays Storyboard, Variations, KPIs, Audio, Shot List
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Clean cinematic UI for creators & merchants
// ============================================================================

import { useLocation, useNavigate } from "react-router-dom";

export default function CreativeKit() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.creatives) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â¯ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â­ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â° ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â  Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬ËœÃƒËœÃ‚Â¯
        </h1>
        <button
          className="mt-6 bg-[#006C35] px-6 py-3 text-white rounded-xl"
          onClick={() => navigate("/merchant/campaign-builder")}
        >
          ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¹Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â¦ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©
        </button>
      </div>
    );
  }

  const c = state.creatives;

  return (
    <div className="min-h-screen p-10 bg-gray-50 text-gray-900">

      <h1 className="text-3xl font-extrabold text-[#006C35] mb-6">
        ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬ Creative Kit ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­ÃƒËœÃ‚Â²Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©
      </h1>

      {/* Storyboard */}
      <section className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">ÃƒÂ°Ã…Â¸Ã…Â½Ã…Â¾ÃƒÂ¯Ã‚Â¸Ã‚Â Storyboard</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {c.storyboard.map((sc, i) => (
            <div key={i} className="border rounded-xl p-4 bg-gray-50">
              <h3 className="font-bold text-lg">Scene {sc.scene}: {sc.title}</h3>
              <p>ÃƒÂ¢Ã‚ÂÃ‚Â± {sc.duration}</p>
              <p>ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­ Emotion: {sc.emotion_arc}</p>
              <p>ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¥ Camera: {sc.camera_movement}</p>
              <p className="mt-2 text-sm text-gray-700">{sc.script}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Variations */}
      <section className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¥ 50 Ad Variations</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {c.ad_variations.slice(0, 20).map((ad, i) => (
            <div key={i} className="p-4 border rounded-xl bg-gray-50">
              <h3 className="font-bold text-lg">Ad #{ad.id}</h3>
              <p>ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬ Hook: {ad.hook}</p>
              <p>ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯ Angle: {ad.angle}</p>
              <p>ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â± Platform: {ad.platform}</p>
              <p>ÃƒÂ¢Ã‚ÂÃ‚Â± Duration: {ad.duration}</p>
              <p className="text-sm text-gray-600 mt-2">CTA: {ad.cta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Voiceover */}
      <section className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¤ Voiceover Script</h2>
        {c.voiceover.lines.map((line, i) => (
          <p key={i} className="text-lg mb-2">ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {line}</p>
        ))}
      </section>

      {/* KPIs */}
      <section className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€  KPI Predictions</h2>
        <p>CTR: {c.kpi_predictions.ctr}</p>
        <p>3s Retention: {c.kpi_predictions.retention_3s}</p>
        <p>8s Retention: {c.kpi_predictions.retention_8s}</p>
        <p>Conversion: {c.kpi_predictions.conversion_estimate}</p>
      </section>

    </div>
  );
}


