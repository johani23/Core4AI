// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ CampaignFunnelProjection.jsx (Phase 16 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Funnel Projection)
// ============================================================================


export default function CampaignFunnelProjection({
  budget,
  qualityScore,
  readiness,
  successProbability
}) {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/funnel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        budget: budget,
        quality_score: qualityScore,
        readiness: readiness,
        probability: successProbability
      })
    });

    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    if (
      budget !== null &&
      qualityScore !== null &&
      readiness !== null &&
      successProbability !== null
    ) {
      load();
    }
  }, [budget, qualityScore, readiness, successProbability]);

  if (!data)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-center text-gray-400">...Calculating Funnel</p>
      </div>
    );

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€  Campaign Funnel Projection
      </h2>

      <div className="space-y-3 text-gray-800">
        <p><strong>Impressions:</strong> {data.impressions}</p>
        <p><strong>Clicks:</strong> {data.clicks}</p>
        <p><strong>Add to Cart:</strong> {data.add_to_cart}</p>
        <p><strong>Conversions:</strong> {data.conversions}</p>

        <div className="mt-4 p-4 bg-green-50 border rounded text-center">
          <p className="text-sm text-gray-600">AI Funnel Forecast</p>
        </div>
      </div>
    </div>
  );
}


