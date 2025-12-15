// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ CompetitorMatchSection.jsx (v8.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œUses ProductIQ OutputÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ============================================================================


export default function CompetitorMatchSection({ product, onLoaded }) {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    if (product) runMatch();
  }, [product]);

  const runMatch = async () => {
    try {
      const res = await fetch("/api/product_iq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: product.name,
          features: product.features || [],
          competitor_name: product.competitor_name || "ÃƒËœÃ‚Â£Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â±ÃƒËœÃ‚Â¨ Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â³",
          competitor_price: product.competitor_price || 80
        })
      });

      const data = await res.json();

      const mapped = {
        competitor: data.competitor,
        price_gap: data.recommended_price - data.competitor.price,
        advantages: ["Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â© ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¶ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒâ„¢Ã…Â ÃƒËœÃ‚Â©", "ÃƒËœÃ‚Â¬Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â­ÃƒËœÃ‚Â³Ãƒâ„¢Ã¢â‚¬ËœÃƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â©"],
        weaknesses: data.feature_value < 15 ? ["Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â®Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¶ÃƒËœÃ‚Â©"] : []
      };

      setMatch(mapped);
      onLoaded && onLoaded(mapped);

    } catch (err) {
      console.error(err);
      setMatch({ error: "ÃƒÂ¢Ã‚ÂÃ…â€™ Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â´Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â³" });
    }
  };

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ¢Ã…Â¡Ã¢â‚¬ÂÃƒÂ¯Ã‚Â¸Ã‚Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â³ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Competitor Match
      </h2>

      {!match && <p className="text-gray-500">ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾...</p>}

      {match?.error && <p className="text-red-600">{match.error}</p>}

      {match && !match.error && (
        <div className="bg-gray-50 border p-4 rounded-lg">
          <p><strong>ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â³:</strong> {match.competitor.name}</p>
          <p><strong>ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â³:</strong> {match.competitor.price} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>
          <p><strong>Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â±Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â±:</strong> {match.price_gap} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>

          <h4 className="font-semibold mt-4">Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â· ÃƒËœÃ‚ÂªÃƒâ„¢Ã‚ÂÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬ËœÃƒâ„¢Ã¢â‚¬Å¡ Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬Ãƒâ„¢Ã†â€™:</h4>
          <ul className="list-disc pl-6">
            {match.advantages.map((a, i) => <li key={i}>{a}</li>)}
          </ul>

          <h4 className="font-semibold mt-4">Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â· ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¶ÃƒËœÃ‚Â¹Ãƒâ„¢Ã‚Â:</h4>
          <ul className="list-disc pl-6">
            {match.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}


