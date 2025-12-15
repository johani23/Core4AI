// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ MerchantNarrative.jsx (Phase 11 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ AI Narrative Generator)
// ============================================================================


export default function MerchantNarrative({ product, productIQ, merchantIntel, readiness }) {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch("/api/merchant/narrative", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: product.name,
        competitor_name: productIQ.competitor.name,
        competitor_price: productIQ.competitor.price,
        recommended_price: productIQ.recommended_price,
        feature_value: productIQ.feature_value,
        intel_score: merchantIntel.feature_advantage_score,
        readiness: readiness
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
        <p className="text-gray-400 text-center">...ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â±ÃƒËœÃ‚Â¯</p>
      </div>
    );

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â AI Narrative Summary
      </h2>

      <div className="space-y-3 text-gray-800">
        {data.narrative.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
}


