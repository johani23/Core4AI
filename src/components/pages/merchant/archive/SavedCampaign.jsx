// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â CampaignPublisher.jsx (v13 PRO)
// ----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Save Draft
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Publish to Creators (Auto-selected from AI plan)
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Review Summary (Product + Plan + Pricing + Creative Kit)
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Full backend integration
// ============================================================================

import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function CampaignPublisher() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â No campaign data</h2>
        <button
          onClick={() => navigate("/merchant")}
          className="px-6 py-3 bg-[#006C35] text-white rounded-lg"
        >
          ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¹Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â© ÃƒËœÃ‚Â¥Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â° Merchant Hub
        </button>
      </div>
    );
  }

  // ----------------------------------------------
  // Extract state passed from CampaignBuilder
  // ----------------------------------------------
  const {
    merchantId,
    productId,
    productName,
    objective,
    message,
    aiPlan,
    influencers,
    audiences,
    creativeKit,
    productIQ,
  } = state;

  const [selectedCreators, setSelectedCreators] = useState(
    influencers.map((i) => i.name)
  );

  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedCampaignId, setSavedCampaignId] = useState(null);

  // ----------------------------------------------
  // Save as Draft
  // ----------------------------------------------
  const saveDraft = async () => {
    setSaving(true);

    try {
      const res = await fetch("/api/merchant/campaign/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaign_id: savedCampaignId,
          merchant_id: merchantId,
          product_name: productName,
          objective,
          message,
          plan: aiPlan,
          influencers,
          audience: audiences,
          productIQ,
        }),
      });

      const data = await res.json();
      setSavedCampaignId(data.campaign.id);

      toast.success("ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â­Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¸ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â©!");

    } catch (err) {
      toast.error("ÃƒËœÃ‚Â®ÃƒËœÃ‚Â·ÃƒËœÃ‚Â£ ÃƒËœÃ‚Â£ÃƒËœÃ‚Â«Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â­Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¸ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©");
    }

    setSaving(false);
  };

  // ----------------------------------------------
  // Publish Campaign
  // ----------------------------------------------
  const publishCampaign = async () => {
    if (!savedCampaignId) {
      toast.error("Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â¨ ÃƒËœÃ‚Â­Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¸ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â±Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â§");
      return;
    }

    setPublishing(true);

    try {
      const res = await fetch("/api/merchant/campaign/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaign_id: savedCampaignId,
          creators: selectedCreators,
        }),
      });

      const data = await res.json();

      toast.success("ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬ ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© ÃƒËœÃ‚Â¥Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â° ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â !");

      navigate("/merchant/campaigns", {
        state: { published: true, data },
      });

    } catch (err) {
      toast.error("ÃƒËœÃ‚Â®ÃƒËœÃ‚Â·ÃƒËœÃ‚Â£ ÃƒËœÃ‚Â£ÃƒËœÃ‚Â«Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©");
    }

    setPublishing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 text-gray-900">

      <h1 className="text-3xl font-extrabold text-[#006C35] mb-6">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¤ Publish Marketing Campaign
      </h1>

      {/* ================================
          SECTION 1 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Review Summary
      ================================== */}
      <div className="bg-white p-6 rounded-xl mb-10 shadow-lg border">

        <h2 className="text-2xl font-bold mb-4">ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦ Product Summary</h2>

        <p><strong>Product:</strong> {productName}</p>
        <p><strong>Objective:</strong> {objective}</p>
        <p><strong>Message:</strong> {message}</p>

        <hr className="my-4" />

        <h3 className="text-xl font-bold text-[#006C35] mb-2">ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯ Marketing Plan</h3>
        <p><strong>Content Types:</strong> {aiPlan.content_types.join(", ")}</p>
        <p><strong>Best Times:</strong> {aiPlan.ideal_posting_times.join(", ")}</p>
        <p><strong>Target Tribes:</strong> {aiPlan.target_tribes.join(", ")}</p>

        {productIQ && (
          <>
            <hr className="my-4" />
            <h3 className="text-xl font-bold text-purple-700">ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Product Intelligence</h3>
            <p><strong>AI Price:</strong> {productIQ.ai_proposed_price} SAR</p>
            <p><strong>Commission:</strong> {productIQ.commission_rate}%</p>
            <p className="text-sm text-gray-600">{productIQ.pricing_explanation}</p>
          </>
        )}
      </div>

      {/* ================================
          SECTION 2 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Select Creators
      ================================== */}
      <div className="bg-white p-6 rounded-xl mb-10 shadow border">

        <h2 className="text-2xl font-bold text-[#006C35] mb-4">ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Ëœ Select Creators</h2>

        <div className="space-y-3">
          {influencers.map((inf, idx) => (
            <label key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border">
              <input
                type="checkbox"
                checked={selectedCreators.includes(inf.name)}
                onChange={() => {
                  setSelectedCreators((prev) =>
                    prev.includes(inf.name)
                      ? prev.filter((x) => x !== inf.name)
                      : [...prev, inf.name]
                  );
                }}
              />
              <div>
                <p className="font-bold">{inf.name}</p>
                <p className="text-sm text-gray-600">
                  Tribe: {inf.tribe} | Score: {inf.score}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* ================================
          SECTION 3 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Publishing Actions
      ================================== */}
      <div className="flex gap-6">

        <button
          onClick={saveDraft}
          disabled={saving}
          className="flex-1 py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-black"
        >
          {saving ? "SavingÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦" : "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¾ Save Draft"}
        </button>

        <button
          onClick={publishCampaign}
          disabled={publishing}
          className="flex-1 py-4 bg-[#006C35] text-white rounded-xl font-bold hover:bg-green-800"
        >
          {publishing ? "PublishingÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦" : "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬ Publish"}
        </button>
      </div>

    </div>
  );
}


