// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CampaignPublisher.jsx (v5.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œSmart Save + Publish EditionÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// -----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Receives full campaign object from CampaignBuilder
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Zero input ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â user just reviews + clicks Publish
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Clean summary view + Save Draft + Publish
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Fully integrated with Smart Context Architecture
// ============================================================================

import toast from "react-hot-toast";

export default function CampaignPublisher({ campaign }) {
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingPublish, setLoadingPublish] = useState(false);

  if (!campaign) {
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-10 text-center text-gray-500">
        Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â²ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â± ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â ÃƒËœÃ‚Â£Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â¨Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© ÃƒËœÃ‚Â£Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¹ÃƒËœÃ‚Â§.
      </div>
    );
  }

  const {
    product,
    creative,
    marketingPlan,
    productIQ,
    merchantIntel,
  } = campaign;

  // ---------------------------------------------------------------------------
  // SAVE DRAFT
  // ---------------------------------------------------------------------------
  const saveDraft = async () => {
    setLoadingSave(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/merchant/campaign/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchant_id: "merchant_001",
          product_name: product?.name,
          objective: marketingPlan?.objective || "",
          message: marketingPlan?.message || "",
          plan: marketingPlan || {},
          influencers: creative?.ads || [],
          audience: merchantIntel?.audience_segments || [],
          productIQ: productIQ || {},
        }),
      });

      const data = await res.json();

      toast.success("ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¾ ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â­Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¸ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â©");
    } catch (err) {
      console.error(err);
      toast.error("ÃƒÂ¢Ã‚ÂÃ…â€™ Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â´Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â­Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¸ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â©");
    }

    setLoadingSave(false);
  };

  // ---------------------------------------------------------------------------
  // PUBLISH
  // ---------------------------------------------------------------------------
  const publishCampaign = async () => {
    setLoadingPublish(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/merchant/campaign/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchant_id: "merchant_001",
          campaign_id: `cmp_${Date.now()}`,
          product: product,
          creative,
          marketingPlan,
          productIQ,
          merchantIntel,
        }),
      });

      const data = await res.json();

      toast.success("ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬ ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© ÃƒËœÃ‚Â¨Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â­!");
    } catch (err) {
      console.error(err);
      toast.error("ÃƒÂ¢Ã‚ÂÃ…â€™ Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â´Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©");
    }

    setLoadingPublish(false);
  };

  // ---------------------------------------------------------------------------
  // RENDER SUMMARY
  // ---------------------------------------------------------------------------
  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white p-6 rounded-xl border shadow">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¤ Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â©
      </h2>

      {/* SUMMARY CARD */}
      <div className="space-y-6">

        {/* PRODUCT INFO */}
        <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
          <h3 className="font-bold text-gray-800 mb-2">ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬</h3>
          <p className="text-gray-700">
            <span className="font-semibold">{product?.name}</span> ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â {product?.price} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³
          </p>
        </div>

        {/* CREATIVE INFO */}
        <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
          <h3 className="font-bold text-gray-800 mb-2">ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â­ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â° ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â </h3>
          <p className="text-sm text-gray-700">
            {creative?.ads?.length || 0} ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â²ÃƒËœÃ‚Â© + Storyboard ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¦Ãƒâ„¢Ã…Â 
          </p>
        </div>

        {/* PRODUCT IQ */}
        <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
          <h3 className="font-bold text-gray-800 mb-2">ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ ProductIQ</h3>
          <p className="text-sm text-gray-700">
            ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚ÂµÃƒâ„¢Ã¢â‚¬Â° ÃƒËœÃ‚Â¨Ãƒâ„¢Ã¢â‚¬Â¡:{" "}
            <span className="font-semibold">{productIQ?.recommended_price} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</span>
          </p>
        </div>

        {/* MARKET INTEL */}
        <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
          <h3 className="font-bold text-gray-800 mb-2">ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â Market Intel</h3>
          <p className="text-sm text-gray-700">
            Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â· ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¶ÃƒËœÃ‚Â¹Ãƒâ„¢Ã‚Â: {merchantIntel?.competitor_weak_spots?.length || 0}
          </p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={saveDraft}
          disabled={loadingSave}
          className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 disabled:opacity-60"
        >
          {loadingSave ? "ÃƒÂ¢Ã‚ÂÃ‚Â³" : "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¾ ÃƒËœÃ‚Â­Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¸ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â©"}
        </button>

        <button
          onClick={publishCampaign}
          disabled={loadingPublish}
          className="px-5 py-2 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 disabled:opacity-60"
        >
          {loadingPublish ? "ÃƒÂ¢Ã‚ÂÃ‚Â³" : "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬ Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©"}
        </button>
      </div>
    </div>
  );
}


