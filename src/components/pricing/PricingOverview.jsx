// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ PricingOverview.jsx ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ v22 FIXED (ML-powered Overview Panel)
// ============================================================================


export default function PricingOverview({ productId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) loadPricing();
  }, [productId]);

  const loadPricing = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pricing/overview/${productId}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("PricingOverview load error:", err);
      setData(null);
    }
    setLoading(false);
  };

  if (!productId) return <div className="text-gray-400">Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â¯ Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â­ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â¯.</div>;
  if (loading) return <div className="text-gray-400">ÃƒÂ¢Ã‚ÂÃ‚Â³ Loading ML overviewÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦</div>;
  if (!data) return <div className="text-gray-400">Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ Ãƒâ„¢Ã…Â ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â«Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â± ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â° ÃƒËœÃ‚ÂªÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â±.</div>;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <p className="text-sm text-gray-400">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±ÃƒËœÃ‚Â­</p>
        <p className="text-2xl font-bold text-yellow-300">
          {data.suggested_price} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³
        </p>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <p className="text-sm text-gray-400">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â·ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â«ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â </p>
        <p className="text-lg text-green-300">{data.optimal_range}</p>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <p className="text-sm text-gray-400">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â«Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â©</p>
        <p className="text-xl text-purple-300">{data.confidence_score}%</p>
      </div>
    </div>
  );
}


