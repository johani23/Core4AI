// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ CampaignSuccessProbability.jsx (Phase 13 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Success Probability)
// ============================================================================


export default function CampaignSuccessProbability({
  productIQ,
  readiness,
  qualityScore
}) {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/success", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feature_value: productIQ.feature_value,
        competitor_price: productIQ.competitor.price,
        recommended_price: productIQ.recommended_price,
        quality_score: qualityScore,
        readiness: readiness
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
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-center text-gray-400">
          ...Calculating Success Probability
        </p>
      </div>
    );

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯ Campaign Success Probability
      </h2>

      <div className="space-y-3 text-gray-800">
        <p><strong>Price Factor:</strong> {data.price_factor}%</p>
        <p><strong>Feature Value Factor:</strong> {data.feature_factor}%</p>
        <p><strong>Quality Score Factor:</strong> {data.quality_factor}%</p>
        <p><strong>Readiness Factor:</strong> {data.readiness_factor}%</p>

        <div className="mt-4 p-4 bg-green-50 border rounded text-center">
          <p className="text-3xl font-extrabold text-green-700">
            {data.probability}%
          </p>
          <p className="text-gray-600 text-sm">Overall Success Probability</p>
        </div>
      </div>

    </div>
  );
}


