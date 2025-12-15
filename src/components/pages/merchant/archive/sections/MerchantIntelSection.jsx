// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ MerchantIntelSection.jsx (v8.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œStable + onLoadedÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ============================================================================


export default function MerchantIntelSection({ product, onLoaded }) {
  const [intel, setIntel] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) loadIntel();
  }, [product]);

  const loadIntel = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/merchant_intel/${encodeURIComponent(product.name)}`
      );
      const data = await res.json();
      setIntel(data);
      onLoaded && onLoaded(data);

    } catch (err) {
      console.error(err);
      setIntel({ error: "ÃƒÂ¢Ã‚ÂÃ…â€™ Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â´Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡" });
    }

    setLoading(false);
  };

  return (
    <div className="bg-white border rounded-xl p-6 mt-6 shadow-sm">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€  ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Market Intel
      </h2>

      {loading && <p className="text-gray-500">ÃƒÂ¢Ã‚ÂÃ‚Â³ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦</p>}

      {intel && !intel.error && (
        <div className="bg-gray-50 border p-4 rounded">

          <p><strong>Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â©:</strong> {intel.feature_advantage_score}%</p>

          <h4 className="font-semibold mt-3">ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â£ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¡</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.entries(intel.markets || {}).map(([name, data], i) => (
              <div key={i} className="p-3 border bg-white rounded">
                <strong>{name}</strong>
                <p>ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â±: {data.price} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>
                <p>{data.missing_feature ? "ÃƒÂ¢Ã‚ÂÃ…â€™ Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Âµ" : "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾"}</p>
              </div>
            ))}
          </div>

          <h4 className="font-semibold mt-4">ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° ÃƒËœÃ‚Â£ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡</h4>
          <p>ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¯Ãƒâ„¢Ã¢â‚¬Å¾: {intel.pricing.fair} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>
          <p>ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡: {intel.pricing.market} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>
          <p>ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒËœÃ‚Â§ÃƒËœÃ‚Â²: {intel.pricing.premium} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>

          <h4 className="font-semibold mt-4">ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â· ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¶ÃƒËœÃ‚Â¹Ãƒâ„¢Ã‚Â</h4>
          <ul className="list-disc pl-6">
            {intel.weak_spots?.map((w, i) => <li key={i}>{w}</li>)}
          </ul>

        </div>
      )}

      {intel?.error && <p className="text-red-600">{intel.error}</p>}
    </div>
  );
}


