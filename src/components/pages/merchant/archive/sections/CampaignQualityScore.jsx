// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ CampaignQualityScore.jsx (Phase 12 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Campaign Quality Score)
// ============================================================================


export default function CampaignQualityScore({
  productIQ,
  merchantIntel,
  readiness
}) {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/quality", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feature_value: productIQ.feature_value,
        intel_score: merchantIntel.feature_advantage_score,
        readiness: readiness,
        competitor_price: productIQ.competitor.price,
        recommended_price: productIQ.recommended_price,
      })
    });

    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    if (productIQ && merchantIntel && readiness !== null) load();
  }, [productIQ, merchantIntel, readiness]);

  if (!data)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-gray-400 text-center">...Collecting Data</p>
      </div>
    );

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€  Campaign Quality Score
      </h2>

      <div className="space-y-3 text-gray-800">

        <p><strong>Price Fit:</strong> {data.price_fit}%</p>
        <p><strong>Feature Strength:</strong> {data.value_strength}%</p>
        <p><strong>Market Intel Strength:</strong> {data.market_strength}%</p>
        <p><strong>Readiness Strength:</strong> {data.readiness_strength}%</p>

        <div className="mt-4 p-4 bg-green-50 border rounded-lg text-center">
          <p className="text-3xl font-bold text-green-700">
            {data.quality_score}%
          </p>
          <p className="text-gray-600">Campaign Quality Score</p>
        </div>

      </div>
    </div>
  );
}


