// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ CampaignCPAForecast.jsx (Phase 18 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CPA Forecast)
// ============================================================================


export default function CampaignCPAForecast({
  budget,
  funnelData
}) {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/cpa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        budget: budget,
        conversions: funnelData?.conversions || 0
      })
    });

    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    if (budget !== null && funnelData) load();
  }, [budget, funnelData]);

  if (!data)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-center text-gray-400">...Calculating CPA</p>
      </div>
    );

  if (data.status === "no_conversions")
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-center text-gray-600">
          ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â No conversions predicted ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â CPA cannot be calculated.
        </p>
      </div>
    );

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯ CPA Forecast (Cost Per Acquisition)
      </h2>

      <div className="space-y-4 text-gray-800">
        <p><strong>CPA:</strong> {data.cpa} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>

        <div className="mt-4 p-4 bg-green-50 border rounded text-center">
          <p className="text-gray-600 text-sm">
            Estimated cost to acquire one customer
          </p>
        </div>
      </div>

    </div>
  );
}


