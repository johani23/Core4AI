// ============================================================
// ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â® AdPricingCalculator.jsx ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â (v1.0 FINAL)
// ------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Smart Ad Pricing Calculator for Merchants
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Estimates clicks, conversions & revenue
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Uses /api/merchant/ad_pricing backend
// ============================================================

import axios from "axios";

export default function AdPricingCalculator({ onClose }) {
  const [budget, setBudget] = useState("");
  const [cpc, setCpc] = useState("");
  const [conversionRate, setConversionRate] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/merchant/ad_pricing", {
        budget: parseFloat(budget),
        cpc: parseFloat(cpc),
        conversion_rate: parseFloat(conversionRate),
      });

      setResult(res.data);
    } catch (err) {
      console.error("Ad Calculator Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">

        {/* Header */}
        <h2 className="text-2xl font-bold mb-4 text-[#006C35]">
          ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â® ÃƒËœÃ‚Â­ÃƒËœÃ‚Â§ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â°Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â©
        </h2>

        {/* Budget */}
        <label className="block font-semibold mt-3">ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â© (SAR)</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full border p-2 rounded mt-1"
          placeholder="Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â«Ãƒâ„¢Ã¢â‚¬Å¾: 1000"
        />

        {/* CPC */}
        <label className="block font-semibold mt-3">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¸ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ ÃƒËœÃ‚Â³ÃƒËœÃ‚Â· ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒâ„¢Ã†â€™Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â±ÃƒËœÃ‚Â© (CPC)
        </label>
        <input
          type="number"
          value={cpc}
          onChange={(e) => setCpc(e.target.value)}
          className="w-full border p-2 rounded mt-1"
          placeholder="Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â«Ãƒâ„¢Ã¢â‚¬Å¾: 1.25"
        />

        {/* Conversion */}
        <label className="block font-semibold mt-3">
          ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯ Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â© (%)
        </label>
        <input
          type="number"
          value={conversionRate}
          onChange={(e) => setConversionRate(e.target.value)}
          className="w-full border p-2 rounded mt-1"
          placeholder="Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â«Ãƒâ„¢Ã¢â‚¬Å¾: 3.2"
        />

        {/* Button */}
        <button
          onClick={calculate}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg shadow mt-5 hover:bg-green-700"
        >
          ÃƒËœÃ‚Â§ÃƒËœÃ‚Â­ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¨ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¢Ãƒâ„¢Ã¢â‚¬Â 
        </button>

        {/* Results */}
        {result && (
          <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
            <h3 className="font-bold text-lg text-gray-800 mb-3">
              ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â§ÃƒËœÃ‚Â¦ÃƒËœÃ‚Â¬ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â©
            </h3>

            <p>ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â€šÂ¬ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â±ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â©: {result.clicks_estimate}</p>
            <p>ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ¢â‚¬â„¢ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â©: {result.conversion_estimate}</p>
            <p>ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¥Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â±ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â©: {result.expected_revenue} SAR</p>
          </div>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          className="w-full bg-gray-200 text-gray-700 mt-6 py-2 rounded-lg hover:bg-gray-300"
        >
          ÃƒËœÃ‚Â¥ÃƒËœÃ‚ÂºÃƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¡
        </button>
      </div>
    </div>
  );
}


