// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ CampaignBudgetOptimizer.jsx (Phase 15 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Budget Optimizer)
// ============================================================================


export default function CampaignBudgetOptimizer({
  productIQ,
  readiness,
  qualityScore
}) {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/budget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        competitor_price: productIQ.competitor.price,
        recommended_price: productIQ.recommended_price,
        quality_score: qualityScore,
        readiness: readiness,
        feature_value: productIQ.feature_value
      })
    });

    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    if (productIQ && readiness !== null && qualityScore !== null) load();
  }, [productIQ, readiness, qualityScore]);

  if (!data)
    return (
      <div className="p-6 border bg-white rounded-xl shadow mt-6">
        <p className="text-center text-gray-400">...Calculating Budget</p>
      </div>
    );

  return (
    <div className="p-6 border bg-white rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° Campaign Budget Optimizer
      </h2>

      <div className="space-y-3 text-gray-800">

        <p><strong>Base Budget:</strong> {data.base} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>
        <p><strong>Quality Factor:</strong> {data.quality_factor} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>
        <p><strong>Readiness Factor:</strong> {data.readiness_factor} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>
        <p><strong>Price Factor:</strong> {data.price_factor} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>

        <div className="mt-4 p-4 bg-gray-50 border rounded-lg">
          <p className="font-bold text-gray-700">ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Âº Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©:</p>
          <p>ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ ÃƒËœÃ‚Â®ÃƒËœÃ‚Â·ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â®Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¶ÃƒËœÃ‚Â©: {data.tiers.low} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>
          <p>ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ ÃƒËœÃ‚Â®ÃƒËœÃ‚Â·ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±ÃƒËœÃ‚Â­ÃƒËœÃ‚Â©: {data.tiers.recommended} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>
          <p>ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ ÃƒËœÃ‚Â®ÃƒËœÃ‚Â·ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â©: {data.tiers.aggressive} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>
        </div>

      </div>
    </div>
  );
}


