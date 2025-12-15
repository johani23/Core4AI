// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ MarketingSuite.jsx ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Saudi Edition (v4.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œBeta AlignedÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Receives ProductIQ
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Generates marketing plan
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Bundles full payload ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ CampaignBuilder
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Fully aligned with backend v205.3
// ============================================================

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function MarketingSuite() {
  const location = useLocation();
  const navigate = useNavigate();

  const iq = location.state || null;

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [objective, setObjective] = useState("");
  const [message, setMessage] = useState("");

  const [plan, setPlan] = useState(null);
  const [influencers, setInfluencers] = useState([]);
  const [audience, setAudience] = useState([]);

  useEffect(() => {
    if (iq?.fromProductIQ) {
      setProductId(iq.product_id);
      setProductName(iq.product_name);
      setMessage(`AI: ${iq.ai_recommendations?.[0] || ""}`);
    }
  }, [iq]);

  async function generatePlan() {
    const res1 = await axios.post("http://127.0.0.1:8000/api/merchant/marketing_plan", {
      product_name: productName,
      objective,
      message,
    });

    const res2 = await axios.get(
      `http://127.0.0.1:8000/api/merchant/suggest_influencers/${productName}`
    );

    const res3 = await axios.get(
      `http://127.0.0.1:8000/api/merchant/audience_clusters/${productName}`
    );

    setPlan(res1.data.ai_marketing_plan);
    setInfluencers(res2.data.recommended_influencers);
    setAudience(res3.data.audience_segments);
  }

  const launchCampaignBuilder = () => {
    navigate(`/merchant/campaign-builder`, {
      state: {
        productId,
        productName,
        objective,
        message,
        plan,
        influencers,
        audience,
        productIQ: iq,
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

      <h1 className="text-2xl font-extrabold text-[#006C35] mb-6">
        Saudi Marketing Suite ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â ÃƒËœÃ‚Â¨Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â°Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã…Â 
      </h1>

      {iq?.fromProductIQ && (
        <div className="bg-green-50 border border-green-300 p-4 rounded mb-6 text-green-700">
          <p>ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â€ <strong>Connected to ProductIQ</strong></p>
          <p>ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Category: {iq.category}</p>
          <p>ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Best Tribe: {iq.best_tribe}</p>
          <p>ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Expected Conversion: {iq.expected_conversion_rate}</p>
        </div>
      )}

      <div className="space-y-4">
        <input
          className="w-full border p-3 rounded"
          placeholder="ÃƒËœÃ‚Â§ÃƒËœÃ‚Â³Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <select
          className="w-full border p-3 rounded"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
        >
          <option value="">Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â¯Ãƒâ„¢Ã‚Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¡</option>
          <option value="new">ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â·Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¡ Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯</option>
          <option value="launch">ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â·Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¡</option>
          <option value="brand_reinforce">ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¹ÃƒËœÃ‚Â²Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â² ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â©</option>
        </select>

        <textarea
          className="w-full border p-3 rounded"
          placeholder="ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â±ÃƒËœÃ‚Â³ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â©"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button
        onClick={generatePlan}
        className="mt-6 w-full py-3 bg-[#006C35] text-white font-bold rounded-lg"
      >
        ÃƒÂ¢Ã…Â¡Ã‚Â¡ ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â®ÃƒËœÃ‚Â·ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â©
      </button>

      {plan && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          
          <h2 className="text-xl font-bold mb-4">ÃƒËœÃ‚Â®ÃƒËœÃ‚Â·ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â°Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â©</h2>

          <p><strong>Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¹ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â­ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â°:</strong> {plan.content_types.join(", ")}</p>
          <p><strong>ÃƒËœÃ‚Â£Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â±:</strong> {plan.ideal_posting_times.join(", ")}</p>
          <p><strong>ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¦Ãƒâ„¢Ã¢â‚¬Å¾:</strong> {plan.target_tribes.join(", ")}</p>
          <p><strong>Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â³ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â° ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â :</strong> {plan.creator_level}</p>
          <p><strong>ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â©:</strong> {plan.budget_estimate}</p>

          <button
            onClick={launchCampaignBuilder}
            className="mt-8 w-full py-3 bg-black text-white rounded-lg font-bold"
          >
            ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â¥Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â° ÃƒËœÃ‚Â¨Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©
          </button>
        </div>
      )}
    </div>
  );
}


