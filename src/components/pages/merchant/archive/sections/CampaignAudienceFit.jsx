// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ CampaignAudienceFit.jsx (Phase 21 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Audience Fit Analyzer)
// ============================================================================


export default function CampaignAudienceFit({
  product,
  productIQ,
  merchantIntel,
  readiness
}) {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch("/api/campaign/audience-fit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feature_value: productIQ.feature_value,
        intel_score: merchantIntel.feature_advantage_score,
        readiness: readiness,
        product_price: product.price
      })
    });

    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    if (product && productIQ && merchantIntel && readiness !== null) load();
  }, [product, productIQ, merchantIntel, readiness]);

  if (!data)
    return (
      <div className="p-6 bg-white border rounded-xl shadow mt-6">
        <p className="text-center text-gray-400">...Calculating Audience Fit</p>
      </div>
    );

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¥ Audience Fit Score
      </h2>

      <p className="text-3xl font-extrabold text-green-700 mb-2">
        {data.audience_fit}%
      </p>

      <p className="text-lg font-bold text-gray-700 mb-4">
        {data.fit_label}
      </p>

      <div className="p-4 bg-green-50 border rounded text-center">
        <p className="text-gray-600 text-sm">
          Match between audience expectations and product positioning
        </p>
      </div>
    </div>
  );
}


