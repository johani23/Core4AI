// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ CampaignROIPredictor.jsx (Phase 17 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ROI Prediction)
// ============================================================================


export default function CampaignROIPredictor({
  product,
  funnelData,
  budget
}) {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/roi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversions: funnelData?.conversions,
        product_price: product.price,
        budget: budget
      })
    });

    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    if (product && funnelData && budget !== null) load();
  }, [product, funnelData, budget]);

  if (!data)
    return (
      <div className="p-6 border bg-white rounded-xl shadow mt-6">
        <p className="text-gray-400 text-center">...Calculating ROI</p>
      </div>
    );

  return (
    <div className="p-6 border bg-white rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Âµ ROI Prediction
      </h2>

      <div className="space-y-3 text-gray-800">

        <p><strong>Revenue:</strong> {data.revenue} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>
        <p><strong>Profit:</strong> {data.profit} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>

        <div className="mt-4 p-4 bg-green-50 border rounded text-center">
          <p className="text-3xl font-extrabold text-green-700">
            {data.roi}%
          </p>
          <p className="text-gray-600">Return on Investment</p>
        </div>

      </div>
    </div>
  );
}


