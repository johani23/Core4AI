// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ EVCCalculator.jsx ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â MIT Phase 2 (Module 1: Economic Value to Customer)
// ============================================================================
// Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¹ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â° /api/pricing/breakdown/{productId}
// Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â­ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¨ EVC = RP + DV
// Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â±ÃƒËœÃ‚Â¶ Fair Price, Premium Price, Value Surplus
// ============================================================================


export default function EVCCalculator({ productId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) loadData();
  }, [productId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pricing/breakdown/${productId}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed loading EVC:", err);
      setData({ error: "Failed to load EVC data" });
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div className="text-center text-gray-300 p-10">
        ÃƒÂ¢Ã‚ÂÃ‚Â³ Loading MIT EVC Model...
      </div>
    );

  if (!data || data.error)
    return (
      <div className="text-red-400 text-center p-6">
        Failed to load EVC data.
      </div>
    );

  // CALCULATIONS
  const referencePrice = data.reference_price || 0;
  const differentiationValue = data.total_value
    ? data.total_value - referencePrice
    : 0;
  const evcValue = referencePrice + differentiationValue;

  const fairPrice = Math.round(evcValue * 0.85);
  const premiumPrice = Math.round(evcValue * 1.25);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl">

      <h2 className="text-2xl font-bold mb-6 text-green-400">
        MIT EVC Calculator (Module 1)
      </h2>

      {/* Reference Price */}
      <div className="mb-6 p-4 bg-gray-800 rounded-xl">
        <h3 className="font-semibold">Reference Price (ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡)</h3>
        <p className="text-xl">{referencePrice} SAR</p>
      </div>

      {/* Differentiation Value */}
      <div className="mb-6 p-4 bg-gray-800 rounded-xl">
        <h3 className="font-semibold mb-2">Differentiation Value (Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²)</h3>
        <p className="text-xl text-green-300">
          {differentiationValue} SAR
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¬Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¹ Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â§ ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â§ÃƒËœÃ‚Â­ÃƒËœÃ‚ÂªÃƒËœÃ‚Â³ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¨Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â§ Ãƒâ„¢Ã‚ÂÃƒâ„¢Ã…Â  Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â°ÃƒËœÃ‚Â¬ Conjoint.
        </p>
      </div>

      {/* Feature Utilities */}
      <div className="mb-6 bg-gray-800 p-4 rounded-xl">
        <h3 className="font-semibold mb-3">Feature Utilities (Conjoint)</h3>
        {data.utilities?.length ? (
          <table className="w-full text-sm bg-gray-700 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-600 text-gray-200">
                <th className="p-2">Feature</th>
                <th className="p-2">Utility</th>
                <th className="p-2">Value (SAR)</th>
              </tr>
            </thead>
            <tbody>
              {data.utilities.map((u, i) => (
                <tr key={i} className="border-b border-gray-600">
                  <td className="p-2">{u.feature}</td>
                  <td className="p-2">{u.utility}</td>
                  <td className="p-2 text-green-300">{u.value_sar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No utilities found.</p>
        )}
      </div>

      {/* EVC Calculation */}
      <div className="mb-6 p-4 bg-gray-800 rounded-xl">
        <h3 className="font-semibold">Total EVC (ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚ÂªÃƒËœÃ‚ÂµÃƒËœÃ‚Â§ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾)</h3>
        <p className="text-2xl text-blue-300 mt-2">
          {evcValue} SAR
        </p>
      </div>

      {/* Fair & Premium */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="p-4 bg-gray-800 rounded-xl">
          <h3 className="font-semibold">Fair Price (ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â·Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã…Â )</h3>
          <p className="text-xl text-yellow-300 mt-2">{fairPrice} SAR</p>
        </div>

        <div className="p-4 bg-gray-800 rounded-xl">
          <h3 className="font-semibold">Premium Price (ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²)</h3>
          <p className="text-xl text-purple-300 mt-2">{premiumPrice} SAR</p>
        </div>

      </div>

      {/* Recommendation */}
      <div className="p-4 bg-gray-800 rounded-xl mt-6">
        <h3 className="font-semibold mb-2">MIT Recommendation</h3>

        <p className="text-lg text-green-400">
          {evcValue} SAR is the economic upper bound of this product.
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Fair price lies near {fairPrice} SAR, while premium perception
          allows pricing up to {premiumPrice} SAR depending on demand + elasticity.
        </p>
      </div>

    </div>
  );
}


